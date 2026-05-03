import { motion, useReducedMotion } from 'framer-motion'

export default function ScrollReveal({
  children, delay = 0, direction = 'up', className = '', once = true,
}) {
  const shouldReduceMotion = useReducedMotion()
  const dist = 28
  const initial = {
    opacity: shouldReduceMotion ? 1 : 0,
    filter: shouldReduceMotion ? 'blur(0px)' : 'blur(6px)',
    scale: shouldReduceMotion ? 1 : direction === 'up' || direction === 'down' ? 0.985 : 1,
    y: shouldReduceMotion ? 0 : direction === 'up' ? dist : direction === 'down' ? -dist : 0,
    x: shouldReduceMotion ? 0 : direction === 'left' ? dist : direction === 'right' ? -dist : 0,
  }
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-60px', amount: 0.18 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
