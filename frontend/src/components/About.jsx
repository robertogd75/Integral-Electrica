import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { useTranslation } from '../LanguageContext'

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="nosotros" className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left: text */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-electric-600 text-sm font-bold uppercase tracking-widest"
            >
              {t.about.tag}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-left mt-4 mb-8"
            >
              {t.about.title1}<br />
              <span className="text-electric-600">{t.about.title2}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-5 mb-12"
            >
              <p className="text-lg text-slate-700 leading-relaxed">{t.about.desc1}</p>
              <p className="text-base text-slate-500 leading-relaxed">{t.about.desc2}</p>
            </motion.div>

            <div className="space-y-5">
              {t.about.values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-7 h-7 rounded-full bg-electric-50 text-electric-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-electric-100">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm mb-1">{v.title}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: stats */}
          <div className="grid grid-cols-1 gap-5">
            {t.about.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl p-10 border ${i === 0 ? 'bg-electric-600 border-electric-700 text-white' : 'bg-slate-50 border-slate-100'}`}
              >
                <div className={`text-5xl font-black mb-2 ${i === 0 ? 'text-white' : 'text-slate-900'}`}>
                  {stat.value}{stat.suffix}
                </div>
                <div className={`text-sm font-medium ${i === 0 ? 'text-white/80' : 'text-slate-500'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
