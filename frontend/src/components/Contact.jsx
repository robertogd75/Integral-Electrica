import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { useTranslation } from '../LanguageContext'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082'

function validate(fields) {
  const errors = {}
  if (!fields.name.trim() || fields.name.trim().length < 2) errors.name = true
  if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = true
  if (fields.phone && !/^[+\d\s\-()]{7,15}$/.test(fields.phone)) errors.phone = true
  if (!fields.message.trim() || fields.message.trim().length < 10) errors.message = true
  return errors
}

function FieldWrapper({ id, label, error, className, children }) {
  return (
    <div className={`space-y-2 flex flex-col ${className || ''}`}>
      <label htmlFor={id} className="block text-sm font-bold text-slate-700 uppercase tracking-tight">{label}</label>
      {children}
    </div>
  )
}

export default function Contact() {
  const { t } = useTranslation();
  const INITIAL = { name: '', email: '', phone: '', service: '', message: '' }
  const [form, setForm]       = useState(INITIAL)
  const [touched, setTouched] = useState({})
  const [status, setStatus]   = useState('idle') 
  const [serverMsg, setServerMsg] = useState('')

  const errors   = validate(form)
  const isValid  = Object.keys(errors).length === 0

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleBlur = e => setTouched(t => ({ ...t, [e.target.name]: true }))

  const getFieldClass = (name) => {
    const base = "input-field w-full px-5 py-4 rounded-2xl border-2 border-slate-100 bg-white focus:border-electric-500 focus:bg-white outline-none transition-all duration-300"
    if (!touched[name]) return base
    if (errors[name])   return `${base} border-red-200 bg-red-50/50`
    return `${base} border-electric-500/30 bg-electric-50/20`
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, service: true, message: true })
    if (!isValid) return

    setStatus('sending')
    try {
      const res = await fetch(`${API_URL}/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm(INITIAL)
        setTouched({})
        setServerMsg(t.contact.form.successMsg)
      } else {
        setStatus('error')
        setServerMsg(data.message || t.contact.form.error)
      }
    } catch {
      setStatus('error')
      setServerMsg(t.contact.form.error)
    }
  }

  const infoItems = [
    { icon: Phone, label: t.contact.info.phone, value: '+34 600 000 000', href: 'tel:+34600000000', color: 'bg-blue-50 text-blue-600' },
    { icon: Mail, label: t.contact.info.email, value: 'info@integralelectrica.com', href: 'mailto:info@integralelectrica.com', color: 'bg-purple-50 text-purple-600' },
    { icon: MapPin, label: t.contact.info.location, value: 'Marbella, Málaga', href: null, color: 'bg-red-50 text-red-600' },
    { icon: Clock, label: t.contact.info.horario, value: t.contact.info.horarioVal, href: null, color: 'bg-emerald-50 text-emerald-600' },
  ]

  return (
    <section id="contacto" className="py-32 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-electric-600 text-sm font-bold uppercase tracking-widest">
            {t.contact.tag}
          </span>
          <h2 className="section-title mt-4 mb-6">
            {t.contact.title1}<br />
            <span className="text-electric-600">{t.contact.title2}</span>
          </h2>
          <p className="section-subtitle mx-auto">{t.contact.sub}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Info & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 flex-shrink-0">
              {infoItems.map((item, idx) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-50 p-6 rounded-3xl flex items-center gap-5 border border-slate-100 hover:border-electric-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-slate-900 text-base font-bold group-hover:text-electric-600 transition-colors duration-300">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-900 text-base font-bold">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-100 overflow-hidden rounded-[2rem] flex-grow min-h-[350px] border-4 border-white shadow-2xl flex"
            >
              <iframe
                title="Google Maps - Integral Eléctrica"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6413.512146640586!2d-4.878259424368702!3d36.511749872330824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72d80a5b52972d%3A0xcc6c3a05afd422e3!2sIntegral%20El%C3%A9ctrica!5e0!3m2!1ses!2ses!4v1777971747491!5m2!1ses!2ses"
                className="w-full h-full border-0 grayscale-[0.3] hover:grayscale-0 transition-all duration-700 self-stretch"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 flex flex-col order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full"
            >

              {status === 'success' ? (
                <div className="text-center py-12 flex-grow flex flex-col justify-center items-center">
                  <div className="w-24 h-24 bg-electric-100 text-electric-600 rounded-full flex items-center justify-center mb-8 animate-bounce-subtle">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-slate-900 mb-4">{t.contact.form.successTitle}</h3>
                  <p className="text-slate-500 text-lg mb-10 max-w-sm">{serverMsg}</p>
                  <button onClick={() => setStatus('idle')} className="btn-primary px-10 py-4 rounded-2xl shadow-electric">
                    {t.contact.form.another}
                  </button>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-8 flex-grow flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FieldWrapper id="contact-name" label={t.contact.form.name}>
                      <input
                        id="contact-name" type="text" name="name"
                        placeholder={t.contact.form.placeholderName}
                        value={form.name} onChange={handleChange} onBlur={handleBlur}
                        className={getFieldClass('name')}
                      />
                    </FieldWrapper>

                    <FieldWrapper id="contact-email" label={t.contact.form.email}>
                      <input
                        id="contact-email" type="email" name="email"
                        placeholder={t.contact.form.placeholderEmail}
                        value={form.email} onChange={handleChange} onBlur={handleBlur}
                        className={getFieldClass('email')}
                      />
                    </FieldWrapper>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <FieldWrapper id="contact-phone" label={t.contact.form.phone}>
                      <input
                        id="contact-phone" type="tel" name="phone"
                        placeholder="+34 600 000 000"
                        value={form.phone} onChange={handleChange} onBlur={handleBlur}
                        className={getFieldClass('phone')}
                      />
                    </FieldWrapper>

                    <FieldWrapper id="contact-service" label={t.contact.form.service}>
                      <select
                        id="contact-service" name="service"
                        value={form.service} onChange={handleChange} onBlur={handleBlur}
                        className={`${getFieldClass('service')} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%2364748b%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_1rem_center] bg-no-repeat`}
                      >
                        <option value="">{t.contact.form.servicePlaceholder}</option>
                        {Object.entries(t.contact.services).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </FieldWrapper>
                  </div>

                  <div className="flex-grow flex flex-col">
                    <FieldWrapper id="contact-message" label={t.contact.form.message} className="flex-grow">
                      <textarea
                        id="contact-message" name="message" rows={5}
                        placeholder={t.contact.form.placeholderMessage}
                        value={form.message} onChange={handleChange} onBlur={handleBlur}
                        className={`${getFieldClass('message')} resize-none flex-grow min-h-[180px]`}
                      />
                    </FieldWrapper>
                  </div>

                  <div className="pt-4">
                    {status === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 mb-6 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-3"
                      >
                        <AlertCircle size={18} />
                        <span className="font-bold">{serverMsg}</span>
                      </motion.div>
                    )}

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary w-full justify-center py-5 rounded-2xl text-lg font-bold shadow-electric-lg hover:shadow-electric hover:translate-y-[-2px] disabled:opacity-50 disabled:translate-y-0 transition-all duration-300"
                    >
                      {status === 'sending' ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{t.contact.form.sending}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Send size={20} />
                          <span>{t.contact.form.submit}</span>
                        </div>
                      )}
                    </button>

                    <p className="text-slate-400 text-xs text-center mt-6">
                      {t.contact.form.privacy}
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
