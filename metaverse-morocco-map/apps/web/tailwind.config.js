/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'mmm-fes-blue': '#0B3C5D',      // الأزرق الفاسي
        'mmm-gold': '#F5C451',          // ذهبي مغربي
        'mmm-clay-red': '#A23E48',      // أحمر طوبي
        'mmm-emerald': '#0E9F6E',       // أخضر زمردي
        'mmm-neon-cyan': '#00E5FF',
        'mmm-neon-violet': '#7C3AED'
      },
      fontFamily: {
        arabic: ['"Tajawal"', '"Cairo"', '"Noto Kufi Arabic"', 'system-ui', 'sans-serif'],
        latin: ['"Poppins"', '"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 16px 2px rgba(0,229,255,0.6)',
      }
    },
  },
  plugins: [],
};