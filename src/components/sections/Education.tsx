import ScrollReveal from '@ui/ScrollReveal'
import { education, certifications } from '@data/content'

export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="relative py-32 lg:py-40 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── Left ── */}
          <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-8 lg:pt-2">
            <ScrollReveal direction="left">
              <span className="font-mono text-xs text-accent tracking-[0.25em] uppercase">05</span>
            </ScrollReveal>
            <div className="hidden lg:block h-24 w-px bg-border" aria-hidden="true" />
            <div className="hidden lg:block section-label">Education</div>
          </div>

          {/* ── Right ── */}
          <div className="lg:col-span-11">
            <ScrollReveal delay={0.1}>
              <h2
                id="education-heading"
                className="font-display text-text-primary mb-12"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
              >
                FOUNDATIONS<br />
                <span className="text-accent">& CREDENTIALS.</span>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Education */}
              <div>
                <ScrollReveal delay={0.15}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="accent-line" aria-hidden="true" />
                    <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">Education</span>
                  </div>
                </ScrollReveal>

                {education.map((edu, i) => (
                  <ScrollReveal key={i} delay={0.2}>
                    <article className="border border-border p-6 relative group hover:border-border-accent transition-colors duration-300">
                      <div className="absolute top-0 left-0 w-0 group-hover:w-full h-0.5 bg-accent transition-all duration-500" aria-hidden="true" />
                      
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <span className="font-mono text-xs text-accent tracking-widest uppercase">{edu.status}</span>
                        <span className="font-mono text-xs text-text-muted">{edu.period}</span>
                      </div>
                      <h3 className="font-display text-text-primary mt-2" style={{ fontSize: '1.4rem', lineHeight: 1.1 }}>
                        {edu.degree}
                      </h3>
                      <p className="text-text-secondary text-sm mt-1">{edu.institution}</p>
                      <p className="text-text-muted text-xs mt-0.5">{edu.location}</p>
                      <div className="mt-4 flex items-center gap-3">
                        <span className="font-mono text-xs text-text-muted uppercase tracking-widest">CGPA</span>
                        <span className="font-display text-accent text-2xl">{edu.cgpa}</span>
                        <span className="font-mono text-xs text-text-muted">/ 10</span>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>

              {/* Certifications */}
              <div>
                <ScrollReveal delay={0.2}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="accent-line" aria-hidden="true" />
                    <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">Certifications</span>
                  </div>
                </ScrollReveal>

                <ul className="space-y-3" role="list">
                  {certifications.map((cert, i) => (
                    <ScrollReveal key={i} delay={0.2 + i * 0.07}>
                      <li className="flex items-start gap-4 border border-border p-4 group hover:border-border-accent transition-colors duration-200">
                        <span className="flex-shrink-0 font-mono text-xs text-accent mt-0.5" aria-hidden="true">◆</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-text-primary text-sm font-medium leading-tight">{cert.title}</p>
                          <p className="font-mono text-xs text-text-muted tracking-wider mt-1">
                            {cert.issuer} · {cert.year}
                          </p>
                        </div>
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
