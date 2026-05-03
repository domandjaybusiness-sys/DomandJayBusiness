import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const base = 'inline-flex items-center justify-center gap-2 font-sans font-bold text-sm tracking-[0.08em] uppercase rounded-lg transition-all duration-200 cursor-pointer select-none'

const variants = {
  fire:    'text-white shadow-fire-sm hover:shadow-fire-md hover:-translate-y-0.5',
  outline: 'text-white border hover:bg-white/5 hover:-translate-y-0.5',
  ghost:   'text-ember hover:text-white hover:bg-white/5',
}

const sizes = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-6 py-3',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children, variant = 'fire', size = 'md', to, href, onClick,
  className = '', disabled = false, type = 'button',
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`
  const style = variant === 'fire'
    ? { background: 'linear-gradient(135deg,#c0300e 0%,#e84118 45%,#f07020 100%)' }
    : variant === 'outline'
    ? { borderColor: 'rgba(232,65,24,0.45)' }
    : {}

  const inner = (
    <motion.span
      className={cls}
      style={style}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {children}
    </motion.span>
  )

  if (to)   return <Link to={to} className="inline-block">{inner}</Link>
  if (href) return <a href={href} className="inline-block" target="_blank" rel="noopener noreferrer">{inner}</a>
  return <button type={type} onClick={onClick} disabled={disabled} className="inline-block">{inner}</button>
}
