import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { personal } from '@data/content'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(37,34,32,0.8)' : '1px solid transparent',
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo / Name */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); handleNavClick('#hero') }}
          className="font-display text-xl text-text-primary tracking-widest hover:text-accent transition-colors duration-200"
          aria-label="Abhisheka C Hegde — go to top"
        >
          ACH<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                className="font-mono text-xs text-text-muted hover:text-text-primary tracking-widest uppercase transition-colors duration-200 underline-draw"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={personal.resumeUrl}
              download
              className="font-mono text-xs px-4 py-2 border border-border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-200 tracking-widest uppercase"
            >
              Resume ↓
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 text-text-primary"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-bg-surface border-b border-border px-6 py-6"
        >
          <ul className="flex flex-col gap-5" role="list">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={e => { e.preventDefault(); handleNavClick(link.href) }}
                  className="font-mono text-sm text-text-secondary hover:text-accent transition-colors uppercase tracking-widest"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={personal.resumeUrl}
                download
                className="inline-block font-mono text-sm px-4 py-2 border border-border-accent text-accent hover:bg-accent hover:text-bg transition-all uppercase tracking-widest"
              >
                Resume ↓
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  )
}
