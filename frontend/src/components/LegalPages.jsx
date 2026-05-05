import { useTranslation } from '../LanguageContext'

const LEGAL_DATA = {
  es: {
    'aviso-legal': {
      title: 'Aviso Legal',
      sections: [
        { subtitle: '1. Información General', content: 'En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), se detallan los datos del titular de la web: Integral Eléctrica Marbella. Domicilio: Marbella, Málaga. Email: info@integralelectrica.com.' },
        { subtitle: '2. Uso del Portal', content: 'El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.' },
        { subtitle: '3. Propiedad Intelectual e Industrial', content: 'Integral Eléctrica por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma.' },
      ]
    },
    privacidad: {
      title: 'Política de Privacidad',
      sections: [
        { subtitle: '1. Responsable del Tratamiento', content: 'Integral Eléctrica Marbella es el responsable del tratamiento de los datos personales del usuario y le informa que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679 (RGPD).' },
        { subtitle: '2. Finalidad del Tratamiento', content: 'Mantenimiento de una relación comercial y el envío de comunicaciones sobre nuestros servicios eléctricos.' },
        { subtitle: '3. Conservación de los Datos', content: 'Se conservarán durante no más tiempo del necesario para mantener el fin del tratamiento o mientras existan prescripciones legales.' },
      ]
    },
    cookies: {
      title: 'Política de Cookies',
      sections: [
        { subtitle: '¿Qué son las cookies?', content: 'Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.' },
        { subtitle: 'Cookies utilizadas', content: 'Utilizamos cookies técnicas para el funcionamiento de la web (como el idioma seleccionado) y analíticas para mejorar nuestros servicios.' },
        { subtitle: 'Cómo desactivar las cookies', content: 'El usuario podrá en cualquier momento elegir qué cookies quiere que funcionen en este sitio web mediante la configuración del navegador.' },
      ]
    }
  },
  en: {
    'aviso-legal': {
      title: 'Legal Notice',
      sections: [
        { subtitle: '1. General Information', content: 'In compliance with the information duty in Article 10 of Law 34/2002, of July 11, Services of the Information Society and Electronic Commerce (LSSICE), the data of the web owner are: Integral Eléctrica Marbella. Address: Marbella, Málaga. Email: info@integralelectrica.com.' },
        { subtitle: '2. Use of the Portal', content: 'Access and/or use of this portal attributes the condition of USER, who accepts the General Conditions of Use reflected here.' },
        { subtitle: '3. Intellectual and Industrial Property', content: 'Integral Eléctrica itself or as an assignee, is the owner of all the intellectual and industrial property rights of its website.' },
      ]
    },
    privacidad: {
      title: 'Privacy Policy',
      sections: [
        { subtitle: '1. Data Controller', content: 'Integral Eléctrica Marbella is responsible for the processing of personal data and informs that this data will be treated in accordance with Regulation (EU) 2016/679 (GDPR).' },
        { subtitle: '2. Purpose of Processing', content: 'Maintenance of a commercial relationship and sending communications about our electrical services.' },
        { subtitle: '3. Data Retention', content: 'They will be kept for no longer than necessary to maintain the purpose of processing or while there are legal requirements.' },
      ]
    },
    cookies: {
      title: 'Cookies Policy',
      sections: [
        { subtitle: 'What are cookies?', content: 'A cookie is a file downloaded to your computer when accessing certain websites. Cookies allow a website to store and retrieve information about browsing habits.' },
        { subtitle: 'Cookies used', content: 'We use technical cookies for the operation of the web (such as selected language) and analytical cookies to improve our services.' },
        { subtitle: 'How to disable cookies', content: 'The user may at any time choose which cookies they want to work on this website through browser settings.' },
      ]
    }
  }
};

export default function LegalPages({ type, onBack }) {
  const { lang } = useTranslation();
  const content = LEGAL_DATA[lang][type];

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-electric-600 font-medium mb-8 hover:gap-3 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
        </button>

        <div className="glass-card p-8 md:p-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-10 border-b border-slate-100 pb-6">
            {content.title}
          </h1>

          <div className="space-y-10">
            {content.sections.map((sec, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-slate-800 mb-4">{sec.subtitle}</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{sec.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-slate-100 text-slate-400 text-sm italic">
            {lang === 'es' 
              ? 'Última actualización: Mayo 2024. Integral Eléctrica Marbella.' 
              : 'Last update: May 2024. Integral Eléctrica Marbella.'}
          </div>
        </div>
      </div>
    </div>
  )
}
