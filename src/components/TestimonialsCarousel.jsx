import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import SectionHeading from './SectionHeading'
import { injectJsonLD } from './SEO'

// ── Filtered + cleaned real member reviews ────────────────────────────────────
const REVIEWS = [
  {
    name: 'Karen B.',
    text: "Liz has created a great community at Iron and Fire. I've been to many gyms — this one is the best around. Liz is tough, caring, and creative. I recommend any of her classes.",
    class: 'Fire 45 · Liz Moniz',
  },
  {
    name: 'Kristin B.',
    text: "Liz's class is amazing! She brings so much energy and makes it fun for everyone. You feel welcomed the moment you walk in, no matter your fitness level. Highly recommend!",
    class: 'Fire Circuit · Liz Moniz',
  },
  {
    name: 'Kateri B.',
    text: 'My favorite part of the day. Good people, good music, great workout — and the best leader. Liz knows how to push you and make you laugh.',
    class: 'Embers Circuit · Liz Moniz',
  },
  {
    name: 'Leslie C.',
    text: 'Challenging but attainable goals throughout the whole class, working all your muscles. Liz brings such high energy and gives you positive reinforcement the whole way through.',
    class: 'Blazing Full Body Burn · Liz Moniz',
  },
  {
    name: 'Kristin B.',
    text: "Matt's circuit class was awesome — fun, easy to follow, and he kept the energy up the whole time. Effective but totally doable for all fitness levels.",
    class: 'Embers Circuit · Matthew Sweeney',
  },
  {
    name: 'Cheryl K.',
    text: "Monika's class was amazing! Great workout and great cues. Loved every minute of it.",
    class: 'Focus: Lower Body · Monika Pawluskiewicz',
  },
  {
    name: 'Shelly N.',
    text: 'Challenging class with a great balance of cardio and strength training. Welcoming environment from the moment you walk in.',
    class: 'Forged Full Body · Richard Hart',
  },
  {
    name: 'Carolyn S.',
    text: 'Great glute workout! Abs too — always a challenge while being entertained by Liz. Class goes by so fast!',
    class: 'Focus: Lower Body · Liz Moniz',
  },
  {
    name: 'Monika P.',
    text: 'Such a great class! Love the high energy — keeps me on schedule and doing exercises I would never do on my own.',
    class: 'Iron & Fire Circuit · Liz Moniz',
  },
  {
    name: 'Kim A.',
    text: 'Great class with four stations, 6–7 exercises each. Great variety — something for everyone!',
    class: 'Fire Circuit · Liz Moniz',
  },
  {
    name: 'Monika P.',
    text: 'Challenging, fast, and a great variety of exercises!',
    class: 'Focus: Lower Body · Monika Pawluskiewicz',
  },
  {
    name: 'Monika P.',
    text: 'Always a good burn and lots of fun too!',
    class: 'Focus: GGG · Liz Moniz',
  },
  {
    name: 'Karen B.',
    text: 'Wonderful Sunday morning yoga — so grateful for Christina and this entire community.',
    class: 'Ember Flow & Restore · Christina Logan',
  },
  {
    name: 'Monika P.',
    text: 'So fun and full of variety! This is exactly the kind of class that keeps you coming back.',
    class: 'Focus: Upper & Core · Monika Pawluskiewicz',
  },
  {
    name: 'Monika P.',
    text: 'Always intense, always fun. This gym keeps me consistent like nothing else has.',
    class: 'Blazing Full Body Burn · Liz Moniz',
  },
]

// ── JSON-LD schema ─────────────────────────────────────────────────────────────
const REVIEWS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Iron & Fire Fitness',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: String(REVIEWS.length),
    bestRating: '5',
    worstRating: '5',
  },
  review: REVIEWS.map(r => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewBody: r.text,
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
  })),
}

// ── Framer Motion variants — full swipe left/right ────────────────────────────
const variants = {
  enter: dir => ({ x: dir > 0 ? '100%' : '-100%' }),
  center: { x: '0%' },
  exit:  dir => ({ x: dir > 0 ? '-100%' : '100%' }),
}

// ── Individual review card ─────────────────────────────────────────────────────
function ReviewCard({ review }) {
  return (
    <motion.article
      whileHover={{ y: -5, borderColor: 'rgba(232,65,24,0.28)' }}
      transition={{ duration: 0.22 }}
      className="card-base p-7 flex flex-col gap-5 h-full relative overflow-hidden cursor-default"
      itemScope
      itemType="https://schema.org/Review"
    >
      {/* Decorative quote mark */}
      <div
        className="absolute top-4 right-5 font-display font-black leading-none pointer-events-none select-none"
        style={{ fontSize: '5rem', color: 'rgba(232,65,24,0.07)' }}
        aria-hidden="true"
      >
        "
      </div>

      {/* Subtle top-border glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire/20 to-transparent" />

      {/* Stars */}
      <div className="flex gap-0.5" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-3.5 h-3.5 text-fire"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Review text */}
      <blockquote
        className="relative text-white/72 font-sans text-sm leading-relaxed flex-1"
        itemProp="reviewBody"
      >
        "{review.text}"
      </blockquote>

      {/* Name + class */}
      <div className="border-t border-white/5 pt-4 flex items-center justify-between gap-3">
        <span
          className="font-display font-bold text-white tracking-wide text-sm shrink-0"
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
        >
          <span itemProp="name">{review.name}</span>
        </span>
        <span className="text-fire/45 text-[10px] font-sans tracking-wide text-right leading-snug max-w-[160px]">
          {review.class}
        </span>
      </div>
    </motion.article>
  )
}

// ── Main carousel component ───────────────────────────────────────────────────
export default function TestimonialsCarousel() {
  // cards per page: 3 desktop / 1 mobile — init from window to avoid flash
  const [cpp, setCpp] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1
  )
  const [page, setPage]   = useState(0)
  const [dir, setDir]     = useState(1)
  const [paused, setPaused] = useState(false)

  // Sync to viewport changes
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => {
      setCpp(mq.matches ? 1 : 3)
      setPage(0)
    }
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Inject JSON-LD once
  useEffect(() => { injectJsonLD('reviews', REVIEWS_SCHEMA) }, [])

  const pages = Math.ceil(REVIEWS.length / cpp)

  const go = useCallback((p, d) => {
    setDir(d)
    setPage(((p % pages) + pages) % pages)
  }, [pages])

  const next = useCallback(() => go(page + 1,  1), [page, go])
  const prev = useCallback(() => go(page - 1, -1), [page, go])

  // Auto-rotate
  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [paused, next])

  // Keyboard navigation
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Slice current page's reviews (wrap-around safe)
  const visibleReviews = Array.from({ length: cpp }, (_, i) =>
    REVIEWS[(page * cpp + i) % REVIEWS.length]
  )

  return (
    <section
      className="py-24 bg-[#181310] border-t border-white/5"
      aria-label="Member testimonials"
      aria-roledescription="carousel"
    >
      <div className="container-site">

        <ScrollReveal>
          <SectionHeading
            tag="Real Members"
            title="What Our Members Say"
            subtitle="Over 200 members strong — here's what a few of them have to say about training at Iron &amp; Fire."
          />
        </ScrollReveal>

        <div className="mt-14">

          {/* Carousel track — pause only when hovering the cards themselves */}
          <div
            style={{ display: 'grid', overflow: 'hidden' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={page}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ gridColumn: 1, gridRow: 1 }}
                className={`grid gap-6 w-full ${cpp === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}
                aria-live="polite"
                aria-atomic="true"
              >
                {visibleReviews.map((r, i) => (
                  <ReviewCard key={`${page}-${i}`} review={r} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls: prev · dots · next */}
          <div className="flex items-center justify-center gap-4 mt-10">

            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous testimonials"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-fire/40 hover:text-fire transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fire"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pages">
              {[...Array(pages)].map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === page}
                  aria-label={`Page ${i + 1} of ${pages}`}
                  onClick={() => go(i, i > page ? 1 : -1)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fire ${
                    i === page
                      ? 'w-6 bg-fire'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next testimonials"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-fire/40 hover:text-fire transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fire"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </section>
  )
}
