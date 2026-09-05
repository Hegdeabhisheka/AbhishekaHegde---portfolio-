import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface CustomCursorProps {
  disabled?: boolean
}

export default function CustomCursor({ disabled = false }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)

  useEffect(() => {
    if (disabled) return

    // Don't show on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const moveCursor = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const addHover = () => setIsHovering(true)
    const removeHover = () => setIsHovering(false)

    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseleave', () => setIsVisible(false))
    document.addEventListener('mouseenter', () => setIsVisible(true))

    // Track interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    // RAF loop for ring lag
    const animate = () => {
      const dx = pos.current.x - ringPos.current.x
      const dy = pos.current.y - ringPos.current.y
      ringPos.current.x += dx * 0.12
      ringPos.current.y += dy * 0.12

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
      cancelAnimationFrame(raf.current)
    }
  }, [disabled, isVisible])

  if (disabled) return null

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        <div
          className="rounded-full transition-all duration-150"
          style={{
            width: isHovering ? '8px' : '5px',
            height: isHovering ? '8px' : '5px',
            background: '#E8821C',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] will-change-transform"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        <div
          className="rounded-full border transition-all duration-300"
          style={{
            width: isHovering ? '44px' : '30px',
            height: isHovering ? '44px' : '30px',
            borderColor: isHovering ? '#E8821C' : 'rgba(232,130,28,0.5)',
            background: isHovering ? 'rgba(232,130,28,0.06)' : 'transparent',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </>
  )
}
