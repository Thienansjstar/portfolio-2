import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Section from './Section'
import { skills } from '../data/content'

export default function Skills() {
  const reduced = useReducedMotion()
  const [activeTab, setActiveTab] = useState(0)
  const group = skills[activeTab]

  return (
    <Section id="skills" eyebrow="skills" title="What I work with.">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 80, damping: 16 }}
        className="overflow-hidden rounded-xl border border-line bg-surface"
      >
        {/* Title bar + tabs */}
        <div className="flex items-center border-b border-line">
          <div className="flex shrink-0 items-center gap-1.5 border-r border-line px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          {skills.map((s, i) => (
            <button
              key={s.file}
              onClick={() => setActiveTab(i)}
              className={`relative border-r border-line px-4 py-3 font-mono text-xs transition-colors ${
                activeTab === i
                  ? 'bg-bg text-ink after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {s.file}
            </button>
          ))}
        </div>

        {/* Code content */}
        <div className="p-6">
          <p className="mb-1 font-mono text-xs text-muted">
            <span className="text-accent">// </span>{group.group}
          </p>
          <p className="mb-5 font-mono text-xs text-muted">
            <span className="text-violet-400">const </span>
            <span className="text-sky-400">{group.file.split('.')[0]}</span>
            <span className="text-muted"> = [</span>
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-2 gap-x-8 gap-y-2 pl-4 sm:grid-cols-3"
            >
              {group.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={reduced ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  className="flex items-center gap-2 font-mono text-sm"
                >
                  <span className="text-emerald-400 select-none">"</span>
                  <span className="text-ink">{item}</span>
                  <span className="text-muted select-none">{i < group.items.length - 1 ? ',' : ''}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="mt-4 font-mono text-xs text-muted">]</p>
        </div>
      </motion.div>
    </Section>
  )
}
