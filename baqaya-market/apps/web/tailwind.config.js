/**** Tailwind config for Next.js app ****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#11a36a',
          dark: '#0e8053',
          light: '#4fc69e'
        }
      }
    },
  },
  plugins: [],
};
