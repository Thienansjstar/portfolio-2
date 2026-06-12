import React, { useEffect, useState } from 'react'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Work from './components/Work'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import EasterEgg from './components/EasterEgg'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const [egg, setEgg] = useState(0) // increments to re-trigger the easter egg run

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  return (
    <div className="min-h-screen bg-bg text-ink transition-colors duration-500">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Nav theme={theme} onToggleTheme={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))} />

      <main id="main" className="mx-auto max-w-5xl px-5 sm:px-8">
        <Hero onSecretTrigger={() => setEgg(n => n + 1)} />
        <About />
        <Experience />
        <Work onEasterEgg={() => setEgg(n => n + 1)} />
        <Skills />
        <Contact />
      </main>

      <Footer />
      <EasterEgg trigger={egg} />
    </div>
  )
}
