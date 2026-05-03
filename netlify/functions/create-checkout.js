const Stripe = require('stripe')
const { createClient } = require('@supabase/supabase-js')

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// ── Config ────────────────────────────────────────────────────────────────────
// Hardcode the site origin — never trust a user-supplied Origin header for
// redirect URLs (open-redirect / session-ID leakage via Referer).
const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://ironandfire.netlify.app'

// UUID v4 pattern — validate classId before hitting Supabase.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// ── Rate limiting (in-memory, resets on cold start) ───────────────────────────
const rateStore = new Map()
const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_MAX = 10

function checkRateLimit(ip) {
  const now = Date.now()
  const rec = rateStore.get(ip) || { count: 0, windowStart: now }
  if (now - rec.windowStart > RATE_WINDOW_MS) {
    rateStore.set(ip, { count: 1, windowStart: now })
    return true
  }
  if (rec.count >= RATE_MAX) return false
  rec.count++
  rateStore.set(ip, rec)
  return true
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { Allow: 'POST' }, body: 'Method Not Allowed' }
  }

  // Rate limiting by client IP.
  const clientIP = (
    event.headers['x-forwarded-for'] ||
    event.headers['client-ip'] ||
    'unknown'
  ).split(',')[0].trim()

  if (!checkRateLimit(clientIP)) {
    return {
      statusCode: 429,
      headers: { 'Retry-After': '900' },
      body: JSON.stringify({ error: 'Too many requests. Please try again later.' }),
    }
  }

  // Parse body safely.
  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body.' }) }
  }

  const { classId, memberName, memberEmail, memberPhone } = body

  // Input validation.
  if (!classId || typeof classId !== 'string' || !UUID_RE.test(classId)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid class ID.' }) }
  }
  if (!memberName || typeof memberName !== 'string' || memberName.trim().length < 2 || memberName.trim().length > 100) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Name must be 2–100 characters.' }) }
  }
  if (!memberEmail || typeof memberEmail !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(memberEmail.trim()) || memberEmail.length > 254) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email address.' }) }
  }
  if (memberPhone && (typeof memberPhone !== 'string' || memberPhone.trim().length > 20)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid phone number.' }) }
  }

  // Fetch the class.
  const { data: cls, error } = await supabase
    .from('classes')
    .select('*')
    .eq('id', classId)
    .single()

  if (error || !cls) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Class not found' }) }
  }

  if (cls.spots_remaining <= 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Class is full' }) }
  }

  // Create Stripe checkout session — use hardcoded SITE_ORIGIN, never client header.
  let session
  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${cls.name} — ${cls.day} at ${cls.time}`,
              description: `Iron & Fire Fitness · ${cls.instructor}`,
            },
            unit_amount: Math.round(cls.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: memberEmail.trim(),
      metadata: {
        classId,
        memberName: memberName.trim(),
        memberEmail: memberEmail.trim(),
        memberPhone: (memberPhone || '').trim(),
      },
      success_url: `${SITE_ORIGIN}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_ORIGIN}/schedule`,
    })
  } catch (err) {
    console.error('[create-checkout] Stripe error:', err.message)
    return { statusCode: 500, body: JSON.stringify({ error: 'Payment service error. Please try again.' }) }
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: session.url }),
  }
}
