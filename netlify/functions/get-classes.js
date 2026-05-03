const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const DAY_ORDER = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

exports.handler = async () => {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('active', true)
    .order('day_index', { ascending: true })
    .order('time_sort', { ascending: true })

  if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
}
