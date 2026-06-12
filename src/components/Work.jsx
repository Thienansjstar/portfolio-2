import React, { useMemo, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import Section from './Section'
import { projects } from '../data/content'

/* ---------- Cursor spotlight + gentle 3D tilt ---------- */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 20 })
  const sry = useSpring(ry, { stiffness: 180, damping: 20 })
  const rotateX = useTransform(srx, v => `${v}deg`)
  const rotateY = useTransform(sry, v => `${v}deg`)

  function onMove(e) {
    if (!ref.current || reduced) return
    const rect = ref.current.getBoundingClientRect()
    ry.set(((e.clientX - rect.left) / rect.width  - 0.5) * 8)
    rx.set((0.5 - (e.clientY - rect.top)  / rect.height) * 8)
  }

  function onLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? {} : { rotateX, rotateY, transformPerspective: 900 }}
      data-cursor="card"
      className={`spotlight-card ${className}`}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Abstract "hash stream" backdrop (the crypto hover effect) ---------- */
function HashStream({ rows = 6, seed = 0x5eed, className = '' }) {
  const reduced = useReducedMotion()
  const lines = useMemo(() => {
    const chars = '0123456789abcdef'
    let s = seed
    const rand = () => {
      s = (s * 16807) % 2147483647
      return s / 2147483647
    }
    return Array.from({ length: rows }, () =>
      Array.from({ length: 64 }, () => chars[Math.floor(rand() * 16)]).join('')
    )
  }, [rows, seed])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden opacity-[0.07] ${className}`}
    >
      {lines.map((row, i) => (
        <motion.p
          key={i}
          className="whitespace-nowrap font-mono text-sm leading-7"
          animate={reduced ? {} : { x: i % 2 === 0 ? ['0%', '-12%'] : ['-12%', '0%'] }}
          transition={{ repeat: Infinity, repeatType: 'mirror', duration: 24 + i * 5, ease: 'linear' }}
        >
          {row} {row}
        </motion.p>
      ))}
    </div>
  )
}

/* ---------- IDE-style title bar ---------- */
function IdeBar({ file }) {
  return (
    <div className="relative -mx-7 -mt-7 mb-6 flex items-center gap-2 rounded-t-3xl border-b border-line bg-bg/50 px-5 py-3 sm:-mx-10 sm:-mt-10 sm:px-7">
      <span aria-hidden="true" className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      </span>
      <span className="ml-2 font-mono text-xs text-muted">{file}</span>
    </div>
  )
}

/* Same bar, sized for the standard (smaller-padding) cards */
function IdeBarSm({ file }) {
  return (
    <div className="relative -mx-7 -mt-7 mb-5 flex items-center gap-2 rounded-t-3xl border-b border-line bg-bg/50 px-5 py-2.5">
      <span aria-hidden="true" className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      </span>
      <span className="ml-2 font-mono text-xs text-muted">{file}</span>
    </div>
  )
}

/* ---------- Stack chips ---------- */
function Chips({ items }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {items.map(t => (
        <li key={t} className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
          {t}
        </li>
      ))}
    </ul>
  )
}

/* ---------- Card link helpers ---------- */
function CardLinks({ project }) {
  return (
    <div className="flex items-center gap-3">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink transition-colors hover:border-accent"
        >
          <Github size={14} aria-hidden="true" /> GitHub
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white transition-transform hover:scale-[1.04]"
        >
          Live demo <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  )
}

export default function Work({ onEasterEgg }) {
  const reduced = useReducedMotion()
  const featured = projects.find(p => p.featured)
  const rest = projects.filter(p => !p.featured)
  const eggFired = useRef(false)

  return (
    <Section id="work" eyebrow="selected work" title="Things I've built.">
      {/* Featured: Cryptography Library */}
      {featured && (
        <TiltCard className="relative rounded-3xl border border-line bg-surface p-7 sm:p-10">
          <HashStream rows={7} />
          <div className="relative">
            <IdeBar file={featured.file} />
            <p className="eyebrow">featured · {featured.year}</p>
            <h3 className="mt-3 font-display text-3xl sm:text-4xl">{featured.title}</h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {featured.description}
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {featured.points.map((pt, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
              <Chips items={featured.stack} />
              <CardLinks project={featured} />
            </div>
          </div>
        </TiltCard>
      )}

      {/* Remaining projects — every card gets its own hash stream */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {rest.map((project, i) => (
          <motion.div
            key={project.title}
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 16, delay: (i % 2) * 0.08 }}
            onViewportEnter={project.title === 'JumpMan' ? () => {
              if (!eggFired.current && onEasterEgg) {
                eggFired.current = true
                onEasterEgg()
              }
            } : undefined}
            className="h-full"
          >
            <TiltCard className="relative flex h-full flex-col rounded-3xl border border-line bg-surface p-7">
              <HashStream rows={5} seed={0x5eed + (i + 1) * 7919} />
              <div className="relative flex h-full flex-col">
                <IdeBarSm file={project.file} />
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-medium text-ink">{project.title}</h3>
                  <p className="font-mono text-xs text-muted">{project.year}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
                <ul className="mt-4 space-y-2">
                  {project.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                  <Chips items={project.stack} />
                  <CardLinks project={project} />
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
