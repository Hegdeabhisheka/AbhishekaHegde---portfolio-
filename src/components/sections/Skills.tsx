import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ScrollReveal from '@ui/ScrollReveal'
import { skills } from '@data/content'

const categoryIcons: Record<string, string> = {
  Languages: '{ }',
  Frameworks: '▲',
  Tools: '⚙',
  Databases: '⬡',
  'Process & Soft': '◈',
}

function SkillCategory({
  category,
  items,
  index,
}: {
  category: string
  items: string[]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <ScrollReveal delay={0.1 + index * 0.08}>
      <div ref={ref} className="flex gap-6 items-start">
        {/* Rotated label */}
        <div className="flex-shrink-0 w-10 pt-1 hidden md:flex flex-col items-center gap-3">
          <span className="font-mono text-accent text-xs" aria-hidden="true">
            {categoryIcons[category] ?? '·'}
          </span>
          <div className="w-px flex-1 min-h-[3rem] bg-border" aria-hidden="true" />
        </div>

        {/* Tags */}
        <div className="flex-1">
          <div className="font-mono text-xs text-text-muted tracking-[0.2em] uppercase mb-4">
            {category}
          </div>
          <div className="flex flex-wrap gap-2">
            {items.map((skill, si) => (
              <motion.span
                key={skill}
                className="tag hover:bg-accent hover:text-bg hover:border-accent transition-all duration-200 cursor-default"
                initial={inView ? { opacity: 0, scale: 0.85 } : false}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.05 * si, ease: [0.25, 0.1, 0.25, 1] }}
                aria-label={skill}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative py-32 lg:py-40 px-6 lg:px-12 bg-bg-surface"
      style={{ clipPath: 'polygon(0 3%, 100% 0, 100% 97%, 0 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── Left ── */}
          <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-8 lg:pt-2">
            <ScrollReveal direction="left">
              <span className="font-mono text-xs text-accent tracking-[0.25em] uppercase">04</span>
            </ScrollReveal>
            <div className="hidden lg:block h-24 w-px bg-border" aria-hidden="true" />
            <div className="hidden lg:block section-label">Skills</div>
          </div>

          {/* ── Right ── */}
          <div className="lg:col-span-11">
            <ScrollReveal delay={0.1}>
              <h2
                id="skills-heading"
                className="font-display text-text-primary mb-16"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
              >
                TOOLS OF<br />
                <span className="text-accent">THE TRADE.</span>
              </h2>
            </ScrollReveal>

            {/* Skill categories */}
            <div className="space-y-10">
              {Object.entries(skills).map(([category, items], index) => (
                <SkillCategory
                  key={category}
                  category={category}
                  items={items}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
