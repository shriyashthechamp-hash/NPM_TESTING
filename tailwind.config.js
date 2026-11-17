/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        text: '#ffffff',
        muted: '#8e8e8e',
        lime: {
          DEFAULT: '#D7FF35',
          electric: '#D7FF35',
          glow: '#E2FF66',
          dark: '#9AC600',
          muted: 'rgba(215, 255, 53, 0.15)',
        },
        cobalt: {
          DEFAULT: '#438BFF',
          electric: '#438BFF',
          bright: '#438BFF',
          glow: '#60A5FA',
          deep: '#1D4ED8',
          muted: 'rgba(67, 139, 255, 0.15)',
        },
        midnight: {
          950: '#07090D',
          900: '#0B0D13',
          850: '#10131B',
          800: '#151924',
          750: '#1B202D',
          700: '#23293A',
          600: '#323B52',
          500: '#475373',
          400: '#64748B',
          300: '#94A3B8',
          200: '#CBD5E1',
          100: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'Syne', 'sans-serif'],
        dot: ['"BubbledotICG-FinePos"', '"Geist Pixel Circle"', 'monospace'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(30px)' },
        },
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'mesh-gradient': 'radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.25) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(212, 255, 50, 0.15) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(37, 99, 235, 0.15) 0px, transparent 50%)',
      },
      boxShadow: {
        'lime-glow': '0 0 25px -4px rgba(212, 255, 50, 0.35)',
        'cobalt-glow': '0 0 30px -4px rgba(37, 99, 235, 0.4)',
        'subtle-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 1px 1px 0 rgba(255, 255, 255, 0.05) inset',
      },
    },
  },
  plugins: [],
};
