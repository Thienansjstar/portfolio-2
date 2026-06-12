import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data/content'

export default function Nav({ theme, onToggleTheme }) {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()

  // Scroll-spy: highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on Escape
  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-line' : ''
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#main"
          className="font-mono text-sm text-ink hover:text-accent transition-colors"
          onClick={() => setOpen(false)}
        >
          <span className="text-accent">{'</>'}</span> tt<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? 'true' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-surface border border-line"
                    transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            download
            className="hidden rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-ink md:inline-block"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-ink"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-ink md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-b border-line bg-bg/95 backdrop-blur-md md:hidden"
          >
            <ul className="space-y-1 px-5 pb-5 pt-2">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-4 py-3 text-base ${
                      active === id ? 'bg-surface text-ink' : 'text-muted'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resume}
                  download
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base text-accent"
                >
                  Download resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
