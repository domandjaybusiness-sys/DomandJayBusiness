import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)

  const springX = useSpring(x, { stiffness: 90, damping: 18, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 90, damping: 18, mass: 0.6 })

  useEffect(() => {
    // only run on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9998]"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* outer soft halo */}
      <div
        className="w-[380px] h-[380px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(232,65,24,0.07) 0%, rgba(240,147,43,0.04) 45%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />
      {/* inner warm core */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,160,30,0.10) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />
    </motion.div>
  )
}
