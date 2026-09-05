import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@ui/ScrollReveal'
import { personal } from '@data/content'

const socialLinks = [
  { label: 'Email', value: personal.email, href: `mailto:${personal.email}`, icon: '✉' },
  { label: 'Phone', value: personal.phone, href: `tel:+91${personal.phone}`, icon: '◎' },
  { label: 'GitHub', value: 'github.com/hegdeabhisheka', href: personal.github, icon: '⌥', external: true },
  { label: 'LinkedIn', value: 'linkedin.com/in/hegdeabhisheka', href: personal.linkedin, icon: '◉', external: true },
]

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // mailto fallback — opens default email client
    // TODO: Replace with Formspree/EmailJS for a real form service
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.open(`mailto:${personal.email}?subject=${subject}&body=${body}`)
    setStatus('sent')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-32 lg:py-40 px-6 lg:px-12 bg-bg-surface"
      style={{ clipPath: 'polygon(0 3%, 100% 0, 100% 100%, 0 100%)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── Left ── */}
          <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-8 lg:pt-2">
            <ScrollReveal direction="left">
              <span className="font-mono text-xs text-accent tracking-[0.25em] uppercase">06</span>
            </ScrollReveal>
            <div className="hidden lg:block h-24 w-px bg-border" aria-hidden="true" />
            <div className="hidden lg:block section-label">Contact</div>
          </div>

          {/* ── Right ── */}
          <div className="lg:col-span-11">
            <ScrollReveal delay={0.1}>
              <h2
                id="contact-heading"
                className="font-display text-text-primary mb-4"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95 }}
              >
                LET'S<br />
                <span className="text-accent">TALK.</span>
              </h2>
              <p className="text-text-secondary max-w-md leading-relaxed mb-12">
                Open to full-time roles, contract work, and interesting collaborations. 
                I respond to every genuine message.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Contact info */}
              <ScrollReveal delay={0.15}>
                <div className="space-y-4">
                  {socialLinks.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="flex items-center gap-4 p-4 border border-border hover:border-border-accent group transition-colors duration-200"
                      aria-label={`${link.label}: ${link.value}`}
                    >
                      <span className="font-mono text-base text-accent flex-shrink-0 w-6 text-center" aria-hidden="true">
                        {link.icon}
                      </span>
                      <div>
                        <div className="font-mono text-xs text-text-muted tracking-widest uppercase mb-0.5">{link.label}</div>
                        <div className="text-text-primary text-sm group-hover:text-accent transition-colors duration-200">
                          {link.value}
                        </div>
                      </div>
                      <span className="ml-auto font-mono text-xs text-text-muted group-hover:text-accent transition-colors duration-200" aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              </ScrollReveal>

              {/* Contact form */}
              <ScrollReveal delay={0.25}>
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
                  <div>
                    <label htmlFor="contact-name" className="font-mono text-xs text-text-muted tracking-widest uppercase block mb-2">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-bg border border-border px-4 py-3 text-text-primary font-mono text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="font-mono text-xs text-text-muted tracking-widest uppercase block mb-2">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-bg border border-border px-4 py-3 text-text-primary font-mono text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="font-mono text-xs text-text-muted tracking-widest uppercase block mb-2">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full bg-bg border border-border px-4 py-3 text-text-primary font-mono text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                      placeholder="What's on your mind?"
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    {status === 'sent' ? (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="font-mono text-sm text-green-400 py-3 tracking-wide"
                        role="status"
                        aria-live="polite"
                      >
                        ✓ Email client opened — message ready to send!
                      </motion.div>
                    ) : (
                      <motion.button
                        key="submit"
                        type="submit"
                        className="w-full py-4 bg-accent text-bg font-mono text-sm tracking-widest uppercase hover:bg-accent-bright transition-all duration-200 group flex items-center justify-center gap-2"
                      >
                        Send Message
                        <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
                      </motion.button>
                    )}
                  </AnimatePresence>

                  <p className="font-mono text-xs text-text-muted text-center">
                    {/* TODO: Replace with Formspree/EmailJS for serverless form handling */}
                    Opens your default email client
                  </p>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
