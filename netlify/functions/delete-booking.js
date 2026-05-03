const { createClient } = require('@supabase/supabase-js')

const ADMIN_PASS = process.env.ADMIN_PASSWORD
const supabase   = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  if (!ADMIN_PASS || event.headers['x-admin-password'] !== ADMIN_PASS) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) }
  }

  let body
  try { body = JSON.parse(event.body) }
  catch { return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) } }

  const { id } = body

  if (!id || typeof id !== 'string' || id.length > 100) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid id' }) }
  }

  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', id)

  if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  return { statusCode: 200, body: JSON.stringify({ success: true }) }
}
