import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import EmberCanvas from '../components/EmberCanvas'

export default function BookingSuccess() {
  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#100c08] to-dark overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <EmberCanvas />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(232,65,24,0.12),transparent_65%)] pointer-events-none" />

        <div className="relative z-10 container-site text-center max-w-lg">
          {/* Fire check icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-fire to-coal flex items-center justify-center mx-auto mb-8 shadow-[0_0_60px_rgba(232,65,24,0.5)]"
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="font-display font-black text-[clamp(2.5rem,7vw,5rem)] leading-none tracking-tight text-white uppercase mb-4">
              You're <span className="fire-text">In.</span>
            </h1>
            <p className="text-white/60 font-sans text-lg leading-relaxed mb-3">
              Your spot is confirmed. Check your email for a receipt and class details.
            </p>
            <p className="text-white/35 font-sans text-sm mb-10">
              See you on the floor. Come ready to work.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/schedule"
                  className="inline-block px-8 py-4 rounded-md font-display font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-fire to-coal text-white"
                >
                  Book Another Class
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/"
                  className="inline-block px-8 py-4 rounded-md font-display font-bold text-sm tracking-widest uppercase border border-white/20 text-white hover:border-fire/50 hover:text-fire transition-all duration-300"
                >
                  Back to Home
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
