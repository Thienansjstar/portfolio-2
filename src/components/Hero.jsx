import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, ChevronDown, FileDown } from 'lucide-react'
import Magnetic from './Magnetic'
import CodingGuy from './CodingGuy'
import { profile } from '../data/content'

function HeroCodeStrips() {
  const reduced = useReducedMotion()
  const lines = useMemo(() => {
    const chars = '0123456789abcdef'
    let s = 0xd1a6
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
        maskImage: 'linear-gradient(to right, black 0%, transparent 65%), linear-gradient(to bottom, black 0%, transparent 85%)',
        maskComposite: 'intersect',
        WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 65%), linear-gradient(to bottom, black 0%, transparent 85%)',
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

const letterParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } },
}
const letter = {
  hidden: { opacity: 0, y: 28, rotate: 3 },
  show: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 140, damping: 14 } },
}

// Glitch character pool — binary, hex, error symbols, block chars
const GLITCH = '01010110100111001█░▓!@#ERR><|\\01XE01?!10'

export default function Hero({ onSecretTrigger }) {
  const reduced = useReducedMotion()
  const [clicks, setClicks] = useState(0)
  const [ghost, setGhost]   = useState(null) // null = show real name
  const rafRef = useRef(null)

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  const name = profile.name

  function handleNameClick() {
    // Easter egg counter
    const next = clicks + 1
    setClicks(next)
    if (next >= 5) { setClicks(0); onSecretTrigger() }

    // Glitch animation
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const orig = name.split('')
    const dur  = reduced ? 0 : 700
    const t0   = performance.now()
    let lastTick = 0

    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1)

      if (p >= 1) { setGhost(null); return }

      // Throttle to ~50 ms per frame for that choppy terminal feel
      if (now - lastTick > 48) {
        lastTick = now
        const corr = Math.pow(1 - p, 0.5) // corruption intensity decays
        setGhost(orig.map(ch => {
          if (ch === ' ') return { ch, color: null }
          const corrupt = Math.random() < corr
          return {
            ch:    corrupt ? GLITCH[Math.floor(Math.random() * GLITCH.length)] : ch,
            color: corrupt ? (Math.random() < 0.55 ? '#f87171' : '#4ade80') : null,
          }
        }))
      }

      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }

  const display = ghost ?? name.split('').map(ch => ({ ch, color: null }))

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-center pt-24 pb-16">
      <HeroCodeStrips />

      <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        {/* Left: name + copy + CTAs */}
        <div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="eyebrow mb-5"
          >
            <span aria-hidden="true" className="text-muted">{'// '}</span>
            {profile.role} · {profile.education.school}
          </motion.p>

          {/* Name — staggered letter reveal + italic-flip on hover. Click 5× for a surprise. */}
          <motion.h1
            variants={letterParent}
            initial={reduced ? false : 'hidden'}
            animate="show"
            onClick={handleNameClick}
            title="…something happens if you keep clicking"
            className="flip-name cursor-pointer select-none font-display text-[clamp(2.8rem,8vw,5.8rem)] leading-[1.02] text-balance"
          >
            {display.map(({ ch, color }, i) =>
              ch === ' ' ? (
                <span key={i}> </span>
              ) : (
                <motion.span
                  key={i}
                  variants={letter}
                  className="ch"
                  style={color ? { color } : undefined}
                >
                  {ch}
                </motion.span>
              )
            )}
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/25 transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Get in touch
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent"
              >
                <FileDown size={16} aria-hidden="true" /> Resume
              </a>
            </Magnetic>

            <div className="flex items-center gap-1">
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
          </motion.div>

          {/* Availability + location strip */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted"
          >
            <span className="inline-flex items-center gap-2.5">
              <span className="pulse-dot relative inline-block h-2 w-2 rounded-full bg-accent" />
              {profile.availability}
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-line sm:block" />
            <span>{profile.location}</span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-line sm:block" />
            <span>{profile.education.years.replace('—', '→')}</span>
          </motion.div>
        </div>

        {/* Right: animated coder */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 70, damping: 14 }}
          className="mx-auto w-full max-w-[300px] lg:max-w-[380px]"
        >
          <CodingGuy className="h-auto w-full" />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:flex flex-col items-center gap-1 group"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted transition-colors group-hover:text-accent">
          scroll
        </span>
        <div className="flex flex-col items-center -space-y-2.5">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block text-accent"
              animate={reduced ? {} : {
                opacity: [0.15, 1, 0.15],
                y: [0, 6, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            >
              <ChevronDown size={22} strokeWidth={1.75} />
            </motion.span>
          ))}
        </div>
      </motion.a>
    </section>
  )
}
