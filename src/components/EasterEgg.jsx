import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * Easter egg: click the hero name 5× and a tiny pixel "JumpMan"
 * (a nod to Thien-An's first Unity game) sprints across the bottom
 * of the screen, hopping as it goes.
 */
export default function EasterEgg({ trigger }) {
  const reduced = useReducedMotion()
  const [running, setRunning] = useState(false)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    if (trigger === 0) return
    setRunning(true)
    setToast(true)
    const runT = setTimeout(() => setRunning(false), 4200)
    const toastT = setTimeout(() => setToast(false), 3600)
    return () => {
      clearTimeout(runT)
      clearTimeout(toastT)
    }
  }, [trigger])

  if (reduced) {
    // Reduced motion: show only the toast, skip the runner
    return (
      <AnimatePresence>
        {toast && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="status"
            className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full border border-line bg-surface px-5 py-2.5 font-mono text-xs text-ink shadow-xl"
          >
            You found JumpMan — my first game, still running. 🕹
          </motion.p>
        )}
      </AnimatePresence>
    )
  }

  return (
    <>
      <AnimatePresence>
        {running && (
          <motion.div
            aria-hidden="true"
            initial={{ x: '-10vw' }}
            animate={{ x: '110vw' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: 'linear' }}
            className="pointer-events-none fixed bottom-4 left-0 z-[70]"
          >
            <motion.div
              animate={{ y: [0, -34, 0, 0, -34, 0, 0] }}
              transition={{ duration: 4, times: [0, 0.12, 0.24, 0.5, 0.62, 0.74, 1], ease: 'easeOut' }}
            >
              <div className="jumpman" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            role="status"
            className="fixed bottom-16 left-1/2 z-[70] -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2.5 font-mono text-xs text-ink shadow-xl"
          >
            You found JumpMan — my first game, still running. 🕹
          </motion.p>
        )}
      </AnimatePresence>
    </>
  )
}
