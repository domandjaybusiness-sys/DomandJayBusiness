const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }

  const password = event.headers['x-admin-password']
  if (password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) }
  }

  // Parse body safely.
  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body.' }) }
  }

  const { id } = body

  // Validate id is a real UUID before querying Supabase.
  if (!id || typeof id !== 'string' || !UUID_RE.test(id)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid class ID.' }) }
  }

  const { error } = await supabase.from('classes').update({ active: false }).eq('id', id)

  if (error) return { statusCode: 500, body: JSON.stringify({ error: 'Failed to remove class.' }) }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) }
}
