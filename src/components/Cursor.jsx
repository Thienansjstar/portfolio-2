import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const toHex = n => (n & 0xff).toString(16).padStart(2, '0').toUpperCase()

const SIZES  = { default: 30, link: 44, btn: 44, card: 58, name: 44 }
const LABELS = { link: '>_', btn: 'EXEC', card: 'SCAN', name: '???' }

function classify(el) {
  if (!el) return 'default'
  if (el.closest('.flip-name'))            return 'name'
  if (el.closest('[data-cursor="card"]'))  return 'card'
  if (el.closest('button,[role="button"]')) return 'btn'
  if (el.closest('a'))                     return 'link'
  return 'default'
}

export default function Cursor() {
  const [state, setState]   = useState('default')
  const [coords, setCoords] = useState('0000')
  const [visible, setVisible] = useState(false)
  const shownRef = useRef(false)

  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const rx = useSpring(mx, { stiffness: 180, damping: 20 })
  const ry = useSpring(my, { stiffness: 180, damping: 20 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    document.body.style.cursor = 'none'

    const onMove = e => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setCoords(`${toHex(e.clientX)}${toHex(e.clientY)}`)
      if (!shownRef.current) { shownRef.current = true; setVisible(true) }
      setState(classify(document.elementFromPoint(e.clientX, e.clientY)))
    }
    const onLeave  = () => setVisible(false)
    const onEnter  = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  const size  = SIZES[state]
  const label = state === 'default' ? coords : LABELS[state]

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Dot — snaps to cursor instantly */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-accent"
            style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          />

          {/* Ring — springs behind with context-aware label */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-accent"
            style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
            animate={{
              width: size,
              height: size,
              opacity: state === 'default' ? 0.4 : 0.85,
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            initial={{ width: size, height: size, opacity: 0, scale: 0.6 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={state}
                className="select-none font-mono text-accent"
                style={{ fontSize: state === 'default' ? 5.5 : 7.5 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.08 }}
              >
                {label}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
