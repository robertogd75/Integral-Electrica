import { useState, useEffect } from 'react'
import { useTranslation } from '../LanguageContext'

export default function CookiesBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  }

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-xl">
      <div className="bg-white/80 backdrop-blur-md border border-white/40 shadow-2xl rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 animate-slideUp">
        <div className="flex-shrink-0 w-12 h-12 bg-electric-50 rounded-full flex items-center justify-center text-2xl shadow-inner">
          🍪
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-slate-600 text-sm md:text-base leading-snug">
            {t.cookies.msg}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={reject}
            className="py-2.5 px-5 text-sm font-medium text-slate-500 border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap w-full sm:w-auto"
          >
            {t.cookies.reject}
          </button>
          <button 
            onClick={accept}
            className="btn-primary py-2.5 px-6 text-sm shadow-electric whitespace-nowrap w-full sm:w-auto"
          >
            {t.cookies.accept}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
