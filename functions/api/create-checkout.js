import { createSupabase, jsonResponse, badMethod, parseJson, getRequestIp } from './_shared.js'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const DEFAULT_SITE_ORIGIN = 'https://ironandfire.pages.dev'

function getSiteOrigin(request, env) {
  const configured = env.SITE_ORIGIN?.trim()
  if (configured) {
    return configured.replace(/\/+$/, '')
  }

  try {
    const url = new URL(request.url)
    if (url.origin && url.origin !== 'null') {
      return url.origin
    }
  } catch {
    // Ignore malformed URLs and use the fallback origin below.
  }

  return DEFAULT_SITE_ORIGIN
}

function getMissingEnvVars(env) {
  return ['SUPABASE_URL', 'SUPABASE_SERVICE_KEY', 'STRIPE_SECRET_KEY']
    .filter((key) => !env[key] || !env[key].trim())
}

export async function onRequestPost({ request, env }) {
  const missingEnvVars = getMissingEnvVars(env)
  if (missingEnvVars.length > 0) {
    console.error('[create-checkout] Missing required env vars:', missingEnvVars.join(', '))
    return jsonResponse({ error: 'Booking is not configured yet. Missing server settings.' }, 500)
  }

  const body = await parseJson(request)
  if (!body) return jsonResponse({ error: 'Invalid request body.' }, 400)

  const { classId, memberName, memberEmail, memberPhone } = body
  if (!classId || typeof classId !== 'string' || !UUID_RE.test(classId)) {
    return jsonResponse({ error: 'Invalid class ID.' }, 400)
  }
  if (!memberName || typeof memberName !== 'string' || memberName.trim().length < 2 || memberName.trim().length > 100) {
    return jsonResponse({ error: 'Name must be 2–100 characters.' }, 400)
  }
  if (!memberEmail || typeof memberEmail !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(memberEmail.trim()) || memberEmail.length > 254) {
    return jsonResponse({ error: 'Invalid email address.' }, 400)
  }
  if (memberPhone && (typeof memberPhone !== 'string' || memberPhone.trim().length > 20)) {
    return jsonResponse({ error: 'Invalid phone number.' }, 400)
  }

  const clientIP = getRequestIp(request)
  const rateStore = globalThis.__rateStore ||= new Map()
  const RATE_WINDOW_MS = 15 * 60 * 1000
  const RATE_MAX = 10
  const now = Date.now()
  const rec = rateStore.get(clientIP) || { count: 0, windowStart: now }
  if (now - rec.windowStart > RATE_WINDOW_MS) {
    rateStore.set(clientIP, { count: 1, windowStart: now })
  } else {
    if (rec.count >= RATE_MAX) {
      return jsonResponse({ error: 'Too many requests. Please try again later.' }, 429, { 'Retry-After': '900' })
    }
    rec.count += 1
    rateStore.set(clientIP, rec)
  }

  const supabase = createSupabase(env)
  const { data: cls, error } = await supabase
    .from('classes')
    .select('*')
    .eq('id', classId)
    .single()

  if (error || !cls) {
    return jsonResponse({ error: 'Class not found' }, 404)
  }
  if (cls.spots_remaining <= 0) {
    return jsonResponse({ error: 'Class is full' }, 400)
  }

  const SITE_ORIGIN = getSiteOrigin(request, env)
  const params = new URLSearchParams()
  params.append('payment_method_types[]', 'card')
  params.append('mode', 'payment')
  params.append('line_items[0][price_data][currency]', 'usd')
  params.append('line_items[0][price_data][product_data][name]', `${cls.name} — ${cls.day} at ${cls.time}`)
  params.append('line_items[0][price_data][product_data][description]', `Iron & Fire Fitness · ${cls.instructor}`)
  params.append('line_items[0][price_data][unit_amount]', Math.round(cls.price * 100).toString())
  params.append('line_items[0][quantity]', '1')
  params.append('customer_email', memberEmail.trim())
  params.append('success_url', `${SITE_ORIGIN}/booking-success?session_id={CHECKOUT_SESSION_ID}`)
  params.append('cancel_url', `${SITE_ORIGIN}/schedule`)
  params.append('metadata[classId]', classId)
  params.append('metadata[memberName]', memberName.trim())
  params.append('metadata[memberEmail]', memberEmail.trim())
  params.append('metadata[memberPhone]', (memberPhone || '').trim())

  let session
  try {
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })

    if (!stripeResponse.ok) {
      const errorPayload = await stripeResponse.text()
      console.error('[create-checkout] Stripe error:', errorPayload)
      return jsonResponse({ error: 'Payment service error. Please verify Stripe settings and try again.' }, 500)
    }

    session = await stripeResponse.json()
  } catch (err) {
    console.error('[create-checkout] Stripe error:', err)
    return jsonResponse({ error: 'Payment service error. Please try again.' }, 500)
  }

  return jsonResponse({ url: session.url })
}
