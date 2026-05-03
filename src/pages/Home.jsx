import { motion, useReducedMotion } from 'framer-motion'
import SEO from '../components/SEO'
import ScrollReveal from '../components/ScrollReveal'

const services = [
  {
    title: 'Website Design',
    description: 'Custom business websites that explain your offer clearly, feel credible, and move visitors toward action.',
    icon: (
      <path d="M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75ZM7.5 8.5h9M7.5 12h5.5M7.5 15.5h7" />
    ),
  },
  {
    title: 'Landing Pages',
    description: 'Focused pages for offers, promotions, and campaigns built to generate leads, bookings, and online sales.',
    icon: (
      <path d="M4.75 8.75 12 4l7.25 4.75v6.5L12 20l-7.25-4.75v-6.5ZM9 11.5l2 2 4-4" />
    ),
  },
  {
    title: 'Brand Presence Setup',
    description: 'Polished online profiles, messaging, and business essentials that help customers trust you faster.',
    icon: (
      <path d="M12 4.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm-6 14a6 6 0 1 1 12 0v.75H6v-.75Z" />
    ),
  },
  {
    title: 'Content Updates',
    description: 'Reliable support for edits, new sections, offers, and ongoing improvements after your site goes live.',
    icon: (
      <path d="m7.5 16.5 1.5-4.5L16.75 4.25a1.768 1.768 0 1 1 2.5 2.5L11.5 14.5 7 16l.5-.5ZM5 19.25h14" />
    ),
  },
  {
    title: 'Digital Support',
    description: 'Help with forms, contact flows, service pages, and the small but important details that keep business moving.',
    icon: (
      <path d="M6.75 5h10.5A2.75 2.75 0 0 1 20 7.75v5.5A2.75 2.75 0 0 1 17.25 16H12l-4 3v-3H6.75A2.75 2.75 0 0 1 4 13.25v-5.5A2.75 2.75 0 0 1 6.75 5ZM8 9h8M8 12h5" />
    ),
  },
]

const advantages = [
  'Professional results that make your business look established',
  'Fast, organized delivery with clear milestones and updates',
  'Simple communication without technical overwhelm',
  'Supportive service before, during, and after launch',
  'Clean strategy focused on inquiries, bookings, and sales',
]

const testimonials = [
  {
    quote: 'Domandjaybusiness took our idea and turned it into a website that finally feels like our business. Clients immediately commented on how polished and clear everything looked.',
    name: 'Alicia M.',
    role: 'Consulting Founder',
  },
  {
    quote: 'The process was smooth, responsive, and professional from start to finish. We launched faster than expected and started receiving better quality inquiries right away.',
    name: 'Marcus T.',
    role: 'Small Business Owner',
  },
  {
    quote: 'What stood out most was the communication. Every step was explained clearly, and the final result gave us a much stronger online presence.',
    name: 'Nina R.',
    role: 'Personal Brand Entrepreneur',
  },
]

const packages = [
  {
    name: 'Starter',
    price: '$249',
    subtitle: 'Best for individuals and new businesses that need a polished online starting point.',
    description: 'A streamlined launch package for service providers, side businesses, and personal brands that want a clean, credible website without overcomplicating the process.',
    details: {
      turnaround: '3 to 5 business days',
      revisions: '1 focused revision round',
      support: '7 days of post-delivery support',
      delivery: 'One-page launch-ready website',
    },
    features: [
      'Custom one-page website tailored to your business',
      'Mobile-responsive design for phone, tablet, and desktop',
      'Professional hero, about, services, and contact sections',
      'Clear call-to-action placement to guide inquiries',
      'Basic messaging refinement for stronger clarity',
      'Contact form or inquiry section setup',
      'Launch-ready delivery with clean handoff notes',
    ],
    cta: 'Choose Starter',
  },
  {
    name: 'Growth',
    price: '$549',
    subtitle: 'Best for entrepreneurs and growing businesses ready to convert more visitors into leads.',
    description: 'A more complete business website built for clarity, trust, and stronger conversion performance. This is the best fit for businesses that want a more established online presence.',
    details: {
      turnaround: '5 to 7 business days',
      revisions: '2 revision rounds included',
      support: '14 days of post-delivery support',
      delivery: 'Multi-section or multi-page business site',
    },
    features: [
      'Everything in Starter, with a more strategic site structure',
      'Up to 5 sections or pages based on your offer',
      'Expanded service presentation and conversion messaging',
      'Lead capture layout with stronger CTA flow',
      'Copy guidance for headlines, service blurbs, and trust sections',
      'Testimonials, FAQ, and package/pricing integration',
      'Priority polish for spacing, visual hierarchy, and mobile UX',
      'Launch recommendations to help you present the site confidently',
    ],
    featured: true,
    cta: 'Choose Growth',
  },
  {
    name: 'Premium',
    price: '$899',
    subtitle: 'Best for businesses that want a premium presentation, deeper customization, and stronger long-term support.',
    description: 'A higher-touch website package for brands that want a more custom digital presence, more detailed content structure, and extra support before and after launch.',
    details: {
      turnaround: '7 to 12 business days',
      revisions: '3 revision rounds included',
      support: '30 days of post-delivery support',
      delivery: 'Custom premium site experience with launch guidance',
    },
    features: [
      'Everything in Growth, expanded for a more premium experience',
      'Advanced homepage design with stronger visual depth',
      'Additional sales, services, or conversion-focused sections',
      'More detailed page structure for complex offers',
      'Strategy call to align messaging and site goals',
      'Higher-touch refinement for premium presentation and trust',
      'Post-launch update window for final adjustments',
      'Guidance on future improvements, scaling, and next steps',
    ],
    cta: 'Choose Premium',
  },
]

const faqs = [
  {
    question: 'What is included in each website package?',
    answer: 'Each package includes custom design, responsive layout, structured page sections, CTA placement, and launch-ready delivery. Higher tiers include more sections, more refined messaging support, additional revisions, and longer post-launch support.',
  },
  {
    question: 'How do payment terms work?',
    answer: 'Projects typically begin with an upfront deposit to reserve the build and start work, with the remaining balance due before final delivery. This keeps the process clear, structured, and predictable for both sides.',
  },
  {
    question: 'How many revisions are included?',
    answer: 'Starter includes 1 revision round, Growth includes 2, and Premium includes 3. Revision rounds are designed to help refine content, layout, and presentation without making the project feel open-ended or confusing.',
  },
  {
    question: 'How long does delivery usually take?',
    answer: 'Most Starter sites are delivered within 3 to 5 business days, Growth projects within 5 to 7 business days, and Premium projects within 7 to 12 business days. Timelines can vary slightly based on scope and feedback turnaround.',
  },
  {
    question: 'Do you offer support after delivery?',
    answer: 'Yes. Every package includes a post-delivery support window, and ongoing update support can also be arranged if you want continued help after launch.',
  },
]

const pricingReassurance = [
  'Transparent pricing with no hidden fees or surprise add-ons',
  'Clear communication from project kickoff through final delivery',
  'Defined revision rounds so expectations stay simple and fair',
  'Support after delivery so you are not left figuring things out alone',
]

const stats = [
  { value: 'Fast', label: 'turnaround built for momentum' },
  { value: 'Clear', label: 'communication from start to launch' },
  { value: 'Focused', label: 'design decisions tied to conversions' },
]

function Icon({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      {children}
    </svg>
  )
}

function SectionLabel({ children }) {
  return <span className="section-label">{children}</span>
}

function FloatingShape({ className, delay = 0, duration = 10 }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: [0, -14, 0],
              rotateX: [0, 4, 0],
              rotateY: [0, -6, 0],
              rotateZ: [0, 3, 0],
              scale: [1, 1.02, 1],
            }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              delay,
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
    />
  )
}

export default function Home() {
  return (
    <>
      <SEO
        title="Modern Digital Services for Growing Businesses"
        description="Domandjaybusiness helps individuals, entrepreneurs, and small businesses launch polished websites and digital services that build trust and generate inquiries."
        path="/"
      />

      <div id="top" className="overflow-hidden">
        <section className="hero-shell">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-depth-grid" aria-hidden="true">
            <FloatingShape className="floating-shape floating-disc floating-disc-one" delay={0.1} duration={11} />
            <FloatingShape className="floating-shape floating-panel floating-panel-one" delay={0.35} duration={13} />
            <FloatingShape className="floating-shape floating-ring floating-ring-one" delay={0.55} duration={12} />
            <FloatingShape className="floating-shape floating-panel floating-panel-two" delay={0.25} duration={14} />
          </div>

          <div className="container-site relative z-10 pt-8 pb-16 md:pt-12 md:pb-24">
            <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
              <ScrollReveal className="max-w-2xl">
                <SectionLabel>Trusted Digital Services</SectionLabel>
                <h1 className="mt-6 max-w-3xl text-balance font-display text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                  Professional websites and digital support that help businesses look ready for growth.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  Domandjaybusiness creates modern online experiences for individuals, entrepreneurs, and small businesses that want to earn trust quickly, explain their value clearly, and turn attention into action.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a href="#contact" className="button-primary text-center">Get Started</a>
                  <a href="#about" className="button-secondary text-center">Learn More</a>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-3">
                  {stats.map((item, index) => (
                    <motion.div
                      key={item.value}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 + index * 0.08, duration: 0.45 }}
                      className="rounded-3xl border border-white/70 bg-[rgba(255,255,255,0.78)] p-5 shadow-soft backdrop-blur"
                    >
                      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">{item.value}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1} direction="left">
                <div className="hero-stack relative rounded-[2rem] border border-white/70 bg-[rgba(255,255,255,0.88)] p-6 shadow-panel backdrop-blur-xl sm:p-8">
                  <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(79,109,223,0.4),transparent)]" />
                  <div className="hero-card-shadow-layer" aria-hidden="true" />
                  <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-brand-200">Launch-ready setup</p>
                        <h2 className="mt-2 font-display text-2xl font-semibold">Built to convert, not just decorate</h2>
                      </div>
                      <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">Premium</span>
                    </div>

                    <div className="mt-8 grid gap-4">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <p className="text-sm font-medium text-white/70">What clients get</p>
                        <p className="mt-2 text-base leading-7 text-white/92">
                          Clear messaging, polished page structure, strong calls to action, and a smooth mobile experience that helps visitors feel confident about reaching out or buying.
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                          <div className="text-3xl font-display font-semibold text-white">3 steps</div>
                          <p className="mt-2 text-sm leading-6 text-white/68">Plan, build, and launch with a process designed to stay simple.</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                          <div className="text-3xl font-display font-semibold text-white">1 goal</div>
                          <p className="mt-2 text-sm leading-6 text-white/68">Help your business look credible and make it easier for customers to say yes.</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-white/65">Need a quote or package recommendation?</p>
                      <a href="#pricing" className="button-dark text-center">View Packages</a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="about" className="section-spacing">
          <div className="container-site">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <ScrollReveal>
                <SectionLabel>About Domandjaybusiness</SectionLabel>
                <h2 className="section-title mt-5">A modern online business built to help growing brands show up with clarity and confidence.</h2>
              </ScrollReveal>

              <ScrollReveal delay={0.12} direction="left">
                <div className="panel-card">
                  <p className="text-lg leading-8 text-slate-700">
                    Domandjaybusiness helps people and businesses move from having an idea to having a polished digital presence that feels professional, trustworthy, and ready for real customers.
                  </p>
                  <p className="mt-5 text-base leading-7 text-slate-600">
                    We focus on smart website-based services, practical support, and simple communication. That means less confusion, fewer delays, and a better final result for busy business owners who need quality without the noise.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section id="services" className="section-spacing pt-0">
          <div className="container-site">
            <ScrollReveal>
              <SectionLabel>Services</SectionLabel>
              <h2 className="section-title mt-5 max-w-3xl">Digital services designed to support your website, your offer, and your customer journey.</h2>
            </ScrollReveal>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <ScrollReveal key={service.title} delay={index * 0.06}>
                  <article className="service-card">
                    <div className="icon-badge">
                      <Icon>{service.icon}</Icon>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-slate-950">{service.title}</h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">{service.description}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="why-us" className="section-spacing">
          <div className="container-site">
            <div className="feature-band">
              <div>
                <SectionLabel>Why Choose Us</SectionLabel>
                <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Reliable service, thoughtful execution, and support that keeps your project moving.
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {advantages.map((item, index) => (
                  <ScrollReveal key={item} delay={index * 0.05}>
                    <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,0.06)] p-5">
                      <div className="flex items-start gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-brand-100">
                          {index + 1}
                        </span>
                        <p className="text-base leading-7 text-white/82">{item}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="section-spacing pt-0">
          <div className="container-site">
            <ScrollReveal>
              <SectionLabel>Testimonials</SectionLabel>
              <h2 className="section-title mt-5 max-w-3xl">Businesses trust us to turn ideas into polished online experiences that feel ready to sell.</h2>
            </ScrollReveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <ScrollReveal key={testimonial.name} delay={index * 0.08}>
                  <blockquote className="panel-card h-full">
                    <p className="text-lg leading-8 text-slate-700">“{testimonial.quote}”</p>
                    <footer className="mt-8 border-t border-slate-200 pt-5">
                      <div className="font-semibold text-slate-950">{testimonial.name}</div>
                      <div className="text-sm text-slate-500">{testimonial.role}</div>
                    </footer>
                  </blockquote>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="section-spacing">
          <div className="container-site">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <ScrollReveal>
                <SectionLabel>Packages</SectionLabel>
                <h2 className="section-title mt-5 max-w-4xl">Clear website packages designed to help you choose with confidence.</h2>
                <p className="section-copy mt-5 max-w-3xl">
                  Each package gives you a professional online presence, a clearly defined scope, and a smoother path to launch. Choose the level of strategy, structure, and support that fits your business right now.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <a href="#contact" className="button-secondary w-full text-center sm:w-auto">Book a Consultation</a>
              </ScrollReveal>
            </div>

            <div className="pricing-stage mt-12">
              <div className="pricing-depth-orb pricing-depth-orb-left" aria-hidden="true" />
              <div className="pricing-depth-orb pricing-depth-orb-right" aria-hidden="true" />
              <div className="grid gap-5 xl:grid-cols-3">
              {packages.map((pkg, index) => (
                <ScrollReveal key={pkg.name} delay={index * 0.07}>
                  <article className={`pricing-card ${pkg.featured ? 'pricing-card-featured' : ''}`}>
                    {pkg.featured && <span className="pricing-badge">Most Popular</span>}
                    <div className="pricing-card-top">
                      <div>
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-950">{pkg.name}</h3>
                        <div className="mt-4 font-display text-5xl font-semibold tracking-tight text-slate-950">{pkg.price}</div>
                        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">{pkg.subtitle}</p>
                      </div>
                      <p className="mt-4 text-base leading-7 text-slate-600">{pkg.description}</p>
                    </div>

                    <div className="pricing-meta-grid mt-6">
                      <div className="pricing-meta-item">
                        <span className="pricing-meta-label">Turnaround</span>
                        <span className="pricing-meta-value">{pkg.details.turnaround}</span>
                      </div>
                      <div className="pricing-meta-item">
                        <span className="pricing-meta-label">Revisions</span>
                        <span className="pricing-meta-value">{pkg.details.revisions}</span>
                      </div>
                      <div className="pricing-meta-item">
                        <span className="pricing-meta-label">Support</span>
                        <span className="pricing-meta-value">{pkg.details.support}</span>
                      </div>
                      <div className="pricing-meta-item">
                        <span className="pricing-meta-label">Delivery</span>
                        <span className="pricing-meta-value">{pkg.details.delivery}</span>
                      </div>
                    </div>

                    <div className="pricing-feature-wrap mt-7">
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">What’s included</div>
                      <div className="mt-4 flex flex-col gap-3">
                        {pkg.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                            <span className="pricing-check mt-0.5">+</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a href="#contact" className={`mt-8 ${pkg.featured ? 'button-primary' : 'button-secondary'} text-center`}>
                      {pkg.cta}
                    </a>
                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      Ideal if you want a straightforward process, clear communication, and a polished result that feels ready for real customers.
                    </p>
                  </article>
                </ScrollReveal>
              ))}
              </div>
            </div>

            <ScrollReveal delay={0.2}>
              <div className="pricing-reassurance mt-10">
                {pricingReassurance.map((item) => (
                  <div key={item} className="pricing-reassurance-item">
                    <span className="pricing-reassurance-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.24}>
              <div className="pricing-note-panel mt-8">
                Payment plans, direct checkout, or custom quotes can also be arranged if your project needs something between packages.
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="faq" className="section-spacing pt-0">
          <div className="container-site">
            <ScrollReveal>
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="section-title mt-5 max-w-3xl">Common questions from businesses planning their next digital move.</h2>
            </ScrollReveal>

            <div className="mt-12 grid gap-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={faq.question} delay={index * 0.04}>
                  <details className="faq-card group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                      <span className="font-display text-xl font-semibold tracking-tight text-slate-950">{faq.question}</span>
                      <span className="rounded-full border border-slate-200 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-500 transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{faq.answer}</p>
                  </details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-spacing">
          <div className="container-site">
            <div className="contact-stage grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="contact-depth-slab" aria-hidden="true" />
              <ScrollReveal>
                <div className="panel-card h-full">
                  <SectionLabel>Contact</SectionLabel>
                  <h2 className="section-title mt-5">Tell us what you need and let’s plan the right next step for your business.</h2>
                  <p className="mt-5 text-base leading-7 text-slate-600">
                    Whether you need a new website, a better landing page, or ongoing digital support, Domandjaybusiness is ready to help you move forward with a clear and professional solution.
                  </p>

                  <div className="mt-8 space-y-5 text-sm text-slate-600">
                    <div>
                      <div className="font-semibold uppercase tracking-[0.18em] text-slate-500">Email</div>
                      <a href="mailto:hello@domandjaybusiness.com" className="mt-2 inline-block text-base text-slate-950 transition hover:text-brand-700">
                        hello@domandjaybusiness.com
                      </a>
                    </div>
                    <div>
                      <div className="font-semibold uppercase tracking-[0.18em] text-slate-500">Social</div>
                      <div className="mt-3 flex flex-wrap gap-3">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-pill">Instagram</a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-pill">Facebook</a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-pill">LinkedIn</a>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold uppercase tracking-[0.18em] text-slate-500">Best for</div>
                      <p className="mt-2 text-base leading-7 text-slate-700">
                        Quotes, project questions, launch planning, package selection, and website improvement requests.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1} direction="left">
                <form className="panel-card" action="mailto:hello@domandjaybusiness.com" method="post" encType="text/plain">
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="field-wrap">
                      <span className="field-label">Name</span>
                      <input type="text" name="name" className="input-field" placeholder="Your full name" />
                    </label>
                    <label className="field-wrap">
                      <span className="field-label">Email</span>
                      <input type="email" name="email" className="input-field" placeholder="you@example.com" />
                    </label>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2">
                    <label className="field-wrap">
                      <span className="field-label">Business</span>
                      <input type="text" name="business" className="input-field" placeholder="Business or brand name" />
                    </label>
                    <label className="field-wrap">
                      <span className="field-label">Service Needed</span>
                      <select name="service" className="input-field">
                        <option>Website Design</option>
                        <option>Landing Page</option>
                        <option>Brand Presence Setup</option>
                        <option>Content Updates</option>
                        <option>Digital Support</option>
                      </select>
                    </label>
                  </div>

                  <label className="field-wrap mt-5">
                    <span className="field-label">Project Details</span>
                    <textarea
                      name="details"
                      rows="6"
                      className="input-field min-h-[170px] resize-y"
                      placeholder="Tell us about your goals, timeline, and what kind of support you need."
                    />
                  </label>

                  <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm leading-6 text-slate-500">
                      Ready for quotes, questions, and launch conversations.
                    </p>
                    <button type="submit" className="button-primary">
                      Send Inquiry
                    </button>
                  </div>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
