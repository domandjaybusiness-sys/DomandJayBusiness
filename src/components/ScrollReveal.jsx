import { motion } from 'framer-motion'

export default function ScrollReveal({
  children, delay = 0, direction = 'up', className = '', once = true,
}) {
  const dist = 48
  const initial = {
    opacity: 0,
    filter: 'blur(6px)',
    scale: direction === 'up' || direction === 'down' ? 0.95 : 1,
    y: direction === 'up' ? dist : direction === 'down' ? -dist : 0,
    x: direction === 'left' ? dist : direction === 'right' ? -dist : 0,
  }
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
