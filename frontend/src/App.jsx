// Refreshed UI with new brand identity
import { useState } from 'react'
import { LanguageProvider } from './LanguageContext'
import Navbar  from './components/Navbar'
import Hero    from './components/Hero'
import Services from './components/Services'
import About   from './components/About'
import Contact from './components/Contact'
import Footer  from './components/Footer'
import LegalPages from './components/LegalPages'
import CookiesBanner from './components/ConsentBanner'

export default function App() {
  const [view, setView] = useState('home') // 'home' | 'aviso-legal' | 'privacidad' | 'cookies'

  const handleNavigate = (newView) => {
    setView(newView)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <LanguageProvider>
      <Navbar onNavigate={handleNavigate} />

      <main>
        {view === 'home' ? (
          <>
            <Hero />
            <Services />
            <About />
            <Contact />
          </>
        ) : (
          <LegalPages type={view} onBack={() => handleNavigate('home')} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <CookiesBanner />
    </LanguageProvider>
  )
}
