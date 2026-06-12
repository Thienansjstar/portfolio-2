import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Section from './Section'
import { experience } from '../data/content'

export default function Experience() {
  const reduced = useReducedMotion()

  return (
    <Section id="experience" eyebrow="experience" title="Where I've worked.">
      <ol className="relative space-y-10 border-l border-line pl-8 sm:space-y-12">
        {experience.map((job, i) => (
          <motion.li
            key={job.company}
            initial={reduced ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 80, damping: 16, delay: i * 0.08 }}
            className="relative"
          >
            {/* Timeline node */}
            <span
              aria-hidden="true"
              className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-accent"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-medium text-ink">
                {job.role} <span className="text-muted">·</span>{' '}
                <span className="text-accent">{job.company}</span>
              </h3>
              <p className="font-mono text-xs text-muted">{job.period}</p>
            </div>

            <ul className="mt-4 space-y-2.5">
              {job.points.map((point, j) => (
                <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base">
                  <span aria-hidden="true" className="mt-[0.65em] h-px w-4 shrink-0 bg-accent/60" />
                  {point}
                </li>
              ))}
            </ul>

            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
              {job.stack.map(tech => (
                <li
                  key={tech}
                  className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
