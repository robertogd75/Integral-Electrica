import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Phone } from 'lucide-react'
import { useTranslation } from '../LanguageContext'

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
            href="tel:+34600000000"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-2xl text-base font-bold text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200"
          >
            <Phone size={18} className="text-electric-600" />
            {t.hero.cta2}
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
