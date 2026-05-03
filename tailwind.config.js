/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        fire:   '#e84118',
        ember:  '#f0932b',
        coal:   '#c0300e',
        gold:   '#ffd060',
        dark:   '#131009',
        card:   '#1d1814',
        card2:  '#252018',
        muted:  '#9a9088',
        border: 'rgba(232,65,24,0.18)',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        sans:    ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'fire-gradient':  'linear-gradient(135deg, #e84118 0%, #f0932b 100%)',
        'forge-gradient': 'linear-gradient(135deg, #c0300e 0%, #e84118 45%, #f07020 100%)',
      },
      boxShadow: {
        'fire-sm': '0 0 20px rgba(232,65,24,0.25)',
        'fire-md': '0 0 40px rgba(232,65,24,0.3)',
        'fire-lg': '0 0 80px rgba(232,65,24,0.2)',
        'card':    '0 8px 40px rgba(0,0,0,0.5)',
      },
      keyframes: {
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer:   { '0%': { backgroundPosition: '150% 0' }, '100%': { backgroundPosition: '-50% 0' } },
        fireReveal:{ '0%,6%': { clipPath: 'inset(0 100% 0 0)' }, '22%,58%': { clipPath: 'inset(0 0% 0 0)' }, '72%,100%': { clipPath: 'inset(0 100% 0 0)' } },
      },
      animation: {
        float:      'float 6s ease-in-out infinite',
        shimmer:    'shimmer 3s ease-in-out infinite',
        fireReveal: 'fireReveal 5s cubic-bezier(0.42,0,0.38,1) infinite',
      },
    },
  },
  plugins: [],
}
