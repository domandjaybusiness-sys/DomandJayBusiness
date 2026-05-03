import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Constants ─────────────────────────────────────────────────────────────────
const DAYS  = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const TYPES = ['CrossFit','Strength','Boxing','Olympic Lifting','Yoga','Open Gym','Other']
const EMPTY_CLASS = {
  name: '', type: 'CrossFit', day: 'Monday', time: '6:00 AM',
  duration: 60, instructor: 'Coach Liz', capacity: 20, price: 22, description: '',
}

const STATUS_CFG = {
  confirmed: { label: 'Confirmed', dot: 'bg-green-400',  badge: 'bg-green-500/12 text-green-400 border-green-500/25' },
  pending:   { label: 'Pending',   dot: 'bg-yellow-400', badge: 'bg-yellow-500/12 text-yellow-400 border-yellow-500/25' },
  completed: { label: 'Completed', dot: 'bg-blue-400',   badge: 'bg-blue-500/12 text-blue-400 border-blue-500/25' },
  cancelled: { label: 'Cancelled', dot: 'bg-red-400',    badge: 'bg-red-500/12 text-red-400 border-red-500/25' },
  flagged:   { label: 'Flagged',   dot: 'bg-orange-400', badge: 'bg-orange-500/12 text-orange-400 border-orange-500/25' },
}
const STATUS_KEYS = Object.keys(STATUS_CFG)

// Sanitize displayed user data (strips HTML tags — React JSX escapes by default too)
const clean = str => String(str ?? '').replace(/<[^>]*>/g, '').trim().slice(0, 500)

const fmtDate = iso => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ── Delete confirmation modal ─────────────────────────────────────────────────
function DeleteModal({ booking, onConfirm, onCancel }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onCancel() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 8 }}
        transition={{ duration: 0.18 }}
        className="relative bg-[#1d1814] border border-red-500/25 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-title"
      >
        <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/25 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h3 id="delete-title" className="font-display font-bold text-white text-center text-lg mb-1">Delete Booking?</h3>
        <p className="text-white/60 text-sm font-sans text-center font-medium">{clean(booking.member_name)}</p>
        <p className="text-white/30 text-xs font-sans text-center mt-0.5 mb-2">
          {booking.classes?.name} · {fmtDate(booking.created_at)}
        </p>
        <p className="text-red-400/70 text-xs font-sans text-center mb-6">This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onConfirm} className="flex-1 py-3 rounded-xl bg-red-500/80 hover:bg-red-500 text-white font-display font-bold text-sm tracking-widest uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400">
            Delete
          </button>
          <button onClick={onCancel} autoFocus className="flex-1 py-3 rounded-xl border border-white/15 text-white/60 font-display font-bold text-sm tracking-widest uppercase hover:border-white/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/30">
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || STATUS_CFG.pending
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-display font-bold tracking-widest uppercase whitespace-nowrap ${cfg.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  )
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }) {
  return (
    <div className="bg-[#1d1814] border border-white/8 rounded-xl p-4 flex-1 min-w-[100px]">
      <div className="font-display font-black text-2xl fire-text leading-none">{value}</div>
      <div className="text-white/50 text-xs font-sans mt-1 uppercase tracking-widest">{label}</div>
      {sub && <div className="text-white/25 text-[10px] font-sans mt-0.5">{sub}</div>}
    </div>
  )
}

// ── Booking card ──────────────────────────────────────────────────────────────
function BookingCard({ booking, onStatusChange, onDelete }) {
  const [statusOpen, setStatusOpen] = useState(false)
  const [copied, setCopied]         = useState(false)
  const dropRef = useRef(null)

  // Close status dropdown on outside click
  useEffect(() => {
    if (!statusOpen) return
    const handler = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setStatusOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [statusOpen])

  const handleCopy = useCallback(() => {
    const text = [
      clean(booking.member_name),
      clean(booking.member_email),
      booking.member_phone ? clean(booking.member_phone) : null,
      booking.classes ? `${clean(booking.classes.name)} · ${booking.classes.day} ${booking.classes.time}` : null,
      `$${booking.amount_paid} · ${fmtDate(booking.created_at)}`,
    ].filter(Boolean).join('\n')
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [booking])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-[#1d1814] border border-white/8 rounded-xl overflow-visible hover:border-white/14 transition-colors"
    >
      <div className="p-5">
        <div className="flex flex-wrap items-start gap-x-6 gap-y-3">

          {/* ── Customer + class info ── */}
          <div className="flex-1 min-w-[180px] space-y-2.5">
            {/* Name */}
            <div className="font-display font-bold text-white text-base leading-tight">
              {clean(booking.member_name)}
            </div>

            {/* Contact */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <a
                href={`mailto:${clean(booking.member_email)}`}
                className="text-xs text-white/45 font-sans hover:text-fire transition-colors flex items-center gap-1.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-fire rounded"
              >
                <svg className="w-3 h-3 shrink-0 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {clean(booking.member_email)}
              </a>
              {booking.member_phone && (
                <a
                  href={`tel:${clean(booking.member_phone)}`}
                  className="text-xs text-white/45 font-sans hover:text-fire transition-colors flex items-center gap-1.5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-fire rounded"
                >
                  <svg className="w-3 h-3 shrink-0 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {clean(booking.member_phone)}
                </a>
              )}
            </div>

            {/* Class */}
            {booking.classes && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-fire/50 shrink-0" />
                <span className="text-fire/85 font-display font-bold text-sm">{clean(booking.classes.name)}</span>
                <span className="text-white/30 font-sans text-xs">{booking.classes.day} · {booking.classes.time}</span>
              </div>
            )}
          </div>

          {/* ── Price + status + date ── */}
          <div className="shrink-0 flex flex-col items-end gap-2 text-right">
            <div className="font-display font-black text-xl fire-text leading-none">${booking.amount_paid}</div>
            <StatusBadge status={booking.status} />
            <div className="text-white/25 text-[10px] font-sans">{fmtDate(booking.created_at)}</div>
          </div>
        </div>

        {/* ── Action row ── */}
        <div className="mt-4 pt-3.5 border-t border-white/5 flex flex-wrap items-center gap-2">

          {/* Status dropdown */}
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setStatusOpen(o => !o)}
              aria-haspopup="listbox"
              aria-expanded={statusOpen}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/50 hover:border-fire/30 hover:text-white/75 text-[11px] font-display font-bold tracking-widest uppercase transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-fire"
            >
              Set Status
              <svg className={`w-3 h-3 transition-transform duration-200 ${statusOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {statusOpen && (
                <motion.ul
                  role="listbox"
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.14 }}
                  className="absolute left-0 top-full mt-1.5 z-30 bg-[#252018] border border-white/12 rounded-xl overflow-hidden shadow-2xl min-w-[148px]"
                >
                  {STATUS_KEYS.map(s => (
                    <li
                      key={s}
                      role="option"
                      aria-selected={booking.status === s}
                      onClick={() => { onStatusChange(booking.id, s); setStatusOpen(false) }}
                      className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-[11px] font-display font-bold tracking-widest uppercase hover:bg-white/6 transition-colors ${booking.status === s ? 'text-fire' : 'text-white/55'}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_CFG[s].dot}`} />
                      {STATUS_CFG[s].label}
                      {booking.status === s && (
                        <svg className="w-3 h-3 ml-auto" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Copy info */}
          <button
            onClick={handleCopy}
            aria-label="Copy customer info"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-display font-bold tracking-widest uppercase transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-fire ${
              copied ? 'border-green-500/40 text-green-400 bg-green-500/8' : 'border-white/10 text-white/45 hover:border-white/25 hover:text-white/70'
            }`}
          >
            {copied ? (
              <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Copied</>
            ) : (
              <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy</>
            )}
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Delete */}
          <button
            onClick={() => onDelete(booking)}
            aria-label={`Delete booking for ${clean(booking.member_name)}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/15 text-red-400/45 hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5 text-[11px] font-display font-bold tracking-widest uppercase transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Login screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw]         = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/get-bookings', {
      headers: { 'x-admin-password': pw },
    })
    if (res.ok) { sessionStorage.setItem('iaf_admin', pw); onLogin(pw) }
    else setError('Incorrect password.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#131009] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-[#1d1814] border border-fire/20 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <div className="font-display font-black text-2xl text-white mb-1">IRON <span className="text-fire">&amp;</span> FIRE</div>
          <div className="text-muted text-xs tracking-widest uppercase">Admin Panel</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Admin password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            className="input-field"
            autoFocus
            autoComplete="current-password"
          />
          {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-fire to-coal text-white font-display font-bold text-sm tracking-widest uppercase disabled:opacity-60 transition-opacity"
          >
            {loading ? 'Checking…' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// ── Class form ────────────────────────────────────────────────────────────────
function ClassForm({ initial, onSave, onCancel, password }) {
  const [form, setForm] = useState(initial || EMPTY_CLASS)
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setErr('')
    const res = await fetch('/api/save-class', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (!res.ok) { setErr(data.error || 'Error saving'); setSaving(false); return }
    onSave(data)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/50 text-xs mb-1.5">Class Name *</label>
          <input required className="input-field" value={form.name} onChange={e => set('name', e.target.value)} placeholder="CrossFit" />
        </div>
        <div>
          <label className="block text-white/50 text-xs mb-1.5">Type *</label>
          <select required className="input-field" value={form.type} onChange={e => set('type', e.target.value)}>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-white/50 text-xs mb-1.5">Day *</label>
          <select required className="input-field" value={form.day} onChange={e => set('day', e.target.value)}>
            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-white/50 text-xs mb-1.5">Time *</label>
          <input required className="input-field" value={form.time} onChange={e => set('time', e.target.value)} placeholder="6:00 AM" />
        </div>
        <div>
          <label className="block text-white/50 text-xs mb-1.5">Duration (min)</label>
          <input type="number" className="input-field" value={form.duration} onChange={e => set('duration', e.target.value)} />
        </div>
        <div>
          <label className="block text-white/50 text-xs mb-1.5">Instructor</label>
          <input className="input-field" value={form.instructor} onChange={e => set('instructor', e.target.value)} />
        </div>
        <div>
          <label className="block text-white/50 text-xs mb-1.5">Capacity (spots)</label>
          <input type="number" className="input-field" value={form.capacity} onChange={e => set('capacity', e.target.value)} />
        </div>
        <div>
          <label className="block text-white/50 text-xs mb-1.5">Price ($)</label>
          <input type="number" step="0.01" className="input-field" value={form.price} onChange={e => set('price', e.target.value)} />
        </div>
      </div>
      <div>
        <label className="block text-white/50 text-xs mb-1.5">Description (optional)</label>
        <input className="input-field" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Short description shown on schedule" />
      </div>
      {err && <p className="text-red-400 text-sm" role="alert">{err}</p>}
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-fire to-coal text-white font-display font-bold text-sm tracking-widest uppercase disabled:opacity-60">
          {saving ? 'Saving…' : (initial?.id ? 'Save Changes' : 'Add Class')}
        </button>
        <button type="button" onClick={onCancel}
          className="px-6 py-3 rounded-xl border border-white/15 text-white/60 font-display font-bold text-sm tracking-widest uppercase hover:border-white/30 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}

// ── Main admin ────────────────────────────────────────────────────────────────
export default function Admin() {
  const [password, setPassword]           = useState(() => sessionStorage.getItem('iaf_admin') || '')
  const [authed, setAuthed]               = useState(false)
  const [tab, setTab]                     = useState('classes')
  const [classes, setClasses]             = useState([])
  const [bookings, setBookings]           = useState([])
  const [loadingClasses, setLoadingClasses] = useState(true)
  const [loadingBookings, setLoadingBookings] = useState(false)
  const [showForm, setShowForm]           = useState(false)
  const [editClass, setEditClass]         = useState(null)
  const [filterDay, setFilterDay]         = useState('All')
  // Bookings UI state
  const [search, setSearch]               = useState('')
  const [filterStatus, setFilterStatus]   = useState('all')
  const [sortOrder, setSortOrder]         = useState('newest')
  const [autoRefresh, setAutoRefresh]     = useState(false)
  const [deleteTarget, setDeleteTarget]   = useState(null) // booking object to confirm delete

  const handleLogin = (pw) => { setPassword(pw); setAuthed(true) }

  const fetchClasses = useCallback(async () => {
    setLoadingClasses(true)
    const res  = await fetch('/api/get-classes')
    const data = await res.json()
    setClasses(Array.isArray(data) ? data : [])
    setLoadingClasses(false)
  }, [])

  const fetchBookings = useCallback(async () => {
    setLoadingBookings(true)
    const res  = await fetch('/api/get-bookings', {
      headers: { 'x-admin-password': password },
    })
    const data = await res.json()
    setBookings(Array.isArray(data) ? data : [])
    setLoadingBookings(false)
  }, [password])

  useEffect(() => { if (authed) fetchClasses() }, [authed, fetchClasses])
  useEffect(() => { if (authed && tab === 'bookings') fetchBookings() }, [authed, tab, fetchBookings])

  // Auto-login from session
  useEffect(() => {
    if (password) {
      fetch('/api/get-bookings', { headers: { 'x-admin-password': password } })
        .then(r => { if (r.ok) setAuthed(true) })
    }
  }, []) // eslint-disable-line

  // Auto-refresh every 30s
  useEffect(() => {
    if (!autoRefresh || tab !== 'bookings') return
    const t = setInterval(fetchBookings, 30_000)
    return () => clearInterval(t)
  }, [autoRefresh, tab, fetchBookings])

  // ── Booking status update (optimistic) ──
  const handleStatusChange = useCallback(async (id, newStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b))
    try {
      await fetch('/api/update-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ id, status: newStatus }),
      })
    } catch { fetchBookings() }
  }, [password, fetchBookings])

  // ── Booking delete ──
  const handleDeleteBooking = useCallback(async () => {
    if (!deleteTarget) return
    const id = deleteTarget.id
    setBookings(prev => prev.filter(b => b.id !== id))
    setDeleteTarget(null)
    try {
      await fetch('/api/delete-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ id }),
      })
    } catch { fetchBookings() }
  }, [deleteTarget, password, fetchBookings])

  // ── Class delete ──
  const handleDeleteClass = async (id) => {
    if (!confirm('Remove this class from the schedule?')) return
    await fetch('/api/delete-class', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ id }),
    })
    fetchClasses()
  }

  const handleSaved = () => { setShowForm(false); setEditClass(null); fetchClasses() }
  const logout = () => { sessionStorage.removeItem('iaf_admin'); setAuthed(false); setPassword('') }

  // ── Bookings: filter + sort ──
  const filteredBookings = useMemo(() => {
    let list = [...bookings]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(b =>
        clean(b.member_name).toLowerCase().includes(q) ||
        clean(b.member_email).toLowerCase().includes(q) ||
        (b.member_phone && clean(b.member_phone).includes(q))
      )
    }
    if (filterStatus !== 'all') list = list.filter(b => b.status === filterStatus)
    list.sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.created_at) - new Date(a.created_at)
      if (sortOrder === 'oldest') return new Date(a.created_at) - new Date(b.created_at)
      return 0
    })
    return list
  }, [bookings, search, filterStatus, sortOrder])

  // ── Booking stats ──
  const stats = useMemo(() => {
    const today = new Date().toDateString()
    return {
      total:     bookings.length,
      revenue:   bookings.reduce((s, b) => s + (parseFloat(b.amount_paid) || 0), 0).toFixed(2),
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      today:     bookings.filter(b => new Date(b.created_at).toDateString() === today).length,
    }
  }, [bookings])

  const filteredClasses = filterDay === 'All' ? classes : classes.filter(c => c.day === filterDay)

  if (!authed) return <LoginScreen onLogin={handleLogin} />

  return (
    <div className="min-h-screen bg-[#131009] text-white">

      {/* Top bar */}
      <div className="bg-[#1a1410] border-b border-white/8 px-6 py-4 flex items-center justify-between">
        <div className="font-display font-black text-xl text-white">
          IRON <span className="text-fire">&amp;</span> FIRE
          <span className="text-white/35 font-sans font-normal text-sm ml-3">Admin</span>
        </div>
        <button
          onClick={logout}
          className="text-white/35 hover:text-white/65 text-sm font-sans transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-fire rounded"
        >
          Sign out
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: 'classes',  label: 'Classes',  count: classes.length },
            { key: 'bookings', label: 'Bookings', count: bookings.length },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-6 py-2.5 rounded-full font-display font-bold text-sm tracking-widest uppercase transition-all duration-200 flex items-center gap-2 ${
                tab === key
                  ? 'bg-gradient-to-r from-fire to-coal text-white'
                  : 'border border-white/15 text-white/50 hover:text-white'
              }`}
            >
              {label}
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-sans ${tab === key ? 'bg-white/20 text-white' : 'bg-white/10 text-white/40'}`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── CLASSES TAB ── */}
        {tab === 'classes' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {['All', ...DAYS].map(d => (
                  <button
                    key={d}
                    onClick={() => setFilterDay(d)}
                    className={`px-4 py-1.5 rounded-full text-xs font-display font-bold tracking-widest uppercase transition-all ${
                      filterDay === d
                        ? 'bg-fire/20 text-fire border border-fire/40'
                        : 'border border-white/10 text-white/40 hover:text-white/70'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setEditClass(null); setShowForm(true) }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fire to-coal text-white font-display font-bold text-sm tracking-widest uppercase"
              >
                + Add Class
              </button>
            </div>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#1d1814] border border-fire/20 rounded-2xl p-6">
                    <h3 className="font-display font-bold text-lg text-white mb-5">
                      {editClass ? 'Edit Class' : 'Add New Class'}
                    </h3>
                    <ClassForm
                      initial={editClass}
                      password={password}
                      onSave={handleSaved}
                      onCancel={() => { setShowForm(false); setEditClass(null) }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {loadingClasses ? (
              <div className="text-center py-16 text-fire font-display font-bold tracking-widest uppercase animate-pulse">Loading…</div>
            ) : filteredClasses.length === 0 ? (
              <div className="text-center py-16 text-white/30 font-sans">No classes found.</div>
            ) : (
              <div className="space-y-2">
                {filteredClasses.map(cls => (
                  <motion.div key={cls.id} layout
                    className="bg-[#1d1814] border border-white/8 rounded-xl px-5 py-4 flex flex-wrap items-center gap-4 hover:border-white/15 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display font-bold text-white">{cls.name}</span>
                        <span className="text-xs text-fire/70 font-sans">{cls.type}</span>
                      </div>
                      <div className="text-sm text-white/40 font-sans mt-0.5">
                        {cls.day} · {cls.time} · {cls.duration}min · {cls.instructor} · ${cls.price} · {cls.spots_remaining}/{cls.capacity} spots
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setEditClass(cls); setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        className="px-4 py-2 rounded-lg border border-white/15 text-white/60 text-xs font-display font-bold tracking-widest uppercase hover:border-fire/40 hover:text-fire transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClass(cls.id)}
                        className="px-4 py-2 rounded-lg border border-red-500/20 text-red-400/60 text-xs font-display font-bold tracking-widest uppercase hover:border-red-500/50 hover:text-red-400 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── BOOKINGS TAB ── */}
        {tab === 'bookings' && (
          <div className="space-y-5">

            {/* Stats row */}
            {bookings.length > 0 && !loadingBookings && (
              <div className="flex flex-wrap gap-3">
                <StatCard label="Total"     value={stats.total}               />
                <StatCard label="Revenue"   value={`$${stats.revenue}`}       />
                <StatCard label="Confirmed" value={stats.confirmed}           />
                <StatCard label="Today"     value={stats.today}               />
              </div>
            )}

            {/* Filter / search bar */}
            <div className="bg-[#1d1814] border border-white/8 rounded-xl p-4 space-y-3">
              {/* Search */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Search name, email, or phone…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="input-field pl-9 pr-9"
                  aria-label="Search bookings"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                    aria-label="Clear search"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>

              {/* Filters row */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Status filter */}
                <div className="flex flex-wrap gap-1.5">
                  {[{ val: 'all', label: 'All' }, ...STATUS_KEYS.map(s => ({ val: s, label: STATUS_CFG[s].label }))].map(({ val, label }) => (
                    <button
                      key={val}
                      onClick={() => setFilterStatus(val)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-display font-bold tracking-widest uppercase transition-all ${
                        filterStatus === val
                          ? val === 'all' ? 'bg-fire/20 text-fire border border-fire/40' : `${STATUS_CFG[val]?.badge || ''} border`
                          : 'border border-white/10 text-white/35 hover:text-white/60'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Sort */}
                <select
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                  className="bg-[#252018] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-sans text-white/55 focus:outline-none focus:border-fire/40 transition-colors"
                  aria-label="Sort bookings"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                </select>

                {/* Refresh */}
                <button
                  onClick={fetchBookings}
                  disabled={loadingBookings}
                  aria-label="Refresh bookings"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-white/45 hover:border-fire/30 hover:text-fire text-xs font-display font-bold tracking-widest uppercase transition-all disabled:opacity-40"
                >
                  <svg className={`w-3.5 h-3.5 ${loadingBookings ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {loadingBookings ? 'Loading…' : 'Refresh'}
                </button>

                {/* Auto-refresh toggle */}
                <button
                  onClick={() => setAutoRefresh(a => !a)}
                  aria-pressed={autoRefresh}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-display font-bold tracking-widest uppercase transition-all ${
                    autoRefresh
                      ? 'border-fire/40 text-fire bg-fire/8'
                      : 'border-white/10 text-white/35 hover:text-white/55'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${autoRefresh ? 'bg-fire animate-pulse' : 'bg-white/20'}`} />
                  Auto
                </button>
              </div>

              {/* Active filter summary */}
              {(search || filterStatus !== 'all') && (
                <div className="flex items-center gap-2 text-xs font-sans text-white/35 pt-1 border-t border-white/5">
                  <span>Showing {filteredBookings.length} of {bookings.length}</span>
                  <button onClick={() => { setSearch(''); setFilterStatus('all') }} className="text-fire/70 hover:text-fire transition-colors underline underline-offset-2">
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Booking list */}
            {loadingBookings ? (
              <div className="text-center py-16 text-fire font-display font-bold tracking-widest uppercase animate-pulse">Loading…</div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-16 text-white/30 font-sans">
                {bookings.length === 0 ? 'No bookings yet.' : 'No bookings match your filters.'}
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredBookings.map(b => (
                    <BookingCard
                      key={b.id}
                      booking={b}
                      onStatusChange={handleStatusChange}
                      onDelete={setDeleteTarget}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal
            booking={deleteTarget}
            onConfirm={handleDeleteBooking}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
