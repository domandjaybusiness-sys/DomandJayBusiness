import { createSupabase, jsonResponse, badMethod, parseJson } from './_shared.js'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export async function onRequestPost({ request, env }) {
  const password = request.headers.get('x-admin-password')
  if (password !== env.ADMIN_PASSWORD) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  const body = await parseJson(request)
  if (!body) return jsonResponse({ error: 'Invalid request body.' }, 400)

  const { id } = body
  if (!id || typeof id !== 'string' || !UUID_RE.test(id)) {
    return jsonResponse({ error: 'Invalid class ID.' }, 400)
  }

  const supabase = createSupabase(env)
  const { error } = await supabase.from('classes').update({ active: false }).eq('id', id)

  if (error) return jsonResponse({ error: 'Failed to remove class.' }, 500)
  return jsonResponse({ ok: true })
}
