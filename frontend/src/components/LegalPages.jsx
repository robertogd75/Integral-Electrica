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
        { subtitle: '¿Qué son las cookies?', content: 'Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.' },
        { subtitle: 'Cookies utilizadas en este sitio', content: 'Este sitio web utiliza únicamente cookies técnicas estrictamente necesarias para su funcionamiento: (1) cookie-consent — guarda tu decisión sobre el uso de cookies (aceptadas o rechazadas); (2) lang — recuerda el idioma seleccionado. Estas cookies son imprescindibles y no requieren tu consentimiento previo. No utilizamos cookies analíticas, de publicidad ni de terceros.' },
        { subtitle: 'Cómo gestionar tu consentimiento', content: 'Al acceder a la web por primera vez, aparecerá un aviso donde podrás Aceptar o Rechazar las cookies no esenciales. Tu elección queda guardada en tu navegador. Puedes cambiarla en cualquier momento borrando las cookies del navegador (lo que hará aparecer el aviso de nuevo) o mediante la configuración del mismo.' },
        { subtitle: 'Cómo desactivar las cookies desde el navegador', content: 'Puedes configurar tu navegador para bloquear o eliminar cookies: en Chrome ve a Ajustes > Privacidad y seguridad > Cookies; en Firefox ve a Opciones > Privacidad y seguridad; en Safari ve a Preferencias > Privacidad. Ten en cuenta que bloquear las cookies técnicas puede afectar al funcionamiento del sitio.' },
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
        { subtitle: 'What are cookies?', content: 'A cookie is a file downloaded to your computer when accessing certain websites. Cookies allow a website to store and retrieve information about the browsing habits of a user or their device and, depending on the information they contain and how you use your device, they can be used to recognise the user.' },
        { subtitle: 'Cookies used on this site', content: 'This website only uses strictly necessary technical cookies: (1) cookie-consent — stores your decision about cookie use (accepted or rejected); (2) lang — remembers your selected language. These cookies are essential and do not require your prior consent. We do not use analytics, advertising or third-party cookies.' },
        { subtitle: 'How to manage your consent', content: 'When you first visit the website, a notice will appear where you can Accept or Reject non-essential cookies. Your choice is saved in your browser. You can change it at any time by clearing your browser cookies (which will show the notice again) or through your browser settings.' },
        { subtitle: 'How to disable cookies via your browser', content: 'You can configure your browser to block or delete cookies: in Chrome go to Settings > Privacy and security > Cookies; in Firefox go to Options > Privacy and Security; in Safari go to Preferences > Privacy. Please note that blocking technical cookies may affect the functionality of the site.' },
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
