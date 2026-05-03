import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-white/70 bg-[rgba(255,255,255,0.85)] shadow-soft backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="container-site">
          <nav className="flex items-center justify-between py-4">
            <a href="#top" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#1f3c88_0%,#4f6ddf_100%)] text-sm font-bold tracking-[0.18em] text-white shadow-[0_16px_32px_rgba(31,60,136,0.24)]">
                DJ
              </span>
              <div>
                <div className="font-display text-lg font-semibold tracking-tight text-slate-950">
                  Domandjaybusiness
                </div>
                <div className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                  Digital Business Services
                </div>
              </div>
            </a>

            <div className="hidden items-center gap-2 lg:flex">
              {links.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="nav-link rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-950"
                >
                  {label}
                </a>
              ))}
              <a href="#contact" className="button-primary ml-3">
                Get Started
              </a>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex rounded-full border border-slate-200 bg-[rgba(255,255,255,0.9)] p-3 text-slate-900 shadow-sm lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <span className={`h-0.5 w-5 rounded-full bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
                <span className={`h-0.5 w-5 rounded-full bg-current transition ${open ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-5 rounded-full bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
              </div>
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="sticky top-[77px] z-40 border-b border-slate-200 bg-white/96 backdrop-blur-xl lg:hidden"
          >
            <div className="container-site flex flex-col gap-2 py-4">
              {links.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="mobile-nav-link rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  {label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="button-primary justify-center text-center">
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
