import { personal } from '@data/content'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border py-10 px-6 lg:px-12" aria-label="Footer">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-mono text-xs text-text-muted tracking-widest">
          © {year} Abhisheka C Hegde — Built with React + Vite
        </p>
        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-6" role="list">
            {[
              { label: 'About', href: '#about' },
              { label: 'Projects', href: '#projects' },
              { label: 'Contact', href: '#contact' },
              { label: 'GitHub', href: personal.github, external: true },
              { label: 'LinkedIn', href: personal.linkedin, external: true },
            ].map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="font-mono text-xs text-text-muted hover:text-accent transition-colors uppercase tracking-widest underline-draw"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
