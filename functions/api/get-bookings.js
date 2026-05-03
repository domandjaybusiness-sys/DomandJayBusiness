import { createSupabase, jsonResponse, badMethod } from './_shared.js'

export async function onRequestGet({ request, env }) {
  const password = request.headers.get('x-admin-password')
  if (password !== env.ADMIN_PASSWORD) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  const supabase = createSupabase(env)
  const { data, error } = await supabase
    .from('bookings')
    .select('*, classes(name, day, time)')
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) return jsonResponse({ error: error.message }, 500)
  return jsonResponse(data)
}
