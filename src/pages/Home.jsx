import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import EmberCanvas from '../components/EmberCanvas'
import AnimatedCounter from '../components/AnimatedCounter'
import SEO from '../components/SEO'
import TestimonialsCarousel from '../components/TestimonialsCarousel'

// 3-D tilt card — mouse-tracked, spring-smoothed
function TiltCard({ children, className, style, ...rest }) {
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotX = useTransform(my, [0, 1], [7, -7])
  const rotY = useTransform(mx, [0, 1], [-7, 7])
  const srx = useSpring(rotX, { stiffness: 180, damping: 20 })
  const sry = useSpring(rotY, { stiffness: 180, damping: 20 })

  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, ...style }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
      }}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5) }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

const stats = [
  { value: '200+', label: 'Members' },
  { value: '15+', label: 'Class Types' },
  { value: '8+', label: 'Years Est.' },
]

const classHighlights = [
  {
    color: '#e84118',
    title: 'CrossFit',
    desc: 'High-intensity functional training that builds capacity across all domains of fitness.',
    tag: 'Intensity',
  },
  {
    color: '#f0932b',
    title: 'Olympic Lifting',
    desc: 'Master the snatch and clean & jerk with expert coaching and progressive programming.',
    tag: 'Strength',
  },
  {
    color: '#c0300e',
    title: 'Boxing',
    desc: 'Build real striking skills, conditioning, and mental toughness in every session.',
    tag: 'Combat',
  },
  {
    color: '#ffd060',
    title: 'Open Gym',
    desc: 'Train on your own schedule with full access to all equipment and the Iron & Fire community.',
    tag: 'Flexible',
  },
]


const fireWords = ['BUILT', 'TOGETHER.', 'FORGED', 'DIFFERENT.']

export default function Home() {
  const heroRef = useRef(null)
  const communityRef = useRef(null)

  // ── Mouse parallax ──
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 25, damping: 18 })
  const smoothY = useSpring(mouseY, { stiffness: 25, damping: 18 })

  // Background orbs move opposite to mouse — creates depth illusion
  const orbX = useTransform(smoothX, [-0.5, 0.5], [30, -30])
  const orbY = useTransform(smoothY, [-0.5, 0.5], [20, -20])
  // Text moves very subtly in the same direction — "floats" in front
  const txtX = useTransform(smoothX, [-0.5, 0.5], [-5, 5])
  const txtY = useTransform(smoothY, [-0.5, 0.5], [-3, 3])

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // ── Hero scroll effects ──
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(heroScroll, [0, 0.55], [1, 0])
  const heroY       = useTransform(heroScroll, [0, 0.55], [0, -70])
  const heroScale   = useTransform(heroScroll, [0, 0.55], [1, 0.94])
  const heroBlurRaw = useTransform(heroScroll, [0, 0.4], [0, 18])
  const heroBlur    = useTransform(heroBlurRaw, v => `blur(${v}px)`)

  // ── Community section parallax ──
  const { scrollYProgress } = useScroll({ target: communityRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-18%', '18%'])

  return (
    <PageTransition>
      <SEO
        title="Gym in Portsmouth, RI — CrossFit, Strength & Boxing"
        description="Iron &amp; Fire Fitness is Portsmouth, RI's community gym. CrossFit, strength training, boxing, Olympic lifting, yoga &amp; open gym. 200+ members. First class free — no commitment."
        path="/"
      />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
        <EmberCanvas />

        {/* Mouse-parallax fire orbs — move opposite to mouse for depth */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{ x: orbX, y: orbY }}
        >
          <div
            className="absolute top-1/4 left-[28%] w-[720px] h-[720px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,65,24,0.13) 0%, transparent 65%)', filter: 'blur(48px)' }}
          />
          <div
            className="absolute bottom-[28%] right-[18%] w-[520px] h-[520px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(192,48,14,0.09) 0%, transparent 65%)', filter: 'blur(64px)' }}
          />
          <div
            className="absolute top-[60%] left-[55%] w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(240,147,43,0.06) 0%, transparent 65%)', filter: 'blur(40px)' }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#131009_85%)] pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-[#131009] pointer-events-none z-10" />

        {/* Scroll-driven: fade + drift + blur + scale */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale, filter: heroBlur }}
          className="relative z-20 container-site text-center pt-24 pb-20 will-change-transform"
        >
          {/* Mouse micro-shift on all content */}
          <motion.div style={{ x: txtX, y: txtY }}>

            {/* Eyebrow row — location + Instagram handle */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center justify-center gap-3 mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fire/30 bg-fire/10 text-fire text-xs font-sans font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-fire animate-pulse" />
                Portsmouth, Rhode Island
              </div>
              <a
                href="https://instagram.com/ironandfirefit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/12 bg-white/5 text-white/50 hover:text-white/80 hover:border-white/25 hover:bg-white/8 transition-all duration-200 text-xs font-sans tracking-wide group"
              >
                <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@ironandfirefit</span>
              </a>
            </motion.div>

            {/* Main headline — forge/impact entrance */}
            <h1 className="font-display font-black text-[clamp(3rem,10vw,8rem)] leading-none tracking-tight text-white mb-6 uppercase">

              {/* IRON — punches up from below with spring bounce */}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 80, scale: 0.7, filter: 'blur(20px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.22, type: 'spring', stiffness: 160, damping: 13, mass: 1 }}
              >
                <span className="luxury-shimmer breathe-iron" style={{ animationDelay: '0s' }}>Iron</span>
              </motion.span>

              {/* & — quiet fade with fire trace */}
              <motion.span
                className="inline-block mx-3"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.58, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                &amp;
              </motion.span>

              {/* FIRE — punches up slightly after IRON */}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 80, scale: 0.7, filter: 'blur(20px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.42, type: 'spring', stiffness: 160, damping: 13, mass: 1 }}
              >
                <span className="luxury-shimmer breathe-fire" style={{ animationDelay: '0.55s' }}>Fire</span>
              </motion.span>

            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.72, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            >
              A community gym in Portsmouth, RI where real people forge real strength — together.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.88, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  aria-label="Book your free intro class at Iron &amp; Fire Fitness"
                  className="inline-block px-8 py-4 rounded-md font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white shadow-fire-md hover:shadow-fire-lg transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fire"
                >
                  Start Your Journey
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/classes"
                  aria-label="View all fitness classes at Iron &amp; Fire"
                  className="inline-block px-8 py-4 rounded-md font-display font-bold text-sm tracking-widest uppercase border border-white/20 text-white hover:border-fire/50 hover:text-fire transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fire"
                >
                  View Classes
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <div className="mt-16 flex justify-center gap-6 sm:gap-12">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  className="text-center"
                  initial={{ opacity: 0, y: 22, scale: 0.88, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{ delay: 1.02 + i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="font-display font-black text-4xl fire-text">
                    <AnimatedCounter value={value.replace('+', '')} suffix="+" />
                  </div>
                  <div className="text-muted text-xs tracking-widest uppercase font-sans mt-1">{label}</div>
                </motion.div>
              ))}
            </div>


          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-muted/50 text-xs tracking-widest uppercase font-sans">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-0.5 h-8 bg-gradient-to-b from-fire/60 to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* ── COMMUNITY BANNER ── */}
      <section ref={communityRef} className="relative overflow-hidden -mt-24">
        {/* Full image — no cropping */}
        <motion.div style={{ y: bgY }}>
          <img
            src="/class-photo.jpg"
            alt="Iron and Fire community fitness class in Portsmouth RI — members training together"
            className="w-full block"
            loading="lazy"
            decoding="async"
          />
        </motion.div>
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#131009] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-10 pointer-events-none" />
        {/* Lighter overlay so people are visible */}
        <div className="absolute inset-0 bg-dark/45" />

        <div className="absolute inset-0 flex items-start justify-center z-10 pt-[12%] sm:pt-[8%]">
        <div className="container-site text-center">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {fireWords.map((word, i) => (
                <span
                  key={i}
                  className="font-display font-black text-[clamp(2.5rem,7vw,6rem)] leading-none tracking-tight uppercase fire-text"
                >
                  {word}
                </span>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-white/60 font-sans text-lg max-w-lg mx-auto">
              Over 200 members showing up every day. Not for vanity — for vitality, connection, and a challenge worth doing.
            </p>
          </ScrollReveal>
        </div>
        </div>
      </section>

      {/* ── CLASSES PREVIEW ── */}
      <section className="py-24 bg-dark -mt-8">
        <div className="container-site">
          <SectionHeading
            tag="What We Offer"
            title="Classes Built for Every Level"
            subtitle="From first-timers to competitive athletes, we have programming that meets you where you are and takes you further."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {classHighlights.map(({ color, title, desc, tag }, i) => (
              <ScrollReveal key={title} delay={i * 0.08} direction="up">
                <TiltCard
                  className="relative card-base p-6 h-full flex flex-col gap-4 overflow-hidden cursor-default"
                  style={{ borderLeftColor: color, borderLeftWidth: '3px' }}
                  whileHover={{ y: -8, boxShadow: `0 24px 60px rgba(0,0,0,0.55), 0 0 40px ${color}22` }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 0% 100%, ${color}10, transparent 70%)` }}
                  />
                  <div>
                    <span
                      className="section-tag text-[10px] mb-2 inline-block"
                      style={{ color, borderColor: color + '55', background: color + '18' }}
                    >
                      {tag}
                    </span>
                    <h3 className="font-display font-bold text-xl tracking-wide" style={{ color }}>{title}</h3>
                  </div>
                  <p className="text-muted text-sm font-sans leading-relaxed flex-1">{desc}</p>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-10">
              <Link
                to="/classes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-fire/30 text-fire hover:bg-fire/10 font-display font-bold text-sm tracking-widest uppercase transition-all duration-200"
              >
                Full Schedule →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── IRON SHARPENS IRON ── */}
      <section className="py-12 bg-[#181310] border-y border-white/5">
        <div className="container-site text-center">
          <ScrollReveal>
            <div className="relative inline-block">
              <svg className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 text-fire/20" viewBox="0 0 64 64" fill="none">
                <path d="M32 4 L36 28 L60 32 L36 36 L32 60 L28 36 L4 32 L28 28 Z" fill="currentColor" />
              </svg>
              <p className="font-display font-black text-[clamp(1.8rem,4vw,3.5rem)] text-white/90 leading-tight tracking-tight">
                "Iron sharpens iron —{' '}
                <span className="fire-text">so one person</span>{' '}
                sharpens another."
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-6 text-muted font-sans text-base tracking-widest uppercase">
              Proverbs 27:17 · The foundation of everything we do
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── RESULTS PROOF ── */}
      <section className="py-16 bg-dark">
        <div className="container-site">
          <ScrollReveal>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <img
                src="/transformation.jpg"
                alt="Iron and Fire member body transformation results after 60 days of training in Portsmouth RI"
                className="w-full h-[380px] md:h-[480px] object-contain object-center bg-[#1a1410]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-lg">
                <span className="section-tag mb-3 inline-block">Real Results</span>
                <h3 className="font-display font-black text-3xl md:text-4xl text-white leading-tight mb-3 uppercase">
                  This is What <span className="fire-text">60 Days</span> Looks Like.
                </h3>
                <p className="text-white/60 font-sans text-sm leading-relaxed">
                  Real member. Real commitment. No shortcuts — just showing up and doing the work with a community behind you.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsCarousel />

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a06] via-dark to-dark" />

        {/* Pulsing radial glow */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.32, 0.2] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,65,24,0.22),transparent_65%)] pointer-events-none"
        />
        {/* Secondary offset pulse */}
        <motion.div
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(192,48,14,0.16),transparent_55%)] pointer-events-none"
        />

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire/30 to-transparent" />

        <div className="relative z-10 container-site py-28 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fire/30 bg-fire/10 text-fire text-xs font-sans font-semibold tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-fire animate-pulse" />
              First Class is Free — No Commitment
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="font-display font-black text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight uppercase mb-6">
              <span className="text-white">Your Best</span><br />
              <span className="fire-text">Self Starts Here.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <p className="text-white/55 font-sans text-xl max-w-xl mx-auto mb-12 leading-relaxed">
              200+ members in Portsmouth, RI already made the move. Come try a free class — real coaching, real community, zero pressure.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.26}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="inline-block px-10 py-5 rounded-md font-display font-black text-base tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white shadow-fire-lg hover:shadow-[0_0_50px_rgba(232,65,24,0.55)] transition-shadow duration-300"
                >
                  Book My Free Class →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/pricing"
                  className="inline-block px-8 py-5 rounded-md font-display font-bold text-sm tracking-widest uppercase border border-white/15 text-white/70 hover:border-fire/40 hover:text-white transition-all duration-300"
                >
                  View Membership
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.36}>
            <div className="mt-14 flex flex-wrap justify-center gap-8 text-sm font-sans text-white/40">
              <span className="flex items-center gap-1.5"><span className="text-fire">★★★★★</span> 5-star coaches</span>
              <span className="text-white/15">|</span>
              <span>No contracts. Cancel anytime.</span>
              <span className="text-white/15">|</span>
              <span>Portsmouth, RI · Est. 2016</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </PageTransition>
  )
}
