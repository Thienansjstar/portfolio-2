import React, { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Code2, ShieldCheck, Layers,
  Lock, Shield, Key, Target,
  Database, Cloud, GitBranch, Server, Zap,
  Brain, Gamepad2, Globe, Cpu, Terminal,
} from 'lucide-react'
import Section from './Section'
import { skills } from '../data/content'

const CATEGORY_ICONS = {
  'Languages':               Code2,
  'Security & Cryptography': ShieldCheck,
  'Frameworks & Tools':      Layers,
}

const SKILL_ICONS = {
  // Languages
  'Java':           Terminal,
  'Python':         Terminal,
  'JavaScript':     Terminal,
  'C#':             Terminal,
  'C++':            Cpu,
  'C':              Cpu,
  'SQL':            Database,
  'Erlang':         Terminal,
  'Assembly':       Cpu,
  'HTML':           Globe,
  'CSS':            Globe,
  // Security
  'SHA-3 / SHAKE':       Lock,
  'NIST FIPS 202':       Shield,
  'Argon2':              Key,
  'ECIES':               Lock,
  'Schnorr Signatures':  Key,
  'Secure Coding':       ShieldCheck,
  'Red Teaming':         Target,
  // Frameworks & Tools
  'React':           Layers,
  'Node.js':         Server,
  'Firebase':        Zap,
  'Microsoft Azure': Cloud,
  'PyTorch':         Brain,
  'OpenCV':          Brain,
  'NumPy':           Brain,
  'Git':             GitBranch,
  'Socket.IO':       Zap,
  'Phaser':          Gamepad2,
  'Unity':           Gamepad2,
  'Bootstrap':       Globe,
  'Heroku':          Cloud,
}

export default function Skills() {
  const reduced = useReducedMotion()
  const [activeTab, setActiveTab] = useState(0)
  const group = skills[activeTab]

  return (
    <Section id="skills" eyebrow="skills" title="What I work with.">
      {/* Category tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {skills.map((s, i) => {
          const Icon = CATEGORY_ICONS[s.group] ?? Code2
          return (
            <button
              key={s.group}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeTab === i
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'border border-line bg-surface text-muted hover:border-accent/50 hover:text-ink'
              }`}
            >
              <Icon size={14} />
              {s.group}
            </button>
          )
        })}
      </div>

      {/* Skills grid */}
      <div className="rounded-2xl border border-line bg-surface p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {group.items.map((item, i) => {
              const Icon = SKILL_ICONS[item] ?? Code2
              return (
                <motion.div
                  key={item}
                  initial={reduced ? false : { opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.18 }}
                  className="flex items-center gap-3 rounded-xl border border-line bg-bg px-4 py-3"
                >
                  <Icon size={15} className="shrink-0 text-accent" />
                  <span className="text-sm text-ink">{item}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
