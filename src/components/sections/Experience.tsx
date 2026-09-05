import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@ui/ScrollReveal'
import AnimatedCounter from '@ui/AnimatedCounter'
import { experience } from '@data/content'

const tagColors: Record<string, string> = {
  PERF: 'text-green-400 border-green-400/30 bg-green-400/8',
  FIX: 'text-blue-400 border-blue-400/30 bg-blue-400/8',
  BUG: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/8',
  COLLAB: 'text-accent border-accent/30 bg-accent/8',
}

export default function Experience() {
  const job = experience[0]

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative py-32 lg:py-40 px-6 lg:px-12 bg-bg-surface"
      style={{ clipPath: 'polygon(0 3%, 100% 0, 100% 97%, 0 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── Left ── */}
          <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-8 lg:pt-2">
            <ScrollReveal direction="left">
              <span className="font-mono text-xs text-accent tracking-[0.25em] uppercase">02</span>
            </ScrollReveal>
            <div className="hidden lg:block h-24 w-px bg-border" aria-hidden="true" />
            <div className="hidden lg:block section-label">Experience</div>
          </div>

          {/* ── Right ── */}
          <div className="lg:col-span-11">
            <ScrollReveal delay={0.1}>
              <h2
                id="experience-heading"
                className="font-display text-text-primary mb-4"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
              >
                WHERE I'VE<br />
                <span className="text-accent">SHIPPED.</span>
              </h2>
            </ScrollReveal>

            {/* Terminal card */}
            <ScrollReveal delay={0.2} className="mt-12">
              <article
                className="border border-border bg-bg relative overflow-hidden"
                aria-label={`${job.role} at ${job.company}`}
              >
                {/* Terminal header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-bg-elevated">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5" aria-hidden="true">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="font-mono text-xs text-text-muted ml-2">work.log</span>
                  </div>
                  <span className="font-mono text-xs text-text-muted">{job.period}</span>
                </div>

                <div className="p-6 lg:p-10">
                  {/* Role header */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
                    <div>
                      <div className="font-mono text-xs text-accent tracking-widest uppercase mb-2">{job.type}</div>
                      <h3 className="font-display text-text-primary" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.05 }}>
                        {job.role}
                      </h3>
                      <p className="font-sans text-text-secondary mt-1">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    {/* Star stat — animated counter */}
                    <div className="flex-shrink-0 border border-accent/25 bg-accent/6 p-5 text-right">
                      <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1">
                        Dashboard load time
                      </div>
                      <div className="flex items-baseline gap-2 justify-end">
                        <AnimatedCounter
                          from={8}
                          to={0.9}
                          duration={1.6}
                          suffix="s"
                          decimals={1}
                          className="font-display text-accent"
                          style={{ fontSize: '2.5rem', lineHeight: 1 } as CSSProperties}
                        />
                        <span className="font-mono text-xs text-green-400 tracking-wider">↓ 88%</span>
                      </div>
                      <div className="font-mono text-xs text-text-muted mt-1">from 8.0s</div>
                    </div>
                  </div>

                  {/* Log entries */}
                  <div className="space-y-4" role="list">
                    {job.achievements.map((item, i) => (
                      <ScrollReveal key={i} delay={0.1 + i * 0.08} direction="left">
                        <div
                          className="flex gap-4 items-start font-mono text-sm"
                          role="listitem"
                        >
                          {/* Log prefix */}
                          <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
                            <span className="text-text-muted text-xs select-none" aria-hidden="true">
                              {'>'}{String(i + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={`tag text-[0.6rem] px-1.5 py-0.5 ${tagColors[item.tag] ?? 'text-accent border-border'}`}
                              aria-label={`Tag: ${item.tag}`}
                            >
                              {item.tag}
                            </span>
                          </div>
                          {/* Description */}
                          <p className="text-text-secondary leading-relaxed flex-1">
                            {item.stat && (
                              <span className="text-accent font-medium mr-2">
                                [{item.label}: {item.stat.from} → {item.stat.to} ({item.stat.improvement})]
                              </span>
                            )}
                            {item.description}
                          </p>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>

                {/* Accent corner decoration */}
                <div
                  className="absolute bottom-0 left-0 w-1 h-full bg-accent opacity-30"
                  aria-hidden="true"
                  style={{ background: 'linear-gradient(to bottom, transparent, var(--accent) 40%, var(--accent) 60%, transparent)' }}
                />
              </article>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
