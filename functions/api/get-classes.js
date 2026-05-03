import { createSupabase, jsonResponse, badMethod } from './_shared.js'

export async function onRequestGet({ env }) {
  const supabase = createSupabase(env)
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('active', true)
    .order('day_index', { ascending: true })
    .order('time_sort', { ascending: true })

  if (error) return jsonResponse({ error: error.message }, 500)
  return jsonResponse(data)
}
