import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ value, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState('0')

  // parse numeric part from e.g. "200+", "8+", "5K", "10+"
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ''))
  const isK = value.includes('K')
  const suffix2 = value.replace(/[0-9.K]/g, '') // "+", "" etc

  useEffect(() => {
    if (!inView) return
    let start = null
    const target = isK ? numeric * 1000 : numeric

    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      const current = Math.floor(eased * target)

      if (isK) {
        setDisplay((current / 1000).toFixed(current >= 1000 ? 0 : 1) + 'K')
      } else {
        setDisplay(String(current))
      }

      if (p < 1) requestAnimationFrame(step)
      else setDisplay(value.replace(/[^0-9K.]/g, '') + suffix2) // snap to final
    }

    requestAnimationFrame(step)
  }, [inView])

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  )
}
