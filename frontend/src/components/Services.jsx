import { motion } from 'framer-motion'
import { Zap, Home, Wrench, FileCheck } from 'lucide-react'
import { useTranslation } from '../LanguageContext'

export default function Services() {
  const { t } = useTranslation();

  const iconMap = { Zap, FileCheck, Home, Wrench };

  const services = [
    { id: 'instalaciones', icon: 'Zap',       color: 'text-amber-600',   bg: 'bg-amber-50'   },
    { id: 'boletines',     icon: 'FileCheck', color: 'text-blue-600',    bg: 'bg-blue-50'    },
    { id: 'domotica',      icon: 'Home',      color: 'text-purple-600',  bg: 'bg-purple-50'  },
    { id: 'mantenimiento', icon: 'Wrench',    color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ]

  return (
    <section id="servicios" className="py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-electric-600 text-sm font-bold uppercase tracking-widest"
          >
            {t.services.tag}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title mt-4 mb-6"
          >
            {t.services.title1}<br />
            <span className="text-electric-600">{t.services.title2}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="section-subtitle mx-auto"
          >
            {t.services.sub}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc, idx) => {
            const Icon = iconMap[svc.icon];
            const content = t.services.list.find(item => item.id === svc.id) || {};
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white p-10 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl ${svc.bg} ${svc.color} flex items-center justify-center mb-6`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{content.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{content.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-slate-500 mb-5 text-sm">{t.services.cta}</p>
          <a
            href="#contacto"
            onClick={e => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary px-8 py-3 rounded-full font-bold text-sm"
          >
            {t.services.ctaBtn}
          </a>
        </motion.div>

      </div>
    </section>
  )
}
