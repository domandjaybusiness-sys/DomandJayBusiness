import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import AnimatedCounter from '../components/AnimatedCounter'
import SEO from '../components/SEO'

const stats = [
  { value: '200+', label: 'Active Members' },
  { value: '8+',   label: 'Years in Portsmouth' },
  { value: '5K',   label: 'Square Feet' },
  { value: '10+',  label: 'Coaches on Staff' },
]

const values = [
  {
    num: '01',
    color: '#e84118',
    title: 'Community First',
    desc: 'Every program, every schedule decision, every piece of equipment — it\'s all chosen with you in mind.',
  },
  {
    num: '02',
    color: '#f0932b',
    title: 'Constant Growth',
    desc: 'We don\'t accept plateaus. Progressive programming, continued education, always raising the bar.',
  },
  {
    num: '03',
    color: '#ffd060',
    title: 'Accountability',
    desc: 'Your gym family will notice when you\'re missing. That\'s not pressure — that\'s love in action.',
  },
  {
    num: '04',
    color: '#c084fc',
    title: 'No Ego',
    desc: 'Beginners and veterans train side by side. Hustle earns respect here, not numbers on a barbell.',
  },
]

const timeline = [
  { year: '2016', event: 'Iron & Fire opens its doors in Portsmouth, RI with 12 founding members.' },
  { year: '2018', event: 'Strength & Boxing programs launch. Members start competing regionally.' },
  { year: '2020', event: 'Community rallies through the shutdown with outdoor programming and virtual classes.' },
  { year: '2022', event: 'Expanded to a 5,000 sq ft facility. Membership surpasses 150.' },
  { year: '2024', event: 'Iron & Fire crosses 200 active members. A true family.' },
]

export default function About() {
  const photoRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <PageTransition>
      <SEO
        title="About — Community Gym in Portsmouth, RI Since 2016"
        description="Meet Coach Liz and the Iron &amp; Fire Fitness team. 200+ members, 5,000 sq ft facility in Portsmouth, RI. Our story, values, and the community we've built since 2016."
        path="/about"
      />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-0 overflow-hidden bg-gradient-to-b from-[#181310] to-dark">
        {/* subtle radial fire glow behind headline */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(232,65,24,0.10),transparent_65%)] pointer-events-none" />

        <div className="container-site text-center relative z-10">
          <ScrollReveal>
            <span className="section-tag mb-4 inline-block">Our Story</span>
            <h1 className="font-display font-black text-[clamp(2.8rem,8vw,7rem)] leading-none tracking-tight text-white uppercase">
              More Than a <span className="fire-text">Gym</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="mt-5 text-muted font-sans text-lg max-w-xl mx-auto">
              We started with a simple belief: the right environment changes everything. Eight years later, over 200 people prove it daily.
            </p>
          </ScrollReveal>

          {/* Stats bar */}
          <ScrollReveal delay={0.22}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  whileHover={{ backgroundColor: 'rgba(232,65,24,0.06)' }}
                  className="bg-dark/60 backdrop-blur-sm px-6 py-6 text-center transition-colors duration-300"
                >
                  <div className="font-display font-black text-3xl md:text-4xl fire-text leading-none">
                    <AnimatedCounter value={value.replace(/[^0-9K.]/g, '')} suffix={value.replace(/[0-9K.]/g, '')} />
                  </div>
                  <div className="text-muted text-[10px] tracking-widest uppercase font-sans mt-2">{label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* bottom bleed into photo section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-dark pointer-events-none z-10" />
      </section>

      {/* ── COMMUNITY PHOTO ── */}
      <section ref={photoRef} className="relative overflow-hidden -mt-8">
        <motion.div style={{ y: bgY }}>
          <img
            src="/group-photo.jpg"
            alt="Iron and Fire Fitness community members in Portsmouth, Rhode Island — 200+ members strong"
            className="w-full block"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        {/* gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/35 to-dark/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/25 via-transparent to-dark/25" />

        {/* overlay text */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 z-10">
          <ScrollReveal>
            <p className="font-display font-black text-[clamp(2rem,5vw,4rem)] text-white leading-tight uppercase">
              200+ members.<br />
              <span className="fire-text">One family.</span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="py-24 bg-dark">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <span className="section-tag">Head Coach & Founder</span>
                <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight uppercase">
                  Built by Liz,<br />
                  <span className="fire-text">Powered by You</span>
                </h2>
                <div className="space-y-4 text-white/65 font-sans leading-relaxed text-base">
                  <p>
                    Coach Liz didn't set out to open a gym. She set out to find a place where real people — not just athletes — could feel the transformation that fitness brings. When she couldn't find it, she built it.
                  </p>
                  <p>
                    With over a decade of coaching experience and a philosophy rooted in community over competition, Liz created Iron & Fire as a place where the scoreboard matters less than whether you show up and give everything you've got.
                  </p>
                  <p>
                    Every coach on staff shares that same DNA: expert, encouraging, invested in you specifically.
                  </p>
                </div>

                {/* Coach credentials row */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {['10+ years coaching', 'Portsmouth local', 'Community-first philosophy', 'Expert staff'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm font-sans text-white/55">
                      <span className="w-1.5 h-1.5 rounded-full bg-fire shrink-0" />{item}
                    </div>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 font-display font-bold text-fire text-sm tracking-widest uppercase hover:gap-4 transition-all duration-200"
                >
                  Get in Touch →
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="relative">
                {/* photo frame */}
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-card border border-white/8 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
                  <img
                    src="/liz.jpg"
                    alt="Coach Liz Moniz, founder and head coach of Iron and Fire Fitness in Portsmouth, RI"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center top' }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
                </div>

                {/* Liz's Instagram */}
                <a
                  href="https://instagram.com/lizmoniz_crazyfitbitch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors duration-200 font-sans text-xs tracking-wide group"
                >
                  <svg className="w-3.5 h-3.5 shrink-0 text-white/40 group-hover:text-fire transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>@lizmoniz_crazyfitbitch</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-fire text-[10px]">↗</span>
                </a>

              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 bg-[#181310] border-y border-white/5">
        <div className="container-site">
          <SectionHeading
            tag="Our DNA"
            title="What We Stand For"
            subtitle="Four values that never change, no matter how many members walk through the door."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ num, color, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.08} direction="up">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative card-base p-6 flex flex-col gap-3 border-l-[3px] h-full overflow-hidden"
                  style={{ borderLeftColor: color }}
                >
                  {/* number watermark */}
                  <div
                    className="absolute top-3 right-4 font-display font-black text-5xl leading-none select-none pointer-events-none"
                    style={{ color, opacity: 0.07 }}
                  >
                    {num}
                  </div>
                  <div className="text-[10px] font-display font-bold tracking-[0.2em] uppercase" style={{ color }}>
                    {num}
                  </div>
                  <h3 className="font-display font-bold text-lg tracking-wide text-white">{title}</h3>
                  <p className="text-muted text-sm font-sans leading-relaxed">{desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="pt-8 pb-24 bg-dark">
        <div className="container-site max-w-2xl">
          <SectionHeading
            tag="Our Journey"
            title="Eight Years in the Making"
          />

          <div className="mt-12 space-y-4">
            {timeline.map(({ year, event }, i) => (
              <ScrollReveal key={year} delay={i * 0.07} direction="up">
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-[#1d1814] border border-white/6 hover:border-fire/25 transition-colors duration-300 group"
                >
                  {/* Year badge */}
                  <div
                    className="shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(232,65,24,0.12)', border: '1px solid rgba(232,65,24,0.22)' }}
                  >
                    <span className="font-display font-black text-lg leading-none fire-text">{year}</span>
                  </div>

                  {/* Connector dot */}
                  <motion.div
                    className="shrink-0 w-2 h-2 rounded-full bg-fire/50 group-hover:bg-fire transition-colors duration-300"
                    whileInView={{ scale: [0, 1.4, 1] }}
                    transition={{ duration: 0.35, delay: i * 0.07 + 0.1 }}
                    viewport={{ once: true }}
                  />

                  {/* Event */}
                  <p className="text-white/60 font-sans text-sm leading-relaxed group-hover:text-white/85 transition-colors duration-300">
                    {event}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a06] via-dark to-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,65,24,0.18),transparent_65%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire/20 to-transparent" />

        <div className="relative z-10 container-site py-28 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fire/30 bg-fire/10 text-fire text-xs font-sans font-semibold tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-fire animate-pulse" />
              First Class is Free — No Commitment
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="font-display font-black text-[clamp(2.5rem,7vw,6rem)] leading-none tracking-tight uppercase text-white mb-4">
              Become Part of the <span className="fire-text">Story</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <p className="text-muted font-sans text-lg mb-10 max-w-md mx-auto">
              Every great community needs one more great person. That's you.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="inline-block px-10 py-5 rounded-md font-display font-black text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white shadow-fire-lg hover:shadow-[0_0_50px_rgba(232,65,24,0.55)] transition-shadow duration-300"
                >
                  Join the Family →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/classes"
                  className="inline-block px-8 py-5 rounded-md font-display font-bold text-sm tracking-widest uppercase border border-white/15 text-white/70 hover:border-fire/40 hover:text-white transition-all duration-300"
                >
                  View Classes
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.32}>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm font-sans text-white/35">
              <span>Portsmouth, RI · Est. 2016</span>
              <span className="text-white/15">|</span>
              <span>200+ members strong</span>
              <span className="text-white/15">|</span>
              <span>No contracts. Cancel anytime.</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </PageTransition>
  )
}
