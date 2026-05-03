import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/classes', label: 'Classes' },
  { to: '/schedule', label: 'Book a Class' },
  { to: '/about', label: 'About Us' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
]

const socialLinks = [
  {
    label: 'Iron & Fire Fitness on Instagram',
    href: 'https://instagram.com/ironandfirefit',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Iron & Fire Fitness on Facebook',
    href: 'https://www.facebook.com/Iron-and-Fire-Fitness',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#181310] border-t border-white/5 pt-16 pb-8">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Iron and Fire Fitness"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-fire/30"
              />
              <div>
                <div className="font-display font-black text-xl tracking-wider text-white leading-none">
                  IRON <span className="text-fire">&amp;</span> FIRE
                </div>
                <div className="text-[10px] tracking-[0.2em] text-muted uppercase font-sans leading-none mt-0.5">
                  Fitness · Portsmouth, RI
                </div>
              </div>
            </Link>
            <p className="text-muted text-sm font-sans leading-relaxed max-w-xs">
              A community-first gym where real people forge real strength — together.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, color: '#e84118' }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-md border border-white/10 text-muted hover:border-fire/30 hover:text-fire transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-fire"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-widest uppercase text-white mb-5">
              Navigate
            </h4>
            <ul className="space-y-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-muted hover:text-fire text-sm font-sans transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-widest uppercase text-white mb-5">
              Find Us
            </h4>
            <ul className="space-y-3 text-sm font-sans text-muted">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-fire mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Iron+%26+Fire%2C+275+High+Point+Avenue%2C+Portsmouth+02871+RI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fire transition-colors duration-200"
                >
                  275 High Point Avenue<br />Portsmouth, RI 02871
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-fire shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:4018558004" className="hover:text-fire transition-colors duration-200">
                  (401) 855-8004
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-fire shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mon–Fri 5:30am – 7pm<br />Sat 7am–12pm · Sun 8am–11am</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-fire shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:ironandfire.ri@gmail.com" className="hover:text-fire transition-colors">
                  ironandfire.ri@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted text-xs font-sans">
            © {new Date().getFullYear()} Iron &amp; Fire Fitness. All rights reserved.
          </p>
          <p className="text-muted/50 text-xs font-sans">
            Forged in Portsmouth, RI
          </p>
        </div>
      </div>
    </footer>
  )
}
