import type { Config } from 'tailwindcss';

/**
 * Elikem design tokens.
 * Palette + type scale are intentionally restrained: a corporate, healthcare-grade
 * blue system on white/gray, with a single warm accent reserved for alerts.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          50: '#EAF2FE',
          100: '#D0E3FC',
          200: '#A1C7F9',
          300: '#72AAF6',
          400: '#438EF3',
          500: '#0066CC',
          600: '#0057AD',
          700: '#00478E',
          800: '#00376E',
          900: '#00274F',
        },
        secondary: {
          DEFAULT: '#00AEEF',
          50: '#E6F8FE',
          100: '#CCF1FD',
          200: '#99E3FB',
          300: '#66D5F9',
          400: '#33C7F7',
          500: '#00AEEF',
          600: '#008BBF',
          700: '#00688F',
          800: '#004660',
          900: '#002330',
        },
        surface: {
          white: '#FFFFFF',
          light: '#F5F7FA',
          border: '#E2E8F0',
        },
        ink: {
          DEFAULT: '#1A2332',
          soft: '#4A5568',
          muted: '#8A94A6',
        },
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(16, 24, 40, 0.06)',
        card: '0 4px 20px rgba(16, 24, 40, 0.08)',
        elevated: '0 12px 40px rgba(0, 102, 204, 0.12)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-line': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'pulse-line': 'pulse-line 2.4s ease-out forwards',
      },
      backgroundImage: {
        'hero-grid':
          'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
