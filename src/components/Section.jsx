import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Shared section shell: mono eyebrow + serif title + springy reveal.
 */
export default function Section({ id, eyebrow, title, children, className = '' }) {
  const reduced = useReducedMotion()

  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 70, damping: 16 }}
      >
        <p className="eyebrow mb-3">
          <span aria-hidden="true" className="text-muted">{'// '}</span>
          {eyebrow}
        </p>
        <h2 className="font-display text-4xl sm:text-5xl text-balance">{title}</h2>
        <div className="mt-10 sm:mt-14">{children}</div>
      </motion.div>
    </section>
  )
}
