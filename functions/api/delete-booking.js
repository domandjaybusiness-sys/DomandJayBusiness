import { createSupabase, jsonResponse, badMethod, parseJson } from './_shared.js'

export async function onRequestPost({ request, env }) {
  const ADMIN_PASS = env.ADMIN_PASSWORD
  if (!ADMIN_PASS || request.headers.get('x-admin-password') !== ADMIN_PASS) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  const body = await parseJson(request)
  if (!body) return jsonResponse({ error: 'Invalid JSON' }, 400)

  const { id } = body
  if (!id || typeof id !== 'string' || id.length > 100) {
    return jsonResponse({ error: 'Invalid id' }, 400)
  }

  const supabase = createSupabase(env)
  const { error } = await supabase.from('bookings').delete().eq('id', id)

  if (error) return jsonResponse({ error: error.message }, 500)
  return jsonResponse({ success: true })
}
