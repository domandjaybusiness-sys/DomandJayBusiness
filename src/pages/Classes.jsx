import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import SEO from '../components/SEO'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAY_MAP = { Sun: 'Sunday', Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' }

const schedule = {
  Sun: [
    { name: 'Ember Flow & Restore', type: 'Yoga', duration: '60 min', time: '7:00am', coach: 'Christina Logan' },
    { name: 'Burn and Build', type: 'Gym Classes', duration: '45 min', time: '9:00am', coach: 'Liz Moniz' },
  ],
  Mon: [
    { name: 'Embers Circuit', type: 'Circuit Training', duration: '60 min', time: '5:30am', coach: 'Liz Moniz' },
    { name: 'Embers Circuit 45', type: 'Circuit Training', duration: '45 min', time: '7:30am', coach: 'Liz Moniz' },
    { name: 'Focus — AAA (Abs, Arms, Ass)', type: 'Gym Classes', duration: '45 min', time: '8:30am', coach: 'Liz Moniz' },
    { name: 'Iron & Fire Circuit', type: 'Circuit Training', duration: '60 min', time: '4:30pm', coach: 'Jess Caldarone' },
  ],
  Tue: [
    { name: 'Fire 45', type: 'Circuit Training', duration: '45 min', time: '5:45am', coach: 'Liz Moniz' },
    { name: 'Blazing Full Body Burn', type: 'Gym Classes', duration: '60 min', time: '6:30am', coach: 'Liz Moniz' },
    { name: 'Fierce Core & Cardio Power', type: 'Gym Classes', duration: '45 min', time: '9:30am', coach: 'Liz Moniz' },
    { name: 'Strength Training', type: 'Strength Training', duration: '60 min', time: '4:15pm', coach: 'Richard Hart' },
  ],
  Wed: [
    { name: 'Embers Circuit', type: 'Circuit Training', duration: '60 min', time: '5:30am', coach: 'Liz Moniz' },
    { name: 'Iron & Fire Circuit', type: 'Circuit Training', duration: '45 min', time: '7:30am', coach: 'Jess Caldarone' },
    { name: 'Burn and Build', type: 'Gym Classes', duration: '45 min', time: '9:00am', coach: 'Liz Moniz' },
    { name: 'Strength Training', type: 'Strength Training', duration: '60 min', time: '4:30pm', coach: 'Mindy Davis' },
  ],
  Thu: [
    { name: 'Fire 45', type: 'Circuit Training', duration: '45 min', time: '5:45am', coach: 'Liz Moniz' },
    { name: 'Focus — AAA (Abs, Arms, Ass)', type: 'Gym Classes', duration: '45 min', time: '8:30am', coach: 'Liz Moniz' },
    { name: 'Fierce Core & Cardio Power', type: 'Gym Classes', duration: '45 min', time: '9:30am', coach: 'Liz Moniz' },
    { name: 'Boxing & Kickboxing', type: 'Boxing', duration: '60 min', time: '5:00pm', coach: 'Alexandria Dimond' },
  ],
  Fri: [
    { name: 'Embers Circuit', type: 'Circuit Training', duration: '60 min', time: '5:30am', coach: 'Liz Moniz' },
    { name: 'Blazing Full Body Burn', type: 'Gym Classes', duration: '60 min', time: '6:30am', coach: 'Liz Moniz' },
    { name: 'Strength Training', type: 'Strength Training', duration: '60 min', time: '9:00am', coach: 'Monika Pawluskiewicz' },
    { name: 'Iron & Fire Circuit', type: 'Circuit Training', duration: '60 min', time: '4:30pm', coach: 'Jess Caldarone' },
  ],
  Sat: [
    { name: 'Ember Flow & Restore', type: 'Yoga', duration: '60 min', time: '7:00am', coach: 'Christina Logan' },
    { name: 'A$$ Kicking Fire Circuit', type: 'Circuit Training', duration: '60 min', time: '8:00am', coach: 'Liz Moniz' },
    { name: 'Burn and Build', type: 'Gym Classes', duration: '45 min', time: '9:15am', coach: 'Liz Moniz' },
  ],
}

const typeColors = {
  'Circuit Training':  { border: 'border-l-fire',       dot: 'bg-fire',         label: 'text-fire' },
  'Gym Classes':       { border: 'border-l-ember',      dot: 'bg-ember',        label: 'text-ember' },
  'Strength Training': { border: 'border-l-gold',       dot: 'bg-gold',         label: 'text-gold' },
  'Yoga':              { border: 'border-l-[#7dd3fc]',  dot: 'bg-[#7dd3fc]',   label: 'text-[#7dd3fc]' },
  'Boxing':            { border: 'border-l-[#c084fc]',  dot: 'bg-[#c084fc]',   label: 'text-[#c084fc]' },
}

const groupClasses = [
  { color: '#e84118', title: 'Circuit Training',   desc: 'Embers Circuit, Fire 45, Iron & Fire Circuit, A$$ Kicking Fire Circuit. High-intensity, high-reward.',  coaches: 'Liz Moniz · Jess Caldarone · Rebecca Sumner' },
  { color: '#f0932b', title: 'Gym Classes',        desc: 'Blazing Full Body Burn, Fierce Core & Cardio Power, Focus AAA, Burn and Build. Always different.',        coaches: 'Liz Moniz · Anthony Wortham' },
  { color: '#ffd060', title: 'Strength Training',  desc: 'Progressive barbell and kettlebell programming. Real loads, real gains, week over week.',                 coaches: 'Richard Hart · Mindy Davis · Monika Pawluskiewicz' },
  { color: '#c084fc', title: 'Boxing & Kickboxing',desc: 'Full-body conditioning through striking and footwork. Zero experience needed.',                            coaches: 'Alexandria Dimond' },
  { color: '#7dd3fc', title: 'Yoga',               desc: 'Ember Flow & Restore. Flexibility, recovery, reset. The class your body needs between the hard ones.',    coaches: 'Valerie Griffiths · Christina Logan' },
]

const ptOptions = [
  { duration: '30 min', price: 'Contact for pricing' },
  { duration: '45 min', price: 'Contact for pricing' },
  { duration: '60 min', price: 'Contact for pricing' },
]

const MINDBODY_URL = '/schedule'

export default function Classes() {
  const today = new Date().getDay()
  const todayLabel = DAYS[today]
  const [activeDay, setActiveDay] = useState(todayLabel)
  const todayClasses = schedule[activeDay] || []

  return (
    <PageTransition>
      <SEO
        title="Fitness Classes — CrossFit, Boxing, Strength &amp; Yoga in Portsmouth RI"
        description="View the full schedule of fitness classes at Iron &amp; Fire in Portsmouth, Rhode Island. CrossFit, circuit training, strength, boxing, kickboxing, yoga &amp; open gym. Book online."
        path="/classes"
      />

      {/* ── CINEMATIC HERO ── */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        {/* background photo */}
        <div
          className="absolute inset-0 bg-cover bg-[center_20%]"
          style={{ backgroundImage: 'url(/boxing.jpg)' }}
        />
        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/30 to-transparent" />

        {/* content — bottom left */}
        <div className="relative z-10 container-site pb-12 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fire/30 bg-fire/10 text-fire text-[10px] font-sans font-semibold tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-fire animate-pulse" />
              Drop-in $22 · Class Packs · Unlimited
            </span>
            <h1 className="font-display font-black text-[clamp(2.8rem,7vw,6.5rem)] leading-none tracking-tight text-white uppercase">
              Classes &<br /><span className="fire-text">Training</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.5 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link
              to={MINDBODY_URL}
              className="px-6 py-3 rounded-md font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white shadow-fire-md hover:scale-105 hover:shadow-fire-lg transition-all duration-300"
            >
              Book a Class →
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-md font-display font-bold text-sm tracking-widest uppercase border border-white/20 text-white hover:border-fire/50 hover:text-fire transition-all duration-300"
            >
              Free Intro
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SCHEDULE — flows directly from hero ── */}
      <section className="bg-dark pt-12 pb-16">
        <div className="container-site">

          {/* Day tabs with class count */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {DAYS.map(day => {
              const count = schedule[day]?.length ?? 0
              const isActive = activeDay === day
              return (
                <motion.button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full font-display font-bold text-sm tracking-widest uppercase transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-fire to-coal text-white shadow-fire-sm'
                      : 'border border-white/10 text-muted hover:text-white hover:border-fire/30'
                  }`}
                >
                  {day}
                  <span className={`text-[10px] font-sans font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/8 text-muted'
                  }`}>
                    {count}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Class rows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="mt-5 relative"
            >
              {/* vertical timeline line */}
              {todayClasses.length > 0 && (
                <div className="absolute left-[2.35rem] top-4 bottom-4 w-px bg-gradient-to-b from-fire/30 via-fire/10 to-transparent hidden sm:block" />
              )}

              <div className="space-y-2">
                {todayClasses.length === 0 ? (
                  <div className="text-center py-16 text-muted font-sans">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-5 h-5 text-muted/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm tracking-wide">No classes scheduled — rest up and come back strong.</p>
                  </div>
                ) : (
                  todayClasses.map(({ name, type, duration, time, coach }, i) => {
                    const colors = typeColors[type] ?? { border: 'border-l-white/20', dot: 'bg-white/30', label: 'text-muted' }
                    return (
                      <motion.div
                        key={name + time}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                        className={`relative bg-card border border-white/8 border-l-4 ${colors.border} rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 hover:border-white/15 hover:bg-card/80 transition-all duration-200 group`}
                      >
                        {/* timeline dot */}
                        <div className={`absolute left-[-0.42rem] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${colors.dot} shadow-sm hidden sm:block`} />

                        {/* time */}
                        <div className="font-display font-black text-2xl text-white w-28 shrink-0 sm:pl-6">
                          {time}
                        </div>

                        {/* name + meta */}
                        <div className="flex-1 sm:px-4">
                          <div className="font-display font-bold text-white text-base tracking-wide leading-tight">{name}</div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-[10px] font-sans font-semibold tracking-widest uppercase ${colors.label}`}>{type}</span>
                            <span className="text-white/20 text-xs">·</span>
                            <span className="text-muted/70 text-xs font-sans">{coach}</span>
                            <span className="text-white/20 text-xs">·</span>
                            <span className="text-muted/70 text-xs font-sans">{duration}</span>
                          </div>
                        </div>

                        {/* book button */}
                        <Link
                          to={`/schedule?day=${DAY_MAP[activeDay]}`}
                          className="shrink-0 px-4 py-2 rounded-lg text-xs font-display font-bold tracking-widest uppercase border border-fire/25 text-fire hover:bg-fire hover:text-white hover:border-fire transition-all duration-200 opacity-0 group-hover:opacity-100 sm:opacity-100"
                        >
                          Book
                        </Link>
                      </motion.div>
                    )
                  })
                )}
              </div>

              <p className="text-center text-muted/50 text-xs font-sans mt-6">
                Schedule subject to change ·{' '}
                <Link to={MINDBODY_URL} className="text-fire hover:underline">
                  Book a spot →
                </Link>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── 60-DAY CHALLENGE — moved up, high-value anchor ── */}
      <section className="py-16 bg-[#181310] border-y border-white/5">
        <div className="container-site">
          <ScrollReveal>
            <div className="relative rounded-2xl overflow-hidden border border-fire/20 bg-card">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(232,65,24,0.12),transparent_60%)] pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fire via-ember to-transparent" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* left — text */}
                <div className="p-8 md:p-12">
                  <span className="section-tag mb-3 inline-block">Special Program</span>
                  <h2 className="font-display font-black text-4xl md:text-5xl text-white uppercase mb-3 leading-none">
                    The <span className="fire-text">60-Day</span><br />Challenge
                  </h2>
                  <p className="text-muted font-sans text-sm leading-relaxed mb-6 max-w-sm">
                    Commit to 60 days of structured training, accountability, and coaching. Walk away a different person.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-fire/10 border border-fire/25 text-fire text-xs font-sans font-semibold mb-8">
                    🏆 Win your money back + 10 PT sessions
                  </div>
                  <div>
                    <Link
                      to="/contact"
                      className="inline-block px-7 py-3.5 rounded-md font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white shadow-fire-md hover:scale-105 transition-all duration-300"
                    >
                      Join the Challenge
                    </Link>
                  </div>
                </div>

                {/* right — features */}
                <div className="border-t lg:border-t-0 lg:border-l border-white/8 p-8 md:p-12 grid grid-cols-2 gap-4 content-center">
                  {[
                    ['8', 'Personal Training sessions'],
                    ['38', 'Group classes included'],
                    ['2+', 'Classes per week minimum'],
                    ['60', 'Days to transform'],
                    ['✓', 'Before & after measurements'],
                    ['✓', 'Weekly check-ins & journal'],
                  ].map(([val, label]) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="font-display font-black text-2xl fire-text leading-none shrink-0">{val}</div>
                      <div className="text-muted text-xs font-sans leading-snug pt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CLASS TYPES ── */}
      <section className="py-16 bg-dark">
        <div className="container-site">
          <SectionHeading
            tag="What We Offer"
            title="Every Body. Every Level."
            subtitle="Five distinct class types, all coached, all scalable — whether you're week one or year five."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groupClasses.map(({ color, title, desc, coaches }, i) => (
              <ScrollReveal key={title} delay={i * 0.06} direction="up">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative bg-card border border-white/8 rounded-xl p-6 border-l-4 hover:border-white/15 transition-all duration-200 h-full"
                  style={{ borderLeftColor: color }}
                >
                  <h3 className="font-display font-bold text-lg text-white tracking-wide mb-2" style={{ color }}>
                    {title}
                  </h3>
                  <p className="text-muted text-sm font-sans leading-relaxed mb-4">{desc}</p>
                  <div className="flex items-center gap-1.5 text-[10px] font-sans text-muted/60">
                    <svg className="w-3 h-3 shrink-0" fill="currentColor" style={{ color }} viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                    </svg>
                    {coaches}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERSONAL TRAINING ── */}
      <section className="py-16 bg-[#181310] border-t border-white/5">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <ScrollReveal direction="left">
              <div className="space-y-5">
                <span className="section-tag">1-on-1 Coaching</span>
                <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight uppercase">
                  Personal <span className="fire-text">Training</span>
                </h2>
                <p className="text-muted font-sans leading-relaxed text-sm">
                  Certified trainers building fully customized programs around your goals, schedule, and lifestyle. Not a template — your plan.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    'Fat loss & recomposition',
                    'Muscle building',
                    'Injury prevention',
                    'Bridal & event prep',
                    'Post-rehab',
                    'Busy professionals',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm font-sans text-white/60">
                      <span className="w-1 h-1 rounded-full bg-fire shrink-0" />{item}
                    </div>
                  ))}
                </div>
                <p className="text-muted/40 text-xs font-sans italic pt-1">
                  Spots are limited. We only take clients we know we can get results for.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="space-y-3">
                <p className="text-[10px] tracking-widest uppercase text-muted font-sans mb-4">Session lengths</p>
                {ptOptions.map(({ duration }) => (
                  <div
                    key={duration}
                    className="flex items-center justify-between bg-card border border-white/8 rounded-xl px-5 py-4 border-l-4 border-l-fire/40"
                  >
                    <div>
                      <div className="font-display font-bold text-white text-lg">{duration}</div>
                      <div className="text-muted text-xs font-sans">Single session or 10-pack available</div>
                    </div>
                    <Link
                      to="/contact"
                      className="px-4 py-2 rounded-lg text-xs font-display font-bold tracking-widest uppercase border border-fire/30 text-fire hover:bg-fire hover:text-white transition-all duration-200"
                    >
                      Enquire
                    </Link>
                  </div>
                ))}
                <Link
                  to="/contact"
                  className="block text-center mt-2 py-3.5 rounded-md font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white shadow-fire-sm hover:shadow-fire-md hover:scale-[1.02] transition-all duration-300"
                >
                  Book a Free Consultation
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-20 bg-dark border-t border-white/5">
        <div className="container-site text-center">
          <ScrollReveal>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white uppercase mb-4">
              Not Sure Where to <span className="fire-text">Start?</span>
            </h2>
            <p className="text-muted font-sans mb-8 max-w-md mx-auto">
              Come in for a free intro. We'll walk you through everything and find your fit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-md font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white shadow-fire-md hover:scale-105 transition-all duration-300"
              >
                Book a Free Intro
              </Link>
              <Link
                to={MINDBODY_URL}
                className="px-8 py-4 rounded-md font-display font-bold text-sm tracking-widest uppercase border border-white/15 text-white hover:border-fire/40 hover:text-fire transition-all duration-300"
              >
                Browse Full Schedule
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-dark/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-3">
        <Link
          to="/contact"
          className="flex-1 text-center py-3 rounded-md font-display font-bold text-xs tracking-widest uppercase border border-fire/30 text-fire"
        >
          Free Intro
        </Link>
        <Link
          to={MINDBODY_URL}
          className="flex-1 text-center py-3 rounded-md font-display font-bold text-xs tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white"
        >
          Book Now
        </Link>
      </div>

    </PageTransition>
  )
}
