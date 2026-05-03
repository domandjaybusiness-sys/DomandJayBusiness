import { motion } from 'framer-motion'

const variants = {
  initial: {
    opacity: 0,
    scale: 0.97,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      // opacity snaps in fast so content is visible immediately
      opacity: { duration: 0.18, ease: 'easeOut' },
      // scale + blur continue slower for the cinematic feel
      scale:  { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      filter: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: 'blur(8px)',
    transition: {
      duration: 0.28,
      ease: [0.55, 0, 1, 0.45],
    },
  },
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ transformOrigin: 'center 25%' }}
    >
      {children}
    </motion.div>
  )
}
