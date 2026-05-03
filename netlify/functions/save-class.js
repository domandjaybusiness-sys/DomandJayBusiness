const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

const DAY_ORDER = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

function timeToSort(timeStr) {
  // Convert "6:00 AM" → sortable number
  const [time, meridiem] = timeStr.split(' ')
  let [h, m] = time.split(':').map(Number)
  if (meridiem === 'PM' && h !== 12) h += 12
  if (meridiem === 'AM' && h === 12) h = 0
  return h * 60 + m
}

const VALID_TYPES = ['CrossFit','Strength','Boxing','Olympic Lifting','Yoga','Open Gym','Other']

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

  const { id, name, type, day, time, duration, instructor, capacity, price, description } = body

  // Input validation.
  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Class name must be 2–100 characters.' }) }
  }
  if (!type || !VALID_TYPES.includes(type)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid class type.' }) }
  }
  if (!day || !DAY_ORDER.includes(day)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid day.' }) }
  }
  if (!time || typeof time !== 'string' || time.trim().length < 4 || time.trim().length > 20) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid time value.' }) }
  }
  const parsedDuration = parseInt(duration, 10)
  if (isNaN(parsedDuration) || parsedDuration < 15 || parsedDuration > 480) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Duration must be between 15 and 480 minutes.' }) }
  }
  const parsedCapacity = parseInt(capacity, 10)
  if (isNaN(parsedCapacity) || parsedCapacity < 1 || parsedCapacity > 200) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Capacity must be between 1 and 200.' }) }
  }
  const parsedPrice = parseFloat(price)
  if (isNaN(parsedPrice) || parsedPrice < 0 || parsedPrice > 500) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Price must be between $0 and $500.' }) }
  }

  const classData = {
    name: name.trim(),
    type,
    day,
    time: time.trim(),
    duration: parsedDuration,
    instructor: (instructor && typeof instructor === 'string') ? instructor.trim().slice(0, 100) : 'Coach Liz',
    capacity: parsedCapacity,
    price: parsedPrice,
    description: (description && typeof description === 'string') ? description.trim().slice(0, 500) : '',
    day_index: DAY_ORDER.indexOf(day),
    time_sort: timeToSort(time.trim()),
    active: true,
  }

  let result
  if (id) {
    // Update existing
    result = await supabase.from('classes').update(classData).eq('id', id).select().single()
  } else {
    // Insert new — spots_remaining = capacity
    result = await supabase.from('classes').insert({ ...classData, spots_remaining: classData.capacity }).select().single()
  }

  if (result.error) return { statusCode: 500, body: JSON.stringify({ error: result.error.message }) }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result.data),
  }
}
