import { useEffect, useRef } from 'react'

export default function EmberCanvas({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    let W = 0, H = 0, t = 0, raf = null
    const sparks = []

    // ── 6 orbs, varied sizes, positions, pulse speeds
    const orbs = [
      { cx:.82, cy:.90, r:.32, hue:12,  spd:.00018, phase:0.0, amp:.07, a:.44 },
      { cx:.12, cy:.93, r:.25, hue:22,  spd:.00024, phase:1.8, amp:.05, a:.32 },
      { cx:.50, cy:.76, r:.20, hue:8,   spd:.00013, phase:3.2, amp:.04, a:.20 },
      { cx:.68, cy:.58, r:.15, hue:32,  spd:.00032, phase:0.9, amp:.09, a:.16 },
      { cx:.28, cy:.72, r:.13, hue:38,  spd:.00021, phase:2.4, amp:.06, a:.13 },
      { cx:.60, cy:.96, r:.19, hue:6,   spd:.00016, phase:4.2, amp:.05, a:.26 },
    ]

    // ── 3 spark types: tiny, ember, glow
    const mkSpark = (stagger, forceType = null) => {
      const roll = Math.random()
      const type = forceType ?? (roll < .35 ? 'tiny' : roll < .88 ? 'ember' : 'glow')

      const base = {
        type,
        x: Math.random(),
        y: stagger ? Math.random() : 1.02,
        life: stagger ? Math.random() : 0,
        sway: Math.random() * Math.PI * 2,
        swayAmp: .00015 + Math.random() * .0004,
        swayFreq: .008 + Math.random() * .018,
      }

      if (type === 'tiny') return {
        ...base,
        vx: (Math.random() - .5) * .0007,
        vy: -(0.0003 + Math.random() * .0007),
        size: .3 + Math.random() * .9,
        maxL: .2 + Math.random() * .3,
        hue: 28 + Math.random() * 35,   // orange → yellow → cream
        bright: 72 + Math.random() * 22,
        alpha: .55 + Math.random() * .4,
      }

      if (type === 'glow') return {
        ...base,
        vx: (Math.random() - .5) * .00015,
        vy: -(0.00006 + Math.random() * .00013),
        size: 5 + Math.random() * 6,
        maxL: .65 + Math.random() * .35,
        hue: 6 + Math.random() * 18,    // deep red → orange
        bright: 40 + Math.random() * 20,
        alpha: .18 + Math.random() * .18,
        throb: .015 + Math.random() * .025,
        throbPhase: Math.random() * Math.PI * 2,
      }

      // ember (default)
      return {
        ...base,
        vx: (Math.random() - .5) * .0004,
        vy: -(0.00015 + Math.random() * .00038),
        size: 1.2 + Math.random() * 3.2,
        maxL: .45 + Math.random() * .55,
        hue: 5 + Math.random() * 50,    // red → deep yellow
        bright: 48 + Math.random() * 36,
        alpha: .45 + Math.random() * .3,
      }
    }

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    // seed 100 sparks
    for (let i = 0; i < 100; i++) sparks.push(mkSpark(true))

    const loop = () => {
      t++
      ctx.clearRect(0, 0, W, H)

      // ── Draw orbs
      orbs.forEach(o => {
        const cx = (o.cx + Math.sin(t * o.spd + o.phase) * o.amp) * W
        const cy = (o.cy + Math.cos(t * o.spd * .7 + o.phase) * (o.amp * .5)) * H
        const pulse = 1 + Math.sin(t * o.spd * 3 + o.phase) * .15
        const r = o.r * Math.min(W, H) * pulse
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        g.addColorStop(0,   `hsla(${o.hue},92%,52%,${o.a})`)
        g.addColorStop(.35, `hsla(${o.hue + 6},88%,44%,${o.a * .55})`)
        g.addColorStop(1,   `hsla(${o.hue},80%,30%,0)`)
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
      })

      // spawn up to 130 sparks, varied spawn rate
      if (Math.random() < .62 && sparks.length < 130) sparks.push(mkSpark(false))

      // ── Draw sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.life += Math.abs(s.vy)
        s.x += s.vx + Math.sin(t * s.swayFreq + s.sway) * s.swayAmp
        s.y += s.vy

        const prog  = Math.min(s.life / s.maxL, 1)
        const fade  = prog < .12 ? prog / .12 : 1 - Math.pow((prog - .12) / .88, 1.7)
        const px = s.x * W
        const py = s.y * H

        if (s.type === 'tiny') {
          // crisp dot, no radial gradient overhead
          const a = fade * s.alpha
          ctx.beginPath()
          ctx.arc(px, py, s.size, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${s.hue},100%,${s.bright}%,${a})`
          ctx.fill()
        } else if (s.type === 'glow') {
          const throb = 1 + Math.sin(t * s.throb + s.throbPhase) * .22
          const r = s.size * throb * 2.8
          const a = fade * s.alpha
          const sg = ctx.createRadialGradient(px, py, 0, px, py, r)
          sg.addColorStop(0,   `hsla(${s.hue},88%,${s.bright + 10}%,${a * 1.6})`)
          sg.addColorStop(.4,  `hsla(${s.hue + 6},82%,${s.bright}%,${a * .7})`)
          sg.addColorStop(1,   `hsla(${s.hue},80%,35%,0)`)
          ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2)
          ctx.fillStyle = sg; ctx.fill()
        } else {
          // ember — soft glow + bright core
          const li = s.bright + prog * 28
          const a  = fade * s.alpha
          const r  = s.size * 2.9
          const sg = ctx.createRadialGradient(px, py, 0, px, py, r)
          sg.addColorStop(0,   `hsla(${s.hue},95%,${li}%,${a})`)
          sg.addColorStop(.45, `hsla(${s.hue + 8},90%,${li - 6}%,${a * .42})`)
          sg.addColorStop(1,   `hsla(${s.hue},88%,${li}%,0)`)
          ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2)
          ctx.fillStyle = sg; ctx.fill()
          // hot white-ish core
          ctx.beginPath(); ctx.arc(px, py, s.size * (1 - prog * .45), 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${s.hue + 18},100%,${Math.min(92, li + 18)}%,${a * 1.35})`
          ctx.fill()
        }

        if (prog >= 1 || s.y < -.06) sparks[i] = mkSpark(false)
      }

      raf = requestAnimationFrame(loop)
    }

    resize(); loop()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    return () => { if (raf) cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
