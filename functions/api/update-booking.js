import { createSupabase, jsonResponse, badMethod, parseJson } from './_shared.js'

const ALLOWED_STATUSES = ['confirmed', 'pending', 'completed', 'cancelled', 'flagged']

export async function onRequestPost({ request, env }) {
  const password = request.headers.get('x-admin-password')
  if (password !== env.ADMIN_PASSWORD) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  const body = await parseJson(request)
  if (!body) return jsonResponse({ error: 'Invalid JSON' }, 400)

  const { id, status } = body
  if (!id || typeof id !== 'string' || id.length > 100) {
    return jsonResponse({ error: 'Invalid id' }, 400)
  }
  if (!ALLOWED_STATUSES.includes(status)) {
    return jsonResponse({ error: 'Invalid status' }, 400)
  }

  const supabase = createSupabase(env)
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) return jsonResponse({ error: error.message }, 500)
  return jsonResponse(data)
}
