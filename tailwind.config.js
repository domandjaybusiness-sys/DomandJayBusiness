/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#f8fbff',
        brand: {
          50: '#eef2ff',
          100: '#dbe4ff',
          200: '#becdff',
          300: '#9db4ff',
          400: '#7891ff',
          500: '#4f6ddf',
          600: '#3550b5',
          700: '#263c87',
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 14px 36px rgba(15, 23, 42, 0.08)',
        panel: '0 24px 60px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
}
