import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  es: {
    nav: {
      inicio: 'Inicio',
      servicios: 'Servicios',
      nosotros: 'Nosotros',
      contacto: 'Contacto',
      cta: 'Llamar ahora',
    },
    hero: {
      badge: 'Marbella · Costa del Sol',
      title1: 'Tu electricista,',
      title2: 'Integral Eléctrica.',
      sub: 'Electricistas certificados en Marbella. Instalaciones, boletines y mucho más.',
      subHighlight: ' Rapidez, seguridad y garantía.',
      cta1: 'Solicitar presupuesto',
      cta2: 'Escribir por WhatsApp',
      cta3: 'Llamar ahora',
      trust: [
        { icon: '🏅', label: 'Instaladores Certificados' },
        { icon: '📋', label: 'Boletines Oficiales' },
        { icon: '🛡️', label: 'Garantía de Trabajo' },
      ],
    },
    services: {
      tag: 'Nuestros Servicios',
      title1: 'Todo lo que necesitas,',
      title2: 'en un solo equipo.',
      sub: 'Ofrecemos soluciones eléctricas integrales para particulares, comunidades y empresas en Marbella y toda la Costa del Sol.',
      cta: '¿No encuentras lo que buscas?',
      ctaBtn: 'Consulta personalizada gratuita',
      list: [
        {
          id: 'instalaciones',
          title: 'Instalaciones Eléctricas',
          desc: 'Nuevas instalaciones residenciales, comerciales e industriales. Cuadros eléctricos, cableado completo y puesta en marcha.',
          tag: 'Residencial · Comercial',
        },
        {
          id: 'boletines',
          title: 'Boletines Eléctricos',
          desc: 'Tramitación de boletines oficiales ante Endesa y la Junta de Andalucía. Legalizaciones y certificados de instalación.',
          tag: 'Legalización · Certificados',
        },
        {
          id: 'domotica',
          title: 'Domótica e Inteligencia',
          desc: 'Automatización del hogar: iluminación inteligente, persianas, climatización y sistemas de seguridad integrados.',
          tag: 'Smart Home · KNX',
        },
        {
          id: 'mantenimiento',
          title: 'Mantenimiento Preventivo',
          desc: 'Revisiones periódicas, contratos de mantenimiento para comunidades y empresas. Detección temprana de fallos.',
          tag: 'Comunidades · Empresas',
        },
      ],
    },
    about: {
      tag: 'Quiénes Somos',
      title1: 'Más de 30 años',
      title2: 'iluminando Marbella.',
      desc1: 'Somos un equipo de electricistas titulados con sede en Marbella, especializados en todo tipo de instalaciones eléctricas para particulares, comunidades de vecinos y empresas de la Costa del Sol.',
      desc2: 'Nuestra filosofía es simple: trabajo bien hecho, a tiempo y con transparencia total en precios. Sin sorpresas, sin letras pequeñas.',
      values: [
        { title: 'Seguridad Certificada', desc: 'Todos nuestros trabajos cumplen con el Reglamento Electrotécnico para Baja Tensión (REBT).' },
        { title: 'Calidad Garantizada', desc: 'Usamos materiales de primera calidad y ofrecemos garantía en todos nuestros trabajos.' },
        { title: 'Soluciones Integrales', desc: 'Desde el proyecto hasta la legalización. Un único equipo para todo el proceso.' },
      ],
      stats: [
        { value: 30, suffix: '+', label: 'Años de experiencia' },
        { value: 1200, suffix: '+', label: 'Proyectos completados' },
        { value: 98, suffix: '%', label: 'Clientes satisfechos' },
      ],
      team: 'Equipo certificado REBT',
      auth: 'Empresa autorizada por la Junta de Andalucía',
      certs: [
        { label: 'Instalador Autorizado', sub: 'Ministerio de Industria' },
        { label: 'Seguro de Responsabilidad', sub: 'RC Civil Incluido' },
      ],
    },
    contact: {
      tag: 'Contacto',
      title1: 'Cuéntanos tu proyecto.',
      title2: 'Respondemos en menos de 24h.',
      sub: 'Rellena el formulario y nuestro equipo se pondrá en contacto contigo para ofrecerte presupuesto sin compromiso.',
      info: {
        phone: 'Teléfono',
        email: 'Email',
        location: 'Ubicación',
        horario: 'Horario',
        horarioVal: 'Lun–Vie 8:00–15:00',
      },
      form: {
        name: 'Nombre *',
        email: 'Email *',
        phone: 'Teléfono',
        service: 'Servicio de interés',
        servicePlaceholder: 'Seleccionar servicio...',
        message: 'Mensaje *',
        placeholderName: 'Juan García',
        placeholderEmail: 'juan@ejemplo.com',
        placeholderMessage: 'Describe brevemente tu proyecto o necesidad...',
        submit: 'Enviar solicitud',
        sending: 'Enviando...',
        successTitle: '¡Mensaje enviado!',
        successMsg: '¡Gracias! Hemos recibido tu mensaje. Te contactamos pronto.',
        another: 'Enviar otro mensaje',
        error: 'No se pudo enviar el mensaje. Por favor, llámanos directamente.',
        privacy: 'Al enviar aceptas nuestra política de privacidad. No enviamos spam.',
      },
      services: {
        instalaciones: 'Instalaciones eléctricas',
        boletines: 'Boletines eléctricos',
        domotica: 'Domótica',
        mantenimiento: 'Mantenimiento',
        otro: 'Otro',
      },
    },
    footer: {
      desc: 'Electricistas certificados en Marbella y la Costa del Sol. Instalaciones y boletines.',
      groups: {
        servicios: 'Servicios',
        legal: 'Legal',
      },
      serviciosList: [
        { label: 'Instalaciones Eléctricas', href: '#servicios' },
        { label: 'Boletines Oficiales', href: '#servicios' },
        { label: 'Domótica', href: '#servicios' },
        { label: 'Mantenimiento', href: '#servicios' },
      ],
      legalList: [
        { label: 'Aviso Legal', href: '/aviso-legal' },
        { label: 'Política de Privacidad', href: '/privacidad' },
        { label: 'Política de Cookies', href: '/cookies' },
      ],
      quick: 'Contacto Rápido',
      rights: 'Todos los derechos reservados.',
      powered: 'Desarrollado por',
    },
    cookies: {
      msg: 'Utilizamos cookies técnicas para el funcionamiento de la web. Puedes aceptar o rechazar las cookies no esenciales.',
      accept: 'Aceptar',
      reject: 'Rechazar',
      settings: 'Configurar',
    }
  },
  en: {
    nav: {
      inicio: 'Home',
      servicios: 'Services',
      nosotros: 'About Us',
      contacto: 'Contact',
      cta: 'Call now',
    },
    hero: {
      badge: 'Marbella · Costa del Sol',
      title1: 'Your electrician,',
      title2: 'Integral Eléctrica.',
      sub: 'Certified electricians in Marbella. Installations, certificates and much more.',
      subHighlight: ' Speed, safety and guarantee.',
      cta1: 'Request a quote',
      cta2: 'WhatsApp us',
      cta3: 'Call now',
      trust: [
        { icon: '🏅', label: 'Certified Installers' },
        { icon: '📋', label: 'Official Certificates' },
        { icon: '🛡️', label: 'Work Guarantee' },
      ],
    },
    services: {
      tag: 'Our Services',
      title1: 'Everything you need,',
      title2: 'in a single team.',
      sub: 'We offer comprehensive electrical solutions for individuals, residential communities and businesses in Marbella and across the Costa del Sol.',
      cta: "Can't find what you're looking for?",
      ctaBtn: 'Free personalized consultation',
      list: [
        {
          id: 'instalaciones',
          title: 'Electrical Installations',
          desc: 'New residential, commercial and industrial installations. Electrical panels, complete wiring and commissioning.',
          tag: 'Residential · Commercial',
        },
        {
          id: 'boletines',
          title: 'Electrical Certificates',
          desc: 'Processing of official certificates with Endesa and the Junta de Andalucía. Legalizations and installation certificates.',
          tag: 'Legalization · Certificates',
        },
        {
          id: 'domotica',
          title: 'Home Automation & Intelligence',
          desc: 'Home automation: smart lighting, blinds, climate control and integrated security systems.',
          tag: 'Smart Home · KNX',
        },
        {
          id: 'mantenimiento',
          title: 'Preventive Maintenance',
          desc: 'Periodic reviews, maintenance contracts for communities and companies. Early failure detection.',
          tag: 'Communities · Companies',
        },
      ],
    },
    about: {
      tag: 'About Us',
      title1: 'Over 30 years',
      title2: 'lighting up Marbella.',
      desc1: 'We are a team of qualified electricians based in Marbella, specializing in all types of electrical installations for individuals, neighborhood communities and businesses on the Costa del Sol.',
      desc2: 'Our philosophy is simple: work well done, on time and with total price transparency. No surprises, no small print.',
      values: [
        { title: 'Certified Safety', desc: 'All our work complies with the Low Voltage Electrotechnical Regulations (REBT).' },
        { title: 'Guaranteed Quality', desc: 'We use premium quality materials and offer a guarantee on all our work.' },
        { title: 'Comprehensive Solutions', desc: 'From the project to the legalization. A single team for the entire process.' },
      ],
      stats: [
        { value: 30, suffix: '+', label: 'Years of experience' },
        { value: 1200, suffix: '+', label: 'Completed projects' },
        { value: 98, suffix: '%', label: 'Satisfied customers' },
      ],
      team: 'REBT certified team',
      auth: 'Company authorized by the Junta de Andalucía',
      certs: [
        { label: 'Authorized Installer', sub: 'Ministry of Industry' },
        { label: 'Liability Insurance', sub: 'Civil Liability Included' },
      ],
    },
    contact: {
      tag: 'Contact',
      title1: 'Tell us about your project.',
      title2: 'We respond in less than 24h.',
      sub: 'Fill out the form and our team will get in touch with you to offer a no-obligation quote.',
      info: {
        phone: 'Phone',
        email: 'Email',
        location: 'Location',
        horario: 'Schedule',
        horarioVal: 'Mon–Fri 8:00–15:00',
      },
      form: {
        name: 'Name *',
        email: 'Email *',
        phone: 'Phone',
        service: 'Service of interest',
        servicePlaceholder: 'Select service...',
        message: 'Message *',
        placeholderName: 'John Doe',
        placeholderEmail: 'john@example.com',
        placeholderMessage: 'Briefly describe your project or need...',
        submit: 'Send request',
        sending: 'Sending...',
        successTitle: 'Message sent!',
        successMsg: 'Thank you! We have received your message. We will contact you soon.',
        another: 'Send another message',
        error: 'The message could not be sent. Please call us directly.',
        privacy: 'By sending you accept our privacy policy. We do not send spam.',
      },
      services: {
        instalaciones: 'Electrical installations',
        boletines: 'Electrical certificates',
        domotica: 'Home automation',
        mantenimiento: 'Maintenance',
        otro: 'Other',
      },
    },
    footer: {
      desc: 'Certified electricians in Marbella and the Costa del Sol. Installations and certificates.',
      groups: {
        servicios: 'Services',
        legal: 'Legal',
      },
      serviciosList: [
        { label: 'Electrical Installations', href: '#servicios' },
        { label: 'Official Certificates', href: '#servicios' },
        { label: 'Home Automation', href: '#servicios' },
        { label: 'Maintenance', href: '#servicios' },
      ],
      legalList: [
        { label: 'Legal Notice', href: '/aviso-legal' },
        { label: 'Privacy Policy', href: '/privacidad' },
        { label: 'Cookies Policy', href: '/cookies' },
      ],
      quick: 'Quick Contact',
      rights: 'All rights reserved.',
      powered: 'Developed by',
    },
    cookies: {
      msg: 'We use technical cookies for website functionality. You can accept or reject non-essential cookies.',
      accept: 'Accept',
      reject: 'Reject',
      settings: 'Settings',
    }
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'es';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
