import { createSupabase, jsonResponse } from './_shared.js'

const TEXT_DECODER = new TextDecoder()

const hexEncode = (buffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

const equalConstTime = (a, b) => {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

const parseStripeSignature = (header) => {
  const parts = header.split(',').map((part) => part.split('='))
  const data = {}
  for (const [key, value] of parts) {
    if (!data[key]) data[key] = []
    data[key].push(value)
  }
  return data
}

const verifySignature = async (payload, header, secret) => {
  if (!header || !secret) return false
  const values = parseStripeSignature(header)
  const timestamp = values.t?.[0]
  const signatures = values.v1 || []
  if (!timestamp || signatures.length === 0) return false

  const signedPayload = `${timestamp}.${payload}`
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload))
  const expected = hexEncode(signatureBuffer)

  const tolerance = 5 * 60
  const timestampInt = parseInt(timestamp, 10)
  if (Number.isNaN(timestampInt) || Math.abs(Math.floor(Date.now() / 1000) - timestampInt) > tolerance) {
    return false
  }

  return signatures.some((sig) => equalConstTime(sig, expected))
}

export async function onRequestPost({ request, env }) {
  const payload = await request.text()
  const signature = request.headers.get('stripe-signature')

  const valid = await verifySignature(payload, signature, env.STRIPE_WEBHOOK_SECRET)
  if (!valid) {
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  let stripeEvent
  try {
    stripeEvent = JSON.parse(payload)
  } catch {
    return new Response('Invalid webhook payload', { status: 400 })
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object
    const { classId, memberName, memberEmail, memberPhone } = session.metadata || {}

    const supabase = createSupabase(env)
    const { data: existing } = await supabase
      .from('bookings')
      .select('id')
      .eq('stripe_session_id', session.id)
      .maybeSingle()

    if (!existing) {
      const { error: insertError } = await supabase.from('bookings').insert({
        class_id: classId,
        member_name: memberName,
        member_email: memberEmail,
        member_phone: memberPhone,
        stripe_session_id: session.id,
        amount_paid: session.amount_total / 100,
        status: 'confirmed',
      })

      if (insertError) {
        console.error('[stripe-webhook] Failed to save booking:', insertError.message)
        return new Response('Booking insert failed', { status: 500 })
      }

      const { error: rpcError } = await supabase.rpc('decrement_spots', { class_id: classId })
      if (rpcError) {
        console.warn('[stripe-webhook] decrement_spots RPC not available, using fallback:', rpcError.message)
        const { data: cls } = await supabase
          .from('classes')
          .select('spots_remaining')
          .eq('id', classId)
          .single()

        if (cls && cls.spots_remaining > 0) {
          const { error: updateError } = await supabase
            .from('classes')
            .update({ spots_remaining: cls.spots_remaining - 1 })
            .eq('id', classId)

          if (updateError) {
            console.error('[stripe-webhook] Failed to decrement spots:', updateError.message)
          }
        }
      }
    } else {
      console.log('[stripe-webhook] Duplicate event for session', session.id, '— skipped.')
    }
  }

  return jsonResponse({ received: true })
}
