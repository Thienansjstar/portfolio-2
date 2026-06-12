import React, { useRef, useState, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, ChevronDown, FileDown } from 'lucide-react'
import Magnetic from './Magnetic'
import CodingGuy from './CodingGuy'
import { profile } from '../data/content'

function DiagonalCode() {
  const reduced = useReducedMotion()
  const lines = useMemo(() => {
    const chars = '0123456789abcdef'
    let s = 0xd1a6
    const rand = () => { s = (s * 16807) % 2147483647; return s / 2147483647 }
    return Array.from({ length: 30 }, () =>
      Array.from({ length: 200 }, () => chars[Math.floor(rand() * 16)]).join('')
    )
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, black 0%, transparent 62%)',
        WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 62%)',
      }}
    >
      <div
        className="absolute opacity-[0.13]"
        style={{ transform: 'rotate(-42deg)', transformOrigin: '0% 100%', left: '-5%', bottom: '-20%', width: '170%' }}
      >
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className="whitespace-nowrap font-mono text-[11px] leading-7 text-accent"
            animate={reduced ? {} : { x: i % 2 === 0 ? ['0%', '-1%'] : ['-1%', '0%'] }}
            transition={{ repeat: Infinity, repeatType: 'mirror', duration: 35 + i * 3, ease: 'linear' }}
          >
            {line}
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

export default function Hero({ onSecretTrigger }) {
  const reduced = useReducedMotion()
  const heroRef = useRef(null)
  const [clicks, setClicks] = useState(0)
  const [glow, setGlow] = useState({ x: 50, y: 50 })

  function handleNameClick() {
    const next = clicks + 1
    setClicks(next)
    if (next >= 5) {
      setClicks(0)
      onSecretTrigger()
    }
  }

  function handleMove(e) {
    if (reduced || !heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const name = profile.name

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMove}
      className="relative flex min-h-[92svh] flex-col justify-center pt-24 pb-16"
    >
      <DiagonalCode />

      {/* Cursor-aware violet glow (desktop only, very faint) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden opacity-60 lg:block"
        style={{
          background: `radial-gradient(640px circle at ${glow.x}% ${glow.y}%, rgb(var(--accent) / 0.07), transparent 70%)`,
        }}
      />

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
            {name.split('').map((ch, i) =>
              ch === ' ' ? (
                <span key={i}> </span>
              ) : (
                <motion.span key={i} variants={letter} className="ch">
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
