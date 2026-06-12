import React, { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Copy, Check, Mail, Github, Linkedin } from 'lucide-react'
import Magnetic from './Magnetic'
import Section from './Section'
import { profile } from '../data/content'

function BottomCodeStrips() {
  const reduced = useReducedMotion()
  const lines = useMemo(() => {
    const chars = '0123456789abcdef'
    let s = 0xa3ff
    const rand = () => { s = (s * 16807) % 2147483647; return s / 2147483647 }
    return Array.from({ length: 22 }, () =>
      Array.from({ length: 150 }, () => chars[Math.floor(rand() * 16)]).join('')
    )
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 select-none overflow-hidden"
      style={{
        left: 'calc(50% - 50vw)',
        width: '100vw',
        maskImage: 'linear-gradient(to left, black 0%, transparent 65%), linear-gradient(to top, black 0%, transparent 85%)',
        maskComposite: 'intersect',
        WebkitMaskImage: 'linear-gradient(to left, black 0%, transparent 65%), linear-gradient(to top, black 0%, transparent 85%)',
        WebkitMaskComposite: 'source-in',
      }}
    >
      <div className="absolute inset-0 opacity-[0.32]">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className="whitespace-nowrap font-mono text-[13px] leading-7 text-accent"
            animate={reduced ? {} : { x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 18 + i * 1.5, ease: 'linear' }}
          >
            {line}{line}
          </motion.p>
        ))}
      </div>
    </div>
  )
}

export default function Contact() {
  const reduced = useReducedMotion()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      // Clipboard unavailable (e.g. http) — fall back to mail client
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <Section id="contact" eyebrow="contact" title="Let's build something." className="relative">
      <BottomCodeStrips />
      <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        I'm graduating from UW in 2026 and looking for software engineering roles — especially
        anything touching security. My inbox is always open, whether it's an opportunity, a
        question, or just to say hi.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <Magnetic>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            <Mail size={16} aria-hidden="true" /> Say hello
          </a>
        </Magnetic>

        {/* Copy-to-clipboard email with morphing feedback */}
        <button
          type="button"
          onClick={copyEmail}
          aria-live="polite"
          className={`group inline-flex items-center gap-2.5 rounded-full border px-5 py-3 font-mono text-sm transition-colors ${
            copied ? 'border-accent text-accent' : 'border-line text-muted hover:border-accent hover:text-ink'
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={reduced ? false : { scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-2.5"
              >
                <Check size={15} aria-hidden="true" /> Copied
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={reduced ? false : { scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-2.5"
              >
                <Copy size={15} aria-hidden="true" /> {profile.email}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div className="mt-8 flex items-center gap-1">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
          className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:text-accent"
        >
          <Github size={20} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
          className="grid h-11 w-11 place-items-center rounded-full text-muted transition-colors hover:text-accent"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </Section>
  )
}
