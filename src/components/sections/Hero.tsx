import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { personal, stackItems } from '@data/content'
import { useReducedMotion } from '@hooks/useReducedMotion'

// Typewriter cycling through stack items
function Typewriter({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setDisplayed(items[0])
      return
    }
    const target = items[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70)
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex(i => (i + 1) % items.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, index, items, reduced])

  return (
    <span className="font-mono text-accent text-sm md:text-base tracking-wider">
      {displayed}
      <span className="cursor-blink" aria-hidden="true" />
    </span>
  )
}

// Stagger container
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Hero() {
  const reduced = useReducedMotion()

  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 pt-24 pb-16 overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-60 pointer-events-none" aria-hidden="true" />

      {/* Decorative vertical line */}
      <div
        className="absolute left-6 lg:left-12 top-0 bottom-0 w-px pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--border) 20%, var(--border) 80%, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">

          {/* ── Left column: Main headline ── */}
          <motion.div
            className="lg:col-span-8"
            variants={containerVariants}
            initial={reduced ? 'visible' : 'hidden'}
            animate="visible"
          >
            {/* Terminal label */}
            <motion.div variants={itemVariants} className="mb-6 flex items-center gap-3">
              <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
                <span aria-hidden="true">~/portfolio</span> <span className="text-text-muted">$</span> whoami
              </span>
            </motion.div>

            {/* Giant name — Bebas Neue stacked */}
            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="font-display leading-none text-text-primary select-none"
              style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
            >
              <span className="block">{personal.nameDisplay.first}</span>
              <span className="block" style={{ color: 'var(--accent)', WebkitTextStroke: '1px var(--accent-dim)' }}>
                {personal.nameDisplay.last}
              </span>
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={itemVariants}
              className="mt-4 font-mono text-base md:text-lg text-text-secondary tracking-widest uppercase"
            >
              {personal.title} · {personal.location}
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed"
            >
              {personal.tagline}
            </motion.p>

            {/* Typewriter */}
            <motion.div variants={itemVariants} className="mt-4 flex items-center gap-2">
              <span className="font-mono text-xs text-text-muted tracking-wider">Currently working with:</span>
              <Typewriter items={stackItems} />
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => handleScroll('#projects')}
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-bg font-mono text-sm font-medium tracking-widest uppercase hover:bg-accent-bright transition-all duration-200"
                aria-label="View my work"
              >
                View Work
                <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
              </button>
              <a
                href={personal.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-border-accent text-accent font-mono text-sm tracking-widest uppercase hover:bg-accent-muted transition-all duration-200"
                aria-label="Download resume PDF"
              >
                Resume ↓
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right column: Skewed terminal code block ── */}
          <motion.div
            className="lg:col-span-4 hidden lg:block"
            initial={reduced ? { opacity: 1 } : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transform: 'rotate(-3deg)' }}
            aria-hidden="true"
          >
            <div className="border border-border bg-bg-surface p-6 relative">
              {/* Terminal chrome */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-2 font-mono text-xs text-text-muted">abhisheka.json</span>
              </div>
              <pre className="font-mono text-xs leading-6 text-text-secondary overflow-hidden">
{`{
  "role": "Full Stack Dev",
  "location": "Bengaluru 🇮🇳",
  "stack": [
    "React", "FastAPI",
    "Python", "MongoDB"
  ],
  "education": "B.E. CSE",
  "cgpa": 8.0,
  "status": "Open to roles",
  "perf": {
    "dashboard": "8s → <1s"
  }
}`}
              </pre>
              {/* Accent corner */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="font-mono text-xs text-text-muted tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-text-muted to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
