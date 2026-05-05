/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electric: {
          50:  '#f0fdf0',
          100: '#d6f5d6',
          200: '#a8e6a8',
          300: '#6bc96b',
          400: '#3aa83a',
          500: '#1e8c1e',
          600: '#176817',
          700: '#115211',
          800: '#0c3d0c',
          900: '#082908',
          950: '#041404',
        },
        dark: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        }
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':       'fadeIn 0.8s ease-out forwards',
        'slide-up':      'slideUp 0.7s ease-out forwards',
        'slide-right':   'slideRight 0.7s ease-out forwards',
        'pulse-glow':    'pulseGlow 2.5s ease-in-out infinite',
        'float':         'float 6s ease-in-out infinite',
        'spin-slow':     'spin 12s linear infinite',
        'blob':          'blob 7s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px 2px rgba(34,197,94,0.3)' },
          '50%':      { boxShadow: '0 0 40px 8px rgba(34,197,94,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-electric':   'linear-gradient(135deg, #1e8c1e 0%, #176817 100%)',
        'grid-pattern':        "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='%231e8c1e' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        'dots-pattern':        "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='0.6' fill='%231e8c1e' fill-opacity='0.15'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'electric':      '0 10px 30px -10px rgba(30,140,30,0.5)',
        'electric-lg':   '0 20px 50px -15px rgba(30,140,30,0.4)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
