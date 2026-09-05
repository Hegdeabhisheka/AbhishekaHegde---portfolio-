import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '@hooks/useReducedMotion'

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
  style?: CSSProperties
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 1.8,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
  style,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(from)
  const reduced = useReducedMotion()
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    if (reduced) { setValue(to); return }
    started.current = true

    const startTime = performance.now()
    const diff = to - from

    const tick = (now: number) => {
      const elapsed = (now - startTime) / (duration * 1000)
      const t = Math.min(elapsed, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(parseFloat((from + diff * eased).toFixed(decimals)))
      if (t < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, from, to, duration, decimals, reduced])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  )
}
