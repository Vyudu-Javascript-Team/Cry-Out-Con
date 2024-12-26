/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Founders Grotesk Condensed',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'Liberation Sans',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          'Segoe UI Symbol',
          '"Noto Color Emoji"'
        ],
      },
      colors: {
        primary: '#0f0f2a',
        secondary: '#1a1a3a',
        'purple-glow': '#7b1fa2',
        'blue-glow': '#2054ca',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(123, 31, 162, 0.3)',
        'glow': '0 0 25px rgba(123, 31, 162, 0.4)',
        'glow-lg': '0 0 35px rgba(123, 31, 162, 0.5)',
        'glow-xl': '0 0 50px rgba(123, 31, 162, 0.6)',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backdropFilter: ['responsive'],
    },
  },
};