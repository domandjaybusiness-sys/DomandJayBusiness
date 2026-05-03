import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/classes', label: 'Classes' },
  { to: '/schedule', label: 'Book' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Scroll progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0, filter: 'blur(8px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-dark/95 backdrop-blur-md border-b border-white/5 shadow-[0_4px_32px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-site">
          <nav className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.img
                src="/logo.jpg"
                alt="Iron and Fire Fitness"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-fire/40 group-hover:ring-fire transition-all duration-300"
                whileHover={{ scale: 1.08, filter: 'drop-shadow(0 0 12px rgba(232,65,24,0.5))' }}
                whileTap={{ scale: 0.96 }}
              />
              <div className="hidden sm:block">
                <div className="font-display font-black text-xl tracking-wider text-white group-hover:text-fire transition-colors duration-300 leading-none">
                  IRON <span className="text-coal">&amp;</span> FIRE
                </div>
                <div className="text-[10px] tracking-[0.2em] text-muted uppercase font-sans leading-none mt-0.5">
                  Fitness · Portsmouth, RI
                </div>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-sans font-medium tracking-wide transition-colors duration-200 rounded-md group ${
                      isActive ? 'text-fire' : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-md bg-fire/10 border border-fire/20"
                          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="ml-4 px-5 py-2 rounded-md font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white border border-fire/30 hover:shadow-fire-sm transition-all duration-300 hover:scale-105"
              >
                Join Now
              </Link>
            </div>

            {/* Mobile hamburger */}
            <motion.button
              onClick={() => setOpen(v => !v)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-md text-white hover:text-fire focus:outline-none"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-current rounded transition-all"
              />
              <motion.span
                animate={open ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
                className="block w-6 h-0.5 bg-current rounded transition-all"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-current rounded transition-all"
              />
            </motion.button>
          </nav>
        </div>

        {/* Scroll progress bar — fire gradient line at bottom of header */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left"
          style={{
            scaleX,
            background: 'linear-gradient(90deg, #c0300e, #e84118 40%, #f0932b 70%, #ffd060 100%)',
          }}
        />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
            exit={{ opacity: 0, height: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-dark/98 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="container-site py-4 flex flex-col gap-1">
              {links.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-md font-sans font-medium tracking-wide transition-colors duration-200 ${
                        isActive
                          ? 'text-fire bg-fire/10 border border-fire/20'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.05, duration: 0.25 }}
                className="pt-2"
              >
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block text-center px-5 py-3 rounded-md font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white"
                >
                  Join Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
