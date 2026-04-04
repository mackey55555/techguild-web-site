import Link from 'next/link'
import { Twitter, Instagram, ExternalLink } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Top' },
  { href: '/about', label: 'About' },
  { href: '/activities', label: 'Activities' },
  { href: '/companies', label: 'For Companies' },
  { href: '/students', label: 'For Students' },
]

export function Footer() {
  return (
    <footer
      className="relative pt-24 pb-12 px-6 md:px-10 clip-diagonal-top"
      style={{ backgroundColor: 'var(--forest)', color: 'var(--cream)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Tagline */}
        <p
          className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-balance"
          style={{ color: 'var(--gold)' }}
        >
          学生と企業が、<br />地域のITを一緒に育てる。
        </p>

        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Logo + tagline */}
          <div>
            <p className="font-serif font-black text-2xl mb-3" style={{ color: 'var(--cream)' }}>
              Tech Guild
            </p>
            <p className="text-sm leading-relaxed max-w-xs opacity-70" style={{ color: 'var(--cream)' }}>
              ハッカソンと月次座談会を通じて、<br />学生と企業が共に成長するコミュニティ。
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--cream)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* SNS */}
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest opacity-50" style={{ color: 'var(--cream)' }}>
              Follow us
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="Twitter"
                className="opacity-70 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--cream)' }}
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="opacity-70 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--cream)' }}
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Discord"
                className="opacity-70 hover:opacity-100 transition-opacity"
                style={{ color: 'var(--cream)' }}
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>

        <div
          className="border-t pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
          style={{ borderColor: 'rgba(250,246,238,0.15)' }}
        >
          <p className="text-xs opacity-40" style={{ color: 'var(--cream)' }}>
            © 2024 Tech Guild. All rights reserved.
          </p>
          <p className="text-xs opacity-40" style={{ color: 'var(--cream)' }}>
            Organizer: gilda (Naoyuki)
          </p>
        </div>
      </div>
    </footer>
  )
}
