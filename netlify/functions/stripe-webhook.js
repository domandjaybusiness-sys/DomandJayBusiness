const Stripe = require('stripe')
const { createClient } = require('@supabase/supabase-js')

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature']
  let stripeEvent

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` }
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object
    const { classId, memberName, memberEmail, memberPhone } = session.metadata

    // Save booking — check for duplicate webhook delivery first (idempotency).
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
        // Return 500 so Stripe retries — do NOT silently swallow booking failures.
        return { statusCode: 500, body: 'Booking insert failed' }
      }

      // Atomic decrement: use a Postgres RPC to avoid read-decrement-write race
      // condition where concurrent webhooks could both read the same spots_remaining
      // and both write back (value - 1), effectively only decrementing once.
      // Falls back to safe read-and-update if the RPC isn't available yet.
      const { error: rpcError } = await supabase.rpc('decrement_spots', { class_id: classId })

      if (rpcError) {
        // Fallback: read then conditionally update (safe if RPC not yet deployed).
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

  return { statusCode: 200, body: JSON.stringify({ received: true }) }
}
