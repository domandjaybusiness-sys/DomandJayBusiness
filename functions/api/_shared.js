import { createClient } from '@supabase/supabase-js'

const jsonHeaders = { 'Content-Type': 'application/json' }

export const createSupabase = (env) => createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY)

export const jsonResponse = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...jsonHeaders, ...headers },
  })

export const badMethod = (allowed) =>
  new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
    status: 405,
    headers: { Allow: allowed, ...jsonHeaders },
  })

export const parseJson = async (request) => {
  const text = await request.text()
  if (!text) return {}
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export const getRequestIp = (request) =>
  request.headers.get('cf-connecting-ip') ||
  request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
  'unknown'
