import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ScrollReveal from '../components/ScrollReveal'
import SectionHeading from '../components/SectionHeading'
import EmberCanvas from '../components/EmberCanvas'
import SEO from '../components/SEO'

const features = [
  'Unlimited group classes — all types',
  'Circuit Training, Strength & Gym Classes',
  'Boxing & Kickboxing sessions',
  'Yoga & Recovery classes',
  'Open gym access 7 days a week',
  'Personalized onboarding with a coach',
  'Member community & accountability',
  'Access to all future programs & challenges',
  'Family & household discount eligible',
]

const faqs = [
  {
    q: 'Is there a contract or long-term commitment?',
    a: 'No contracts. We operate month-to-month. We\'d rather earn your membership every month than lock you in. Cancel anytime with 30 days notice.',
  },
  {
    q: 'I\'ve never done this before — is this right for me?',
    a: 'Absolutely. Every single class is scalable to your ability. We offer a free intro session to get you comfortable before you jump into a full class. You will not be thrown to the wolves.',
  },
  {
    q: 'What\'s included in the $150/month?',
    a: 'Everything. Unlimited access to all class types — Circuit Training, Strength, Boxing, Yoga, Gym Classes — plus open gym, coaching, community events, and any new programming we add. No hidden fees.',
  },
  {
    q: 'Do you offer any discounts?',
    a: 'We offer family and household discounts, as well as discounts for military, first responders, and teachers. Reach out directly and we\'ll take care of you.',
  },
  {
    q: 'Can I drop in as a visitor?',
    a: 'Yes! Drop-in rates start at $22. Contact us ahead of time so we can make sure there\'s space and a great experience waiting for you.',
  },
  {
    q: 'What if I travel a lot or need to pause?',
    a: 'We offer flexible freeze options for members who need to pause for travel, injury, or life. We want long-term relationships, not short-term transactions.',
  },
]

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  const answerId = `faq-answer-${index}`
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={answerId}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/3 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fire focus-visible:outline-offset-[-2px]"
      >
        <span className="font-display font-bold text-white tracking-wide pr-4">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-fire text-2xl font-light shrink-0 leading-none"
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={answerId}
            key="body"
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-muted font-sans text-sm leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Pricing() {
  return (
    <PageTransition>
      <SEO
        title="Pricing — $150/mo All-Inclusive Gym Membership Portsmouth RI"
        description="One flat rate: $150/month for unlimited CrossFit, strength, boxing, yoga, open gym &amp; more at Iron &amp; Fire Fitness in Portsmouth, RI. No contracts. First class free. Drop-in $22."
        path="/pricing"
      />

      {/* ── HERO + PRICING CARD (unified) ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#100c08] via-[#131009] to-dark pt-24 pb-16">

        {/* Ember canvas behind everything */}
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <EmberCanvas />
        </div>

        {/* Deep radial fire glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(232,65,24,0.13),transparent_65%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_75%_50%,rgba(192,48,14,0.10),transparent_60%)] pointer-events-none" />

        {/* Top + bottom gradient fades */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#100c08] to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none z-10" />

        <div className="container-site relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT: Headline + trust bullets */}
            <div>
              <ScrollReveal direction="left">
                <span className="section-tag mb-4 inline-block">Simple Pricing</span>
                <h1 className="font-display font-black text-[clamp(3rem,7vw,6.5rem)] leading-none tracking-tight text-white uppercase mb-6">
                  One Price.<br />
                  <span className="fire-text">Everything.</span>
                </h1>
                <p className="text-white/55 font-sans text-lg leading-relaxed mb-10 max-w-md">
                  No tiers. No add-ons. No fine print. Just full access to everything Iron & Fire has to offer — for one flat monthly rate.
                </p>
              </ScrollReveal>

              {/* Trust bullets */}
              <ScrollReveal direction="left" delay={0.1}>
                <div className="space-y-4 mb-10">
                  {[
                    { icon: '✗', label: 'No long-term contracts', color: '#e84118' },
                    { icon: '✓', label: 'First class completely free', color: '#22c55e' },
                    { icon: '↓', label: 'Cancel anytime, 30 days notice', color: '#f0932b' },
                    { icon: '⊕', label: 'Family & household discounts', color: '#ffd060' },
                  ].map(({ icon, label, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
                        {icon}
                      </span>
                      <span className="text-white/65 font-sans text-sm">{label}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Social proof */}
              <ScrollReveal direction="left" delay={0.18}>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex -space-x-2">
                    {['#e84118','#f0932b','#ffd060','#c084fc'].map((c, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-dark flex items-center justify-center text-[9px] font-bold text-white" style={{ background: c }}>
                        {['LM','JR','KT','AB'][i]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-white text-xs font-sans font-semibold">200+ active members</div>
                    <div className="text-white/40 text-[10px] font-sans">Portsmouth's #1 boutique gym</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT: Pricing card */}
            <ScrollReveal direction="right" delay={0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                className="relative card-base card-accent p-8 md:p-10 text-center overflow-hidden"
                style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 40px rgba(232,65,24,0.08)' }}
              >
                {/* inner glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,65,24,0.14),transparent_55%)] pointer-events-none" />

                {/* Badge */}
                <div className="relative z-10">
                  <span className="section-tag mb-4 inline-block">All-Inclusive Membership</span>

                  {/* Price */}
                  <div className="flex items-start justify-center gap-1 mb-1">
                    <span className="font-display font-bold text-xl text-fire mt-4">$</span>
                    <span className="font-display font-black text-[6.5rem] leading-none fire-text">150</span>
                  </div>
                  <p className="text-muted font-sans text-xs tracking-[0.2em] uppercase mb-8">per month · no contracts</p>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-fire/20 to-transparent mb-6" />

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 text-left">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-3 font-sans text-sm text-white/70">
                        <span className="w-5 h-5 rounded-full bg-fire/15 border border-fire/30 flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3 text-fire" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/contact"
                      className="block w-full py-4 rounded-md font-display font-black text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white transition-all duration-300"
                      style={{ boxShadow: '0 4px 24px rgba(232,65,24,0.35)' }}
                    >
                      Start Today — First Class Free
                    </Link>
                  </motion.div>

                  <p className="mt-4 text-white/25 text-[10px] font-sans tracking-widest uppercase">
                    $22 drop-in · No commitment required
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── TRUST ROW ── */}
      <section className="py-16 border-y border-white/5 bg-[#181310]">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: 'No Contracts', sub: 'Month-to-month, cancel anytime' },
              { val: 'Free Intro', sub: 'First class is on us' },
              { val: '$22', sub: 'Drop-in rate for visitors' },
              { val: 'Family Rates', sub: 'Household discounts available' },
            ].map(({ val, sub }, i) => (
              <ScrollReveal key={val} delay={i * 0.07}>
                <div>
                  <div className="font-display font-black text-xl md:text-2xl fire-text mb-1">{val}</div>
                  <div className="text-muted text-xs tracking-wider font-sans">{sub}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-dark">
        <div className="container-site max-w-2xl">
          <SectionHeading
            tag="Got Questions?"
            title="Frequently Asked"
            subtitle="If your question isn't here, just reach out. We're real people who actually reply."
          />
          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} delay={i * 0.05}>
                <FAQItem {...faq} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a06] via-dark to-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,65,24,0.16),transparent_65%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire/20 to-transparent" />

        <div className="relative z-10 container-site py-24 text-center">
          <ScrollReveal>
            <h2 className="font-display font-black text-[clamp(2.5rem,7vw,5.5rem)] leading-none tracking-tight uppercase text-white mb-4">
              Still On the <span className="fire-text">Fence?</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <p className="text-muted font-sans text-lg mb-10 max-w-md mx-auto">
              Come in for a free class. Zero pressure, zero commitment. Just a really good workout with really good people.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.16}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="inline-block px-10 py-5 rounded-md font-display font-black text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white shadow-fire-lg hover:shadow-[0_0_50px_rgba(232,65,24,0.55)] transition-shadow duration-300"
                >
                  Claim Your Free Class →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/classes"
                  className="inline-block px-8 py-5 rounded-md font-display font-bold text-sm tracking-widest uppercase border border-white/15 text-white/70 hover:border-fire/40 hover:text-white transition-all duration-300"
                >
                  Explore Classes
                </Link>
              </motion.div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm font-sans text-white/35">
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
