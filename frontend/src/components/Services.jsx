import { motion } from 'framer-motion'
import { Zap, Home, Wrench, FileCheck } from 'lucide-react'
import { useTranslation } from '../LanguageContext'

export default function Services() {
  const { t } = useTranslation();

  const iconMap = { Zap, FileCheck, Home, Wrench };

  const services = [
    { id: 'instalaciones', icon: 'Zap',       color: 'text-amber-500',   bg: 'bg-amber-50',   border: 'border-t-amber-400',   img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80&auto=format&fit=crop' },
    { id: 'boletines',     icon: 'FileCheck', color: 'text-blue-500',    bg: 'bg-blue-50',    border: 'border-t-blue-400',    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&q=80&auto=format&fit=crop' },
    { id: 'domotica',      icon: 'Home',      color: 'text-purple-500',  bg: 'bg-purple-50',  border: 'border-t-purple-400',  img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=700&q=80&auto=format&fit=crop' },
    { id: 'mantenimiento', icon: 'Wrench',    color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-t-emerald-400', img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=700&q=80&auto=format&fit=crop' },
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
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.08, type: 'tween' } }}
                transition={{ delay: idx * 0.08, duration: 0.08, type: 'tween' }}
                className={`bg-white rounded-3xl border border-slate-100 border-t-4 ${svc.border} shadow-sm hover:shadow-2xl hover:shadow-slate-200/70 transition-shadow duration-75 overflow-hidden flex flex-col`}
              >
                <div className="w-full h-40 md:h-56 overflow-hidden">
                  <img
                    src={svc.img}
                    alt={content.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 md:p-7 flex flex-col items-center text-center flex-1">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${svc.bg} ${svc.color} flex items-center justify-center mb-4 shadow-sm`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">{content.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-xs md:text-sm">{content.desc}</p>
                </div>
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
