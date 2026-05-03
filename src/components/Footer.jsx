const quickLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Packages' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://facebook.com', label: 'Facebook' },
  { href: 'https://linkedin.com', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.8fr_1fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6f8cff_0%,#9db4ff_100%)] text-sm font-bold tracking-[0.18em] text-slate-950">
                DJ
              </span>
              <div>
                <div className="font-display text-xl font-semibold">Domandjaybusiness</div>
                <div className="text-sm text-white/60">Modern digital services for growing businesses</div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-white/68">
              We help individuals, entrepreneurs, and small businesses launch a stronger online presence with clear strategy, polished websites, and dependable support.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Quick Links</h2>
            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map(({ href, label }) => (
                <a key={href} href={href} className="text-sm text-white/80 transition hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Connect</h2>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/80">
              <a href="mailto:hello@domandjaybusiness.com" className="transition hover:text-white">
                hello@domandjaybusiness.com
              </a>
              <div className="flex flex-wrap gap-3 pt-2">
                {socialLinks.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/12 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/72 transition hover:border-white/30 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Domandjaybusiness. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <a href="/" className="transition hover:text-white">Privacy Policy</a>
            <a href="/" className="transition hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
