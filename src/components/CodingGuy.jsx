import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const ACCENT = 'rgb(var(--accent))'
const ACCENT_SOFT = 'rgb(var(--accent) / 0.35)'
const INK = 'rgb(var(--ink))'
const MUTED = 'rgb(var(--muted))'
const SURFACE = 'rgb(var(--surface))'
const LINE = 'rgb(var(--line))'
const SKIN = '#E8C49A'

// Code lines that "type" on the monitor, looping forever.
const codeLines = [
  { w: 64, color: ACCENT, x: 12 },
  { w: 96, color: MUTED, x: 24 },
  { w: 72, color: ACCENT_SOFT, x: 24 },
  { w: 110, color: MUTED, x: 24 },
  { w: 48, color: ACCENT, x: 12 },
  { w: 88, color: ACCENT_SOFT, x: 24 },
]

export default function CodingGuy({ className = '' }) {
  const reduced = useReducedMotion()
  const dur = 0.9

  return (
    <svg
      viewBox="0 0 340 300"
      role="img"
      aria-label="Illustration of a cartoon developer typing at a desk"
      className={className}
    >
      {/* Floor shadow */}
      <ellipse cx="170" cy="282" rx="130" ry="10" fill={LINE} opacity="0.5" />

      {/* ── Monitor ── */}
      <g>
        {/* stand */}
        <rect x="158" y="160" width="14" height="26" rx="3" fill={LINE} />
        <rect x="136" y="184" width="58" height="8" rx="4" fill={LINE} />
        {/* screen */}
        <rect x="78" y="38" width="174" height="126" rx="10" fill={SURFACE} stroke={LINE} strokeWidth="2.5" />
        {/* screen title bar with traffic lights */}
        <rect x="78" y="38" width="174" height="22" rx="10" fill={LINE} opacity="0.55" />
        <circle cx="93" cy="49" r="3.5" fill="#FF5F57" />
        <circle cx="105" cy="49" r="3.5" fill="#FEBC2E" />
        <circle cx="117" cy="49" r="3.5" fill="#28C840" />

        {/* typing code lines */}
        <g transform="translate(88, 72)">
          {codeLines.map((line, i) => (
            <motion.rect
              key={i}
              x={line.x}
              y={i * 15}
              height="6"
              rx="3"
              fill={line.color}
              initial={{ width: 0 }}
              animate={reduced ? { width: line.w } : { width: [0, line.w, line.w, line.w] }}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      duration: dur,
                      delay: i * dur,
                      repeat: Infinity,
                      repeatDelay: codeLines.length * dur - dur,
                      times: [0, 0.6, 0.9, 1],
                    }
              }
            />
          ))}
          {/* blinking cursor */}
          <motion.rect
            x="4"
            y={codeLines.length * 15}
            width="7"
            height="9"
            fill={ACCENT}
            animate={reduced ? {} : { opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </g>
      </g>

      {/* ── Character (bobbing as one group) ── */}
      <motion.g
        animate={reduced ? {} : { y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
      >
        {/* head */}
        <circle cx="285" cy="142" r="24" fill={SKIN} />

        {/* hair - middle part */}
        <path
          d="M 262 145
             Q 260 132 262 123
             Q 265 116 272 112
             Q 278 110 285 116
             Q 292 110 298 112
             Q 305 116 308 123
             Q 310 132 308 145
             Q 306 135 302 129
             Q 297 123 291 120
             Q 288 119 285 119
             Q 282 119 279 120
             Q 273 123 268 129
             Q 264 135 262 145 Z"
          fill={INK}
        />

        {/* eyebrows — straight and thin */}
        <path d="M 269 132 Q 276 129 282 131" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 287 131 Q 293 129 300 132" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* glasses */}
        <g stroke={INK} strokeWidth="2.5" fill="none">
          <circle cx="276" cy="142" r="6.5" />
          <circle cx="293" cy="142" r="6.5" />
          <line x1="282.5" y1="142" x2="286.5" y2="142" />
          {/* temple arms */}
          <line x1="269.5" y1="141" x2="262" y2="141" />
          <line x1="299.5" y1="141" x2="307" y2="141" />
        </g>

        {/* almond-shaped eyes inside glasses */}
        <ellipse cx="276" cy="142" rx="3.5" ry="2.2" fill={INK} opacity="0.75" />
        <ellipse cx="293" cy="142" rx="3.5" ry="2.2" fill={INK} opacity="0.75" />

        {/* smile */}
        <path d="M 278 156 Q 284 160 290 156" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />

        {/* torso */}
        <path d="M 254 230 Q 252 176 285 172 Q 314 176 312 230 Z" fill={INK} />

        {/* arms reaching to keyboard */}
        <motion.path
          d="M 262 192 Q 232 204 216 222"
          stroke={INK}
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
          animate={reduced ? {} : { rotate: [0, 2.5, 0] }}
          transition={{ repeat: Infinity, duration: 0.32 }}
          style={{ originX: '262px', originY: '192px' }}
        />
        <motion.path
          d="M 276 198 Q 252 214 238 228"
          stroke={INK}
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
          animate={reduced ? {} : { rotate: [0, -2.5, 0] }}
          transition={{ repeat: Infinity, duration: 0.32, delay: 0.16 }}
          style={{ originX: '276px', originY: '198px' }}
        />

        {/* hands */}
        <motion.circle
          cx="214" cy="224" r="6" fill={SKIN}
          animate={reduced ? {} : { y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 0.32 }}
        />
        <motion.circle
          cx="237" cy="230" r="6" fill={SKIN}
          animate={reduced ? {} : { y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 0.32, delay: 0.16 }}
        />
      </motion.g>

      {/* ── Desk ── */}
      <rect x="30" y="232" width="280" height="10" rx="5" fill={INK} />
      <rect x="48" y="242" width="10" height="40" rx="4" fill={LINE} />
      <rect x="282" y="242" width="10" height="40" rx="4" fill={LINE} />

      {/* keyboard */}
      <rect x="196" y="222" width="62" height="10" rx="4" fill={LINE} />

      {/* ── Coffee mug + steam ── */}
      <g>
        <rect x="60" y="206" width="26" height="26" rx="4" fill={ACCENT} />
        <path d="M 86 212 q 12 4 0 14" stroke={ACCENT} strokeWidth="4" fill="none" />
        {[0, 1].map(i => (
          <motion.path
            key={i}
            d={`M ${68 + i * 10} 198 q 3 -6 0 -12`}
            stroke={MUTED}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            animate={reduced ? { opacity: 0.5 } : { opacity: [0, 0.7, 0], y: [-0, -6, -10] }}
            transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.8 }}
          />
        ))}
      </g>
    </svg>
  )
}
