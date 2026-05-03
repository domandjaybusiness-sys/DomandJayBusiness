const { createClient } = require('@supabase/supabase-js')

const ADMIN_PASS = process.env.ADMIN_PASSWORD
const supabase   = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

const ALLOWED_STATUSES = ['confirmed', 'pending', 'completed', 'cancelled', 'flagged']

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

  const { id, status } = body

  if (!id || typeof id !== 'string' || id.length > 100) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid id' }) }
  }
  if (!ALLOWED_STATUSES.includes(status)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid status' }) }
  }

  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) }
  return { statusCode: 200, body: JSON.stringify(data) }
}
