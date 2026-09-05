import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@ui/ScrollReveal'
import { projects } from '@data/content'

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <ScrollReveal delay={0.1 + index * 0.12}>
      <motion.article
        layout
        className="border border-border bg-bg-surface cursor-pointer group relative overflow-hidden"
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
        aria-label={`${project.name} — click to ${expanded ? 'collapse' : 'expand'}`}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setExpanded(v => !v) }}
      >
        {/* Hover accent bar */}
        <div
          className="absolute top-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-accent"
          aria-hidden="true"
        />

        <div className="p-7 lg:p-8">
          {/* Card header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-text-muted">{project.slug}</span>
                <span className="font-mono text-xs text-text-muted">·</span>
                <span className="font-mono text-xs text-accent">{project.year}</span>
              </div>
              <h3 className="font-display text-text-primary group-hover:text-accent transition-colors duration-200"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', lineHeight: 1.05 }}>
                {project.name}
              </h3>
              <p className="text-text-secondary text-sm mt-2 leading-relaxed">{project.tagline}</p>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 w-8 h-8 border border-border flex items-center justify-center text-text-muted group-hover:border-accent group-hover:text-accent transition-all duration-200 mt-1"
              aria-hidden="true"
            >
              <span className="text-lg leading-none">+</span>
            </motion.div>
          </div>

          {/* Tech tags — always visible */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            {project.tech.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>

          {/* Expandable details */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                key="details"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-border">
                  <p className="text-text-secondary text-sm leading-[1.85]">
                    {project.description}
                  </p>
                  <div className="flex gap-4 mt-6">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="font-mono text-xs text-text-muted hover:text-accent transition-colors tracking-wider uppercase underline-draw"
                      aria-label={`View ${project.name} source on GitHub`}
                    >
                      GitHub →
                    </a>
                    {project.live !== '#' && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="font-mono text-xs text-text-muted hover:text-accent transition-colors tracking-wider uppercase underline-draw"
                        aria-label={`View ${project.name} live demo`}
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.article>
    </ScrollReveal>
  )
}

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative py-32 lg:py-40 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── Left ── */}
          <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-8 lg:pt-2">
            <ScrollReveal direction="left">
              <span className="font-mono text-xs text-accent tracking-[0.25em] uppercase">03</span>
            </ScrollReveal>
            <div className="hidden lg:block h-24 w-px bg-border" aria-hidden="true" />
            <div className="hidden lg:block section-label">Projects</div>
          </div>

          {/* ── Right ── */}
          <div className="lg:col-span-11">
            <ScrollReveal delay={0.1}>
              <h2
                id="projects-heading"
                className="font-display text-text-primary mb-3"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
              >
                THINGS I'VE<br />
                <span className="text-accent">BUILT.</span>
              </h2>
              <p className="text-text-muted font-mono text-xs tracking-widest mb-12">
                Click any card to expand details
              </p>
            </ScrollReveal>

            <div className="space-y-5">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
