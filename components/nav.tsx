'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Top' },
  { href: '/about', label: 'About' },
  { href: '/activities', label: 'Activities' },
  { href: '/companies', label: 'For Companies' },
  { href: '/students', label: 'For Students' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: 'var(--cream)',
        borderBottom: scrolled ? '1.5px solid var(--forest)' : '1.5px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-serif font-black text-xl tracking-tight" style={{ color: 'var(--forest)' }}>
          Tech Guild
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide transition-colors duration-200"
              style={{
                color: pathname === link.href ? 'var(--terra)' : 'var(--forest)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/companies#contact"
            className="btn-fill-left text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200"
            style={{
              backgroundColor: 'var(--forest)',
              color: 'var(--cream)',
              border: '1.5px solid var(--forest)',
            }}
          >
            <span className="relative z-10" style={{ color: 'var(--cream)' }}>お問い合わせ</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          style={{ color: 'var(--forest)' }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ backgroundColor: 'var(--cream)', borderTop: '1px solid var(--border)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-semibold py-2"
              style={{ color: pathname === link.href ? 'var(--terra)' : 'var(--forest)' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/companies#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-block text-sm font-semibold px-5 py-2 rounded-full text-center mt-2"
            style={{ backgroundColor: 'var(--forest)', color: 'var(--cream)' }}
          >
            お問い合わせ
          </Link>
        </div>
      )}
    </header>
  )
}
