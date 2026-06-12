import React, { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function CodeStrips() {
  const reduced = useReducedMotion()

  const lines = useMemo(() => {
    const chars = '0123456789abcdef'
    let s = 0xc0de
    const rand = () => { s = (s * 16807) % 2147483647; return s / 2147483647 }
    return Array.from({ length: 32 }, () =>
      Array.from({ length: 160 }, () => chars[Math.floor(rand() * 16)]).join('')
    )
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 select-none overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, black 0%, transparent 18%, transparent 82%, black 100%)',
        WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 18%, transparent 82%, black 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-[0.10]">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className="whitespace-nowrap font-mono text-[11px] leading-7 text-accent"
            animate={reduced ? {} : { x: i % 2 === 0 ? ['0%', '-3%'] : ['-3%', '0%'] }}
            transition={{ repeat: Infinity, repeatType: 'mirror', duration: 32 + i * 4, ease: 'linear' }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  )
}
