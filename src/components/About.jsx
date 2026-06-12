import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Section from './Section'
import { profile } from '../data/content'

function CourseMarquee({ courses }) {
  const reduced = useReducedMotion()
  const doubled = [...courses, ...courses]

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-surface to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-surface to-transparent" />
      <motion.div
        className="flex gap-2"
        animate={reduced ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((course, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs text-muted"
          >
            {course}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function About() {
  const reduced = useReducedMotion()

  return (
    <Section id="about" eyebrow="about" title="Security-minded, builder at heart.">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Narrative */}
        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* "Currently" IDE card */}
        <aside className="h-fit overflow-hidden rounded-xl border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <span className="font-mono text-xs text-muted">status.js</span>
            <span className="w-[60px]" />
          </div>
          <div className="p-5 font-mono text-sm leading-7">
            <div>
              <span className="text-violet-400">const </span>
              <span className="text-ink">status</span>
              <span className="text-muted"> = {'{'}</span>
            </div>
            {profile.currently.map(({ label, value }, i) => {
              const key = label.toLowerCase().replace(/\s+(\w)/g, (_, c) => c.toUpperCase())
              return (
                <motion.div
                  key={label}
                  className="pl-5"
                  animate={reduced ? {} : { opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.5 }}
                >
                  <span className="text-sky-400">{key}</span>
                  <span className="text-muted">: </span>
                  <span className="text-emerald-400">"{value}"</span>
                  <span className="text-muted">,</span>
                </motion.div>
              )
            })}
            <div><span className="text-muted">{'}'}</span></div>
          </div>
        </aside>
      </div>

      {/* Education card */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="flex items-center gap-4 border-b border-line px-5 py-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft p-1.5">
            <img src={`${import.meta.env.BASE_URL}uw-logo.png`} alt="University of Washington" className="h-full w-full object-contain" />
          </span>
          <div>
            <p className="font-medium text-ink">{profile.education.school}</p>
            <p className="text-sm text-muted">
              {profile.education.degree} · {profile.education.years}
            </p>
          </div>
        </div>
        <div className="px-5 py-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted">Coursework</p>
          <CourseMarquee courses={profile.education.coursework} />
        </div>
      </div>
    </Section>
  )
}
