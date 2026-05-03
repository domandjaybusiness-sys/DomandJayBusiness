import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import EmberCanvas from '../components/EmberCanvas'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const SHORT = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

const TYPE_COLORS = {
  'CrossFit':       { bg: 'rgba(232,65,24,0.12)',  border: '#e84118', text: '#e84118' },
  'Strength':       { bg: 'rgba(192,48,14,0.12)',  border: '#c0300e', text: '#f87060' },
  'Boxing':         { bg: 'rgba(240,147,43,0.12)', border: '#f0932b', text: '#f0932b' },
  'Olympic Lifting':{ bg: 'rgba(255,208,96,0.10)', border: '#ffd060', text: '#ffd060' },
  'Yoga':           { bg: 'rgba(192,132,252,0.10)',border: '#c084fc', text: '#c084fc' },
  'default':        { bg: 'rgba(232,65,24,0.08)',  border: '#e84118', text: '#e84118' },
}

function typeColor(type) {
  return TYPE_COLORS[type] || TYPE_COLORS['default']
}

function BookingModal({ cls, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const parseApiResponse = async (res) => {
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      return res.json()
    }

    const text = await res.text()
    return {
      error: text && !text.startsWith('<!DOCTYPE html')
        ? text
        : 'Booking API is unavailable. Start the Cloudflare functions server or check your deployment settings.',
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId: cls.id, memberName: form.name, memberEmail: form.email, memberPhone: form.phone }),
      })
      const data = await parseApiResponse(res)
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      if (!data.url) throw new Error('Stripe checkout URL was not returned.')
      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="w-full max-w-md bg-[#1a1410] border border-fire/20 rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-white/8">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire/40 to-transparent" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-fire text-xs font-sans font-semibold tracking-widest uppercase mb-1">{cls.day} · {cls.time}</p>
              <h3 className="font-display font-black text-2xl text-white uppercase">{cls.name}</h3>
              <p className="text-muted text-sm mt-1">{cls.instructor} · {cls.duration} min</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-display font-black text-3xl fire-text">${cls.price}</div>
              <div className="text-muted text-xs">{cls.spots_remaining} spots left</div>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors text-xl leading-none">✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-white/60 text-xs font-sans tracking-wide mb-1.5">Full Name *</label>
            <input
              required
              type="text"
              placeholder="Jane Smith"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-white/60 text-xs font-sans tracking-wide mb-1.5">Email *</label>
            <input
              required
              type="email"
              placeholder="jane@email.com"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-white/60 text-xs font-sans tracking-wide mb-1.5">Phone (optional)</label>
            <input
              type="tel"
              placeholder="(401) 555-0123"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className="input-field"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm font-sans bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{error}</p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
          >
            {loading ? 'Redirecting to payment…' : `Pay $${cls.price} · Book Now`}
          </motion.button>

          <p className="text-center text-muted/50 text-xs font-sans">Secure payment via Stripe. You'll receive a confirmation email.</p>
        </form>
      </motion.div>
    </motion.div>
  )
}

function ClassCard({ cls, onBook }) {
  const c = typeColor(cls.type)
  const full = cls.spots_remaining <= 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="relative bg-[#1d1814] border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-200 hover:border-fire/25 group"
      style={{ borderColor: c.border + '30' }}
    >
      {/* Left accent bar */}
      <div className="hidden sm:block absolute left-0 top-4 bottom-4 w-0.5 rounded-full" style={{ background: c.border }} />

      <div className="sm:pl-4 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="font-display font-black text-lg text-white">{cls.name}</span>
          <span className="text-[10px] font-sans font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full"
            style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}40` }}>
            {cls.type}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/50 font-sans">
          <span>⏰ {cls.time}</span>
          <span>⏱ {cls.duration} min</span>
          <span>👤 {cls.instructor}</span>
          {cls.description && <span className="w-full text-xs text-white/35 mt-1">{cls.description}</span>}
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
        <div>
          <div className="font-display font-black text-2xl fire-text">${cls.price}</div>
          <div className={`text-xs font-sans text-right ${full ? 'text-red-400' : 'text-white/40'}`}>
            {full ? 'Full' : `${cls.spots_remaining} spots`}
          </div>
        </div>
        <motion.button
          onClick={() => !full && onBook(cls)}
          whileHover={full ? {} : { scale: 1.05 }}
          whileTap={full ? {} : { scale: 0.96 }}
          disabled={full}
          className="px-5 py-2.5 rounded-lg font-display font-bold text-xs tracking-widest uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={full ? { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }
                      : { background: `linear-gradient(135deg, #e84118, #c0300e)`, color: '#fff', boxShadow: `0 4px 16px rgba(232,65,24,0.3)` }}
        >
          {full ? 'Full' : 'Book'}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Schedule() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeDay, setActiveDay] = useState('')
  const [bookingClass, setBookingClass] = useState(null)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    fetch('/api/get-classes')
      .then(async (r) => {
        const contentType = r.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
          throw new Error('Schedule API is unavailable')
        }

        const data = await r.json()
        if (!r.ok) {
          throw new Error(data.error || 'Unable to load classes')
        }

        return data
      })
      .then(data => {
        setClasses(data)
        const available = [...new Set(data.map(c => c.day))]
        const paramDay = searchParams.get('day')
        if (paramDay && available.includes(paramDay)) {
          setActiveDay(paramDay)
        } else {
          const today = new Date().getDay()
          const todayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][today]
          const start = available.includes(todayName) ? todayName : available[0]
          setActiveDay(start || 'Monday')
        }
        setLoading(false)
      })
      .catch((err) => {
        const message = err?.message === 'Schedule API is unavailable'
          ? 'Unable to load classes. The booking API is not running yet.'
          : 'Unable to load classes. Please try again.'
        setError(message)
        setLoading(false)
      })
  }, [])

  const daysWithClasses = DAYS.filter(d => classes.some(c => c.day === d))
  const filtered = classes.filter(c => c.day === activeDay)

  return (
    <PageTransition>
      <section className="relative min-h-screen bg-gradient-to-b from-[#100c08] via-[#131009] to-dark pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <EmberCanvas />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgba(232,65,24,0.10),transparent_65%)] pointer-events-none" />

        <div className="container-site relative z-10">
          {/* Header */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="section-tag mb-4 inline-block">Book a Class</span>
              <h1 className="font-display font-black text-[clamp(2.8rem,7vw,6rem)] leading-none tracking-tight text-white uppercase">
                Class <span className="fire-text">Schedule</span>
              </h1>
              <p className="mt-4 text-white/50 font-sans text-lg max-w-md mx-auto">
                Pick your class, pick your spot, pay securely. See you on the floor.
              </p>
            </div>
          </ScrollReveal>

          {/* Day tabs */}
          {!loading && !error && (
            <ScrollReveal delay={0.1}>
              <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide justify-center flex-wrap">
                {daysWithClasses.map(day => {
                  const short = SHORT[DAYS.indexOf(day)]
                  const isActive = day === activeDay
                  return (
                    <button
                      key={day}
                      onClick={() => setActiveDay(day)}
                      className={`flex-shrink-0 px-5 py-2.5 rounded-full font-display font-bold text-sm tracking-widest uppercase transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-fire to-coal text-white shadow-[0_4px_20px_rgba(232,65,24,0.4)]'
                          : 'border border-white/10 text-white/50 hover:text-white hover:border-white/25'
                      }`}
                    >
                      <span className="hidden sm:inline">{day}</span>
                      <span className="sm:hidden">{short}</span>
                    </button>
                  )
                })}
              </div>
            </ScrollReveal>
          )}

          {/* Classes list */}
          {loading && (
            <div className="text-center py-24">
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-fire font-display font-bold text-xl tracking-widest uppercase"
              >
                Loading Schedule…
              </motion.div>
            </div>
          )}

          {error && (
            <div className="text-center py-24 text-red-400 font-sans">{error}</div>
          )}

          {!loading && !error && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3 max-w-2xl mx-auto"
              >
                {filtered.length === 0 ? (
                  <div className="text-center py-16 text-white/30 font-sans">No classes scheduled for {activeDay}.</div>
                ) : (
                  filtered.map(cls => (
                    <ClassCard key={cls.id} cls={cls} onBook={setBookingClass} />
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Member note */}
          {!loading && !error && (
            <ScrollReveal delay={0.2}>
              <div className="mt-12 text-center">
                <p className="text-white/30 font-sans text-sm">
                  Already a member?{' '}
                  <a href="mailto:ironandfire.ri@gmail.com" className="text-fire hover:text-ember transition-colors">
                    Contact us
                  </a>{' '}
                  about your monthly membership — unlimited classes at a flat rate.
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Booking modal */}
      <AnimatePresence>
        {bookingClass && (
          <BookingModal cls={bookingClass} onClose={() => setBookingClass(null)} />
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
