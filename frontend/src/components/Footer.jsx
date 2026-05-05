import { useTranslation } from '../LanguageContext'
import { Phone, Mail, MapPin, Camera, ChevronRight } from 'lucide-react'

export default function Footer({ onNavigate }) {
  const { t } = useTranslation();
  const year = new Date().getFullYear()

  const handleLegalClick = (e, href) => {
    e.preventDefault();
    if (href.startsWith('/')) {
      const type = href.substring(1);
      if (type === 'aviso-legal' || type === 'privacidad' || type === 'cookies') {
        onNavigate(type);
      }
    } else if (href.startsWith('#')) {
      onNavigate('home');
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

  // WhatsApp Icon helper (since it's not in Lucide by default in basic pack)
  const WhatsAppIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.135 1.534 5.868L0 24l6.302-1.517A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.031-1.382l-.36-.214-3.742.9.944-3.653-.235-.376A9.817 9.817 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182c5.422 0 9.818 4.396 9.818 9.818 0 5.422-4.396 9.818-9.818 9.818z"/>
    </svg>
  );

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-white/5">

      {/* MOBILE layout */}
      <div className="md:hidden px-6 py-10 flex flex-col items-center text-center">
        {/* Logo + desc */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src="/logo-integral-electrica.png" alt="Integral Eléctrica Logo" className="h-9 w-auto object-contain" />
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{t.footer.desc}</p>

        {/* Contact quick links */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <a href="tel:+34615285687" className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
            <Phone size={15} className="text-electric-400" /> +34 615 28 56 87
          </a>
          <a href="mailto:info@integralelectrica.com" className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
            <Mail size={15} className="text-electric-400" /> info@integralelectrica.com
          </a>
          <span className="flex items-center gap-2 text-slate-400 text-sm">
            <MapPin size={15} className="text-electric-400" /> Marbella, Málaga
          </span>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6 border-t border-white/5 pt-6 w-full">
          {t.footer.legalList.map(item => (
            <a key={item.label} href={item.href} onClick={(e) => handleLegalClick(e, item.href)}
              className="text-slate-500 hover:text-white text-xs transition-colors">
              {item.label}
            </a>
          ))}
        </div>

        <p className="text-slate-600 text-xs">© {year} Integral Eléctrica Marbella. {t.footer.rights}</p>
        <p className="text-slate-600 text-xs mt-2">{t.footer.powered} <a href="https://rgardel.es" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-electric-400 transition-colors">Roberto García Delgado</a></p>
      </div>

      {/* DESKTOP layout */}
      <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <img src="/logo-integral-electrica.png" alt="Integral Eléctrica Logo" className="h-10 w-auto object-contain mb-5" />
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{t.footer.desc}</p>
            <div className="flex gap-3">
              {[
                { label: 'WhatsApp', href: 'https://wa.me/34615285687', icon: <WhatsAppIcon /> },
                { label: 'Instagram', href: '#', icon: <Camera className="w-4 h-4" /> },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-electric-600 transition-all duration-200">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">{t.footer.groups.servicios}</h4>
            <ul className="space-y-3">
              {t.footer.serviciosList.map(item => (
                <li key={item.label}>
                  <a href={item.href} onClick={(e) => handleLegalClick(e, item.href)}
                    className="text-slate-400 hover:text-white text-sm transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">{t.footer.groups.legal}</h4>
            <ul className="space-y-3">
              {t.footer.legalList.map(item => (
                <li key={item.label}>
                  <a href={item.href} onClick={(e) => handleLegalClick(e, item.href)}
                    className="text-slate-400 hover:text-white text-sm transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">{t.footer.quick}</h4>
            <div className="space-y-4">
              <a href="tel:+34615285687" className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                <Phone size={15} className="text-electric-400" /> +34 615 28 56 87
              </a>
              <a href="mailto:info@integralelectrica.com" className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                <Mail size={15} className="text-electric-400" /> info@integralelectrica.com
              </a>
              <span className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin size={15} className="text-electric-400" /> Marbella, Málaga
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex items-center justify-between">
          <p className="text-slate-500 text-xs">© {year} INTEGRAL ELÉCTRICA MARBELLA. {t.footer.rights}</p>
          <p className="text-slate-600 text-xs">{t.footer.powered} <a href="https://rgardel.es" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-electric-400 transition-colors">Roberto García Delgado</a></p>
        </div>
      </div>

    </footer>
  )
}
