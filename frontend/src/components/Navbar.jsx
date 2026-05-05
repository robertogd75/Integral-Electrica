import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X, Globe, ChevronRight } from 'lucide-react'
import { useTranslation } from '../LanguageContext'

export default function Navbar({ onNavigate }) {
  const { lang, setLang, t } = useTranslation();
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#inicio')

  const NAV_LINKS = [
    { id: 'inicio',    label: t.nav.inicio,    href: '#inicio'    },
    { id: 'servicios', label: t.nav.servicios, href: '#servicios' },
    { id: 'nosotros',  label: t.nav.nosotros,  href: '#nosotros'  },
    { id: 'contacto',  label: t.nav.contacto,  href: '#contacto'  },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveLink(`#${e.target.id}`)
        })
      },
      { threshold: 0.4 }
    )
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [lang, t])

  const handleClick = (href) => {
    setMenuOpen(false)
    if (href.startsWith('#')) {
      if (onNavigate) onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 10);
    }
  }

  const toggleLang = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2 bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200'
          : 'py-4 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <div className="flex-shrink-0 w-48">
          <a
            href="#inicio"
            onClick={e => { e.preventDefault(); handleClick('#inicio') }}
            className="flex items-center group"
          >
            <img 
              src="/logo-integral-electrica.png" 
              alt="Integral Eléctrica Logo" 
              className="h-12 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
            />
          </a>
        </div>

        {/* Desktop links - Increased size and font weight */}
        <ul className="hidden md:flex items-center justify-center flex-1 gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => handleClick(href)}
                className={`relative py-2 text-[15px] font-semibold tracking-wide transition-all duration-300 group ${
                  activeLink === href ? 'text-electric-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-electric-500 transition-all duration-300 ${
                  activeLink === href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            </li>
          ))}
        </ul>

        {/* Right side controls */}
        <div className="hidden md:flex items-center justify-end gap-6 w-48 flex-shrink-0">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 group px-3 py-1.5 rounded-full hover:bg-slate-100 transition-all duration-200"
          >
            <img 
              src={lang === 'es' ? '/uk.svg' : '/spain.svg'} 
              alt="Flag" 
              className="h-4 w-6 object-cover rounded-[2px] shadow-sm"
            />
            <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 uppercase tracking-tighter">
              {lang === 'es' ? 'EN' : 'ES'}
            </span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleLang} className="rounded-md overflow-hidden">
            <img src={lang === 'es' ? '/uk.svg' : '/spain.svg'} alt="Flag" className="h-6 w-9 object-cover block" />
          </button>
          
          <button
            className="p-2 text-slate-700"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu with Framer Motion */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200"
          >
            <div className="px-4 py-6 space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => handleClick(href)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-bold transition-all ${
                    activeLink === href ? 'bg-electric-50 text-electric-700' : 'text-slate-600'
                  }`}
                >
                  {label}
                  <ChevronRight size={20} className={activeLink === href ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
              <div className="pt-4">
                <a href="tel:+34600000000" className="btn-primary w-full justify-center py-4 rounded-2xl text-lg font-bold shadow-electric">
                  <Phone className="mr-2" size={20} />
                  {t.nav.cta}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
