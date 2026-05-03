import { createSupabase, jsonResponse, badMethod, parseJson } from './_shared.js'

const DAY_ORDER = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const VALID_TYPES = ['CrossFit','Strength','Boxing','Olympic Lifting','Yoga','Open Gym','Other']

function timeToSort(timeStr) {
  const [time, meridiem] = timeStr.split(' ')
  let [h, m] = time.split(':').map(Number)
  if (meridiem === 'PM' && h !== 12) h += 12
  if (meridiem === 'AM' && h === 12) h = 0
  return h * 60 + m
}

export async function onRequestPost({ request, env }) {
  const password = request.headers.get('x-admin-password')
  if (password !== env.ADMIN_PASSWORD) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  const body = await parseJson(request)
  if (!body) return jsonResponse({ error: 'Invalid request body.' }, 400)

  const { id, name, type, day, time, duration, instructor, capacity, price, description } = body

  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return jsonResponse({ error: 'Class name must be 2–100 characters.' }, 400)
  }
  if (!type || !VALID_TYPES.includes(type)) {
    return jsonResponse({ error: 'Invalid class type.' }, 400)
  }
  if (!day || !DAY_ORDER.includes(day)) {
    return jsonResponse({ error: 'Invalid day.' }, 400)
  }
  if (!time || typeof time !== 'string' || time.trim().length < 4 || time.trim().length > 20) {
    return jsonResponse({ error: 'Invalid time value.' }, 400)
  }

  const parsedDuration = parseInt(duration, 10)
  if (Number.isNaN(parsedDuration) || parsedDuration < 15 || parsedDuration > 480) {
    return jsonResponse({ error: 'Duration must be between 15 and 480 minutes.' }, 400)
  }
  const parsedCapacity = parseInt(capacity, 10)
  if (Number.isNaN(parsedCapacity) || parsedCapacity < 1 || parsedCapacity > 200) {
    return jsonResponse({ error: 'Capacity must be between 1 and 200.' }, 400)
  }
  const parsedPrice = parseFloat(price)
  if (Number.isNaN(parsedPrice) || parsedPrice < 0 || parsedPrice > 500) {
    return jsonResponse({ error: 'Price must be between $0 and $500.' }, 400)
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

  const supabase = createSupabase(env)
  let result
  if (id) {
    result = await supabase.from('classes').update(classData).eq('id', id).select().single()
  } else {
    result = await supabase.from('classes').insert({ ...classData, spots_remaining: classData.capacity }).select().single()
  }

  if (result.error) return jsonResponse({ error: result.error.message }, 500)
  return jsonResponse(result.data)
}
