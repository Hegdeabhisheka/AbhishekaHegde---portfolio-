import ScrollReveal from '@ui/ScrollReveal'
import { personal } from '@data/content'

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-32 lg:py-40 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* ── Left: Section number + rotated label ── */}
          <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-8 lg:pt-2">
            <ScrollReveal direction="left">
              <span className="font-mono text-xs text-accent tracking-[0.25em] uppercase block">01</span>
            </ScrollReveal>
            <div className="hidden lg:block h-24 w-px bg-border" aria-hidden="true" />
            <div className="hidden lg:block section-label">About</div>
          </div>

          {/* ── Right: Content ── */}
          <div className="lg:col-span-11">
            <ScrollReveal delay={0.1}>
              <h2
                id="about-heading"
                className="font-display text-text-primary mb-12"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
              >
                NOT JUST<br />
                <span className="text-accent">ANOTHER DEV.</span>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              {/* Bio */}
              <ScrollReveal delay={0.15}>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="accent-line" aria-hidden="true" />
                    <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">Bio</span>
                  </div>
                  <p className="text-text-secondary leading-[1.85] text-base">
                    {personal.bio}
                  </p>
                </div>
              </ScrollReveal>

              {/* How I Work */}
              <ScrollReveal delay={0.25}>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="accent-line" aria-hidden="true" />
                    <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">How I Work</span>
                  </div>
                  <p className="text-text-secondary leading-[1.85] text-base">
                    {personal.howIWork}
                  </p>

                  {/* SDLC/Process tags */}
                  <div className="flex flex-wrap gap-2 mt-8">
                    {['Agile / Scrum', 'Code Review', 'Sprint Planning', 'CI/CD Aware', 'Ownership'].map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Quick-stat bar */}
            <ScrollReveal delay={0.35} className="mt-16 pt-10 border-t border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { value: '8.0', label: 'CGPA', suffix: '' },
                  { value: '6', label: 'Months Intern', suffix: 'mo' },
                  { value: '3', label: 'Projects Built', suffix: '+' },
                  { value: '4', label: 'Certifications', suffix: '' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="font-display text-accent" style={{ fontSize: '3rem', lineHeight: 1 }}>
                      {stat.value}<span className="text-2xl">{stat.suffix}</span>
                    </div>
                    <div className="font-mono text-xs text-text-muted tracking-widest uppercase mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
