import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Phone } from 'lucide-react'
import { useTranslation } from '../LanguageContext'

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.135 1.534 5.868L0 24l6.302-1.517A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.031-1.382l-.36-.214-3.742.9.944-3.653-.235-.376A9.817 9.817 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182c5.422 0 9.818 4.396 9.818 9.818 0 5.422-4.396 9.818-9.818 9.818z"/>
  </svg>
)

export default function Hero() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const el = document.querySelector('#contacto');
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  }

  return (
    <section id="inicio" className="min-h-screen flex items-center bg-white">
      <div className="w-full max-w-4xl mx-auto px-6 py-36 text-center">

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-50 text-electric-700 text-sm font-semibold mb-10 border border-electric-100"
        >
          <span className="w-2 h-2 rounded-full bg-electric-500 animate-pulse" />
          {t.hero.badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-8"
        >
          {t.hero.title1}<br />
          <span className="text-electric-600">{t.hero.title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-500 max-w-xl mx-auto mb-14 leading-relaxed"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <button
            onClick={scrollToContact}
            className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-base font-bold"
          >
            {t.hero.cta1}
            <ArrowRight size={18} />
          </button>
          <a
            href="https://wa.me/34615285687"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-base font-bold text-slate-700 border-2 border-slate-200 hover:border-green-300 hover:bg-green-50 transition-colors duration-200"
          >
            <WhatsAppIcon />
            {t.hero.cta2}
          </a>
          <a
            href="tel:+34615285687"
            className="sm:hidden inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-base font-bold text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200"
          >
            <Phone size={18} className="text-electric-600" />
            {t.hero.cta3}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-10 pt-10 border-t border-slate-100"
        >
          {[
            { icon: CheckCircle2, label: t.hero.trust[0].label },
            { icon: ShieldCheck,  label: t.hero.trust[1].label },
            { icon: Zap,          label: t.hero.trust[2].label },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-500">
              <item.icon size={18} className="text-electric-500 flex-shrink-0" />
              <span className="text-sm font-semibold">{item.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
