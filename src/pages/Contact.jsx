import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import EmberCanvas from '../components/EmberCanvas'
import SEO from '../components/SEO'

const hours = [
  { day: 'Monday – Friday', time: '5:30 AM – 7:00 PM' },
  { day: 'Saturday',         time: '7:00 AM – 12:00 PM' },
  { day: 'Sunday',           time: '8:00 AM – 11:00 AM' },
]

const infoCards = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Address',
    value: '275 High Point Avenue',
    sub: 'Portsmouth, RI 02871',
    href: 'https://www.google.com/maps/search/?api=1&query=Iron+%26+Fire%2C+275+High+Point+Avenue%2C+Portsmouth+02871+RI',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '(401) 855-8004',
    href: 'tel:4018558004',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'ironandfire.ri@gmail.com',
    href: 'mailto:ironandfire.ri@gmail.com',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
    label: 'Instagram',
    value: '@ironandfirefit',
    href: 'https://instagram.com/ironandfirefit',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', goal: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // SEO rendered below inside PageTransition

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <PageTransition>
      <SEO
        title="Contact &amp; Free Intro Class — Portsmouth, RI Gym"
        description="Book your free intro class at Iron &amp; Fire Fitness in Portsmouth, RI. No contracts, no pressure. Drop in for $22 or start a membership for $150/mo. We reply within 24 hours."
        path="/contact"
      />

      {/* ── UNIFIED HERO + CONTENT ── */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#100c08] via-[#131009] to-dark pt-28 pb-20">

        {/* Ember canvas */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <EmberCanvas />
        </div>

        {/* Fire glow behind the form area */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_30%_50%,rgba(232,65,24,0.10),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_75%_30%,rgba(192,48,14,0.07),transparent_60%)] pointer-events-none" />

        {/* Top + bottom fades */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#100c08] to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent pointer-events-none z-10" />

        <div className="container-site relative z-20">

          {/* Headline */}
          <div className="mb-12">
            <ScrollReveal>
              <span className="section-tag mb-4 inline-block">Get In Touch</span>
              <h1 className="font-display font-black text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-white uppercase">
                Let's <span className="fire-text">Connect</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-4 text-white/50 font-sans text-lg max-w-md">
                Questions, free class bookings, drop-ins — we respond to everything. Real humans, real fast.
              </p>
            </ScrollReveal>
          </div>

          {/* Two-column grid — form left, sidebar right */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

            {/* ── FORM ── */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="left">
                <div
                  className="relative card-base p-8 md:p-10 overflow-hidden"
                  style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 32px rgba(232,65,24,0.06)' }}
                >
                  {/* Subtle inner glow top */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire/30 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(232,65,24,0.05),transparent_50%)] pointer-events-none" />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="font-display font-bold text-2xl text-white tracking-wide">Book a Free Intro</h2>
                        <p className="text-muted text-sm font-sans mt-1">We'll reach out within 24 hours.</p>
                      </div>
                      {/* Response time badge */}
                      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-green-400 text-[10px] font-sans tracking-widest uppercase">Responds fast</span>
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {!submitted ? (
                        <motion.form
                          key="form"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0, y: -16 }}
                          onSubmit={handleSubmit}
                          className="space-y-5"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-[10px] tracking-widest uppercase text-muted font-sans mb-2">Full Name *</label>
                              <input type="text" name="name" required value={form.name} onChange={handleChange}
                                placeholder="Your name" className="input-field" />
                            </div>
                            <div>
                              <label className="block text-[10px] tracking-widest uppercase text-muted font-sans mb-2">Email *</label>
                              <input type="email" name="email" required value={form.email} onChange={handleChange}
                                placeholder="you@example.com" className="input-field" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] tracking-widest uppercase text-muted font-sans mb-2">Phone (optional)</label>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                              placeholder="(401) 000-0000" className="input-field" />
                          </div>

                          <div>
                            <label className="block text-[10px] tracking-widest uppercase text-muted font-sans mb-2">What's your main goal?</label>
                            <select name="goal" value={form.goal} onChange={handleChange} className="input-field">
                              <option value="">Select a goal…</option>
                              <option>Lose weight / improve body composition</option>
                              <option>Build strength and muscle</option>
                              <option>Improve overall fitness / health</option>
                              <option>Find a community / training partners</option>
                              <option>Compete in CrossFit or weightlifting</option>
                              <option>Just try something new</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] tracking-widest uppercase text-muted font-sans mb-2">Anything else?</label>
                            <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                              placeholder="Experience level, questions, schedule preferences…"
                              className="input-field resize-none" />
                          </div>

                          <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            className="w-full py-4 rounded-md font-display font-black text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white shadow-fire-md disabled:opacity-60 transition-all duration-300"
                            style={{ boxShadow: '0 4px 24px rgba(232,65,24,0.35)' }}
                          >
                            {loading ? (
                              <span className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Sending…
                              </span>
                            ) : (
                              'Send Message →'
                            )}
                          </motion.button>

                          <p className="text-center text-white/20 text-[10px] font-sans tracking-widest uppercase">
                            First class is free · No commitment required
                          </p>
                        </motion.form>
                      ) : (
                        <motion.div
                          key="thanks"
                          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="text-center py-12"
                        >
                          {/* Fire icon */}
                          <div className="w-16 h-16 rounded-full bg-fire/15 border border-fire/30 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-fire" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2c0 0-4 4-4 8 0 2.21 1.79 4 4 4s4-1.79 4-4c0-4-4-8-4-8zm0 10c-1.1 0-2-.9-2-2 0-2 2-5 2-5s2 3 2 5c0 1.1-.9 2-2 2z"/>
                              <path d="M12 22c-4.42 0-8-3.58-8-8 0-2.5 1.16-4.72 3-6.2V10c0 2.76 2.24 5 5 5s5-2.24 5-5V7.8c1.84 1.48 3 3.7 3 6.2 0 4.42-3.58 8-8 8z"/>
                            </svg>
                          </div>
                          <h3 className="font-display font-black text-2xl text-white mb-3 uppercase">You're In the Queue!</h3>
                          <p className="text-muted font-sans text-sm max-w-xs mx-auto leading-relaxed">
                            We'll reach out within 24 hours to get your first class scheduled. Welcome to the family.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="right" delay={0.08}>
                <div className="space-y-4">

                  {/* Info cards */}
                  {infoCards.map(({ icon, label, value, sub, href }, i) => (
                    <motion.div
                      key={label}
                      whileHover={{ x: 4, borderColor: 'rgba(232,65,24,0.35)' }}
                      transition={{ duration: 0.2 }}
                      className="card-base p-5 flex items-start gap-4"
                    >
                      <div className="p-2.5 rounded-md bg-fire/10 border border-fire/20 text-fire shrink-0">
                        {icon}
                      </div>
                      <div>
                        <div className="text-[10px] tracking-widest uppercase text-muted font-sans mb-0.5">{label}</div>
                        {href ? (
                          <a href={href} className="text-white font-sans text-sm hover:text-fire transition-colors duration-200">
                            {value}
                          </a>
                        ) : (
                          <div className="text-white font-sans text-sm">{value}</div>
                        )}
                        {sub && <div className="text-muted/60 text-xs font-sans mt-0.5">{sub}</div>}
                      </div>
                    </motion.div>
                  ))}

                  {/* Hours card */}
                  <div className="card-base p-6" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                    <h3 className="font-display font-bold text-white tracking-wide mb-5 flex items-center gap-2 text-sm uppercase">
                      <svg className="w-4 h-4 text-fire shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Hours
                    </h3>
                    <ul className="space-y-3.5">
                      {hours.map(({ day, time }) => (
                        <li key={day} className="flex items-center justify-between text-sm font-sans gap-4">
                          <span className="text-muted shrink-0">{day}</span>
                          <div className="flex-1 h-px bg-white/5" />
                          <span className="text-white font-medium shrink-0">{time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trust block */}
                  <div className="rounded-xl p-5 border border-fire/15 bg-fire/5">
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-fire/15 border border-fire/30 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-fire" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-display font-bold text-white text-sm tracking-wide mb-1">Zero pressure. Seriously.</div>
                        <p className="text-white/45 text-xs font-sans leading-relaxed">
                          No sales pitch, no contract. Come in, try a class, and decide for yourself. That's the Iron & Fire way.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </div>

          </div>

          {/* ── MAP + NAP BLOCK ── */}
          <ScrollReveal delay={0.1}>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Google Maps embed */}
              <div className="lg:col-span-3">
                <h2 className="font-display font-bold text-sm tracking-widest uppercase text-white/40 mb-4">Find Us</h2>
                <div
                  className="rounded-2xl overflow-hidden border border-white/8"
                  style={{ height: '380px', boxShadow: '0 8px 40px rgba(0,0,0,0.45)' }}
                  aria-label="Map showing Iron and Fire Fitness location in Portsmouth, Rhode Island"
                >
                  <iframe
                    title="Iron and Fire Fitness — 275 High Point Avenue, Portsmouth, RI"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-71.2814%2C41.5953%2C-71.2674%2C41.6053&layer=mapnik&marker=41.6003%2C-71.2744"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'saturate(0.72) brightness(1.06) contrast(0.93) hue-rotate(2deg)' }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Iron+%26+Fire%2C+275+High+Point+Avenue%2C+Portsmouth+02871+RI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/35 hover:text-fire text-xs font-sans mt-2 inline-block transition-colors"
                >
                  275 High Point Avenue, Portsmouth, RI 02871 → Get directions
                </a>
              </div>

              {/* NAP block — structured for local SEO */}
              <div className="lg:col-span-2">
                <h2 className="font-display font-bold text-sm tracking-widest uppercase text-white/40 mb-4">Contact Info</h2>
                <address
                  className="not-italic space-y-3 text-sm font-sans text-white/60"
                  itemScope
                  itemType="https://schema.org/LocalBusiness"
                >
                  <meta itemProp="name" content="Iron &amp; Fire Fitness" />
                  <div className="flex items-start gap-3">
                    <span className="text-fire shrink-0">📍</span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Iron+%26+Fire%2C+275+High+Point+Avenue%2C+Portsmouth+02871+RI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-fire transition-colors"
                      itemProp="address" itemScope itemType="https://schema.org/PostalAddress"
                    >
                      <span itemProp="streetAddress">275 High Point Avenue</span><br />
                      <span itemProp="addressLocality">Portsmouth</span>,{' '}
                      <span itemProp="addressRegion">RI</span>{' '}
                      <span itemProp="postalCode">02871</span>
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-fire shrink-0">📞</span>
                    <a
                      href="tel:4018558004"
                      itemProp="telephone"
                      className="hover:text-fire transition-colors"
                    >
                      (401) 855-8004
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-fire shrink-0">📧</span>
                    <a
                      href="mailto:ironandfire.ri@gmail.com"
                      itemProp="email"
                      className="hover:text-fire transition-colors"
                    >
                      ironandfire.ri@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-fire shrink-0">📸</span>
                    <a
                      href="https://instagram.com/ironandfirefit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-fire transition-colors"
                      aria-label="Iron and Fire Fitness on Instagram"
                    >
                      @ironandfirefit
                    </a>
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <span className="text-fire shrink-0">🕐</span>
                    <div itemProp="openingHours" className="space-y-1">
                      <div>Mon–Fri: <strong className="text-white">5:30 AM – 7:00 PM</strong></div>
                      <div>Saturday: <strong className="text-white">7:00 AM – 12:00 PM</strong></div>
                      <div>Sunday: <strong className="text-white">8:00 AM – 11:00 AM</strong></div>
                    </div>
                  </div>
                </address>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </PageTransition>
  )
}
