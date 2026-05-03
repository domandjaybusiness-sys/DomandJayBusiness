import ScrollReveal from './ScrollReveal'

export default function SectionHeading({ tag, title, subtitle, center = false, light = false }) {
  return (
    <div className={`mb-14 ${center ? 'text-center' : ''}`}>
      {tag && (
        <ScrollReveal delay={0}>
          <span className="section-tag">{tag}</span>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.08}>
        <h2 className={`font-display font-black uppercase leading-[0.95] tracking-tight mb-4
          text-[clamp(2.4rem,5vw,4rem)] ${light ? 'text-white/90' : 'text-white'}`}>
          {title}
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={0.14}>
          <p className={`text-base leading-relaxed max-w-xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/60' : 'text-muted'}`}>
            {subtitle}
          </p>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.18}>
        <div className="mt-5 h-px w-16 rounded-full"
          style={{ background: 'linear-gradient(90deg,#e84118,#f0932b)' }}
        />
      </ScrollReveal>
    </div>
  )
}
