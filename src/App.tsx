import { lazy, Suspense } from 'react'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import Hero from '@sections/Hero'
import About from '@sections/About'
import Experience from '@sections/Experience'
import Projects from '@sections/Projects'
import Skills from '@sections/Skills'
import Education from '@sections/Education'
import Contact from '@sections/Contact'
import CustomCursor from '@ui/CustomCursor'

// Lazy-load the 3D canvas — keeps initial bundle lean
const SceneCanvas = lazy(() => import('@three/SceneCanvas'))

export default function App() {
  return (
    <>
      {/* Custom cursor — hidden on touch devices via CSS */}
      <CustomCursor />

      {/* 3D fixed background canvas — lazy loaded */}
      <Suspense fallback={null}>
        <SceneCanvas />
      </Suspense>

      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Page structure ── */}
      <div className="relative z-10">
        <Navbar />

        <main id="main-content" aria-label="Main content">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  )
}
