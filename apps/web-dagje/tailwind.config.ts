import type { Config } from 'tailwindcss';
import preset from '@utrecht/ui/tailwind-preset';

export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Zelfde kleuren als stepverhuurutrecht.nl
      colors: {
        zee: {
          50: '#ecfafd',
          100: '#caf3fc',
          200: '#98e8fb',
          300: '#4cd9fa',
          400: '#00c2f0',
          500: '#009dc2',
          600: '#0084a3',
          700: '#006b85',
        },
        vlam: {
          50: '#fef4eb',
          100: '#fdddc3',
          200: '#fcc192',
          400: '#ff7200',
          500: '#e06400',
          600: '#bd5400',
          700: '#994400',
        },
        zon: {
          100: '#ffe8d6',
          300: '#ffb070',
          400: '#ff8e33',
        },
        inkt: {
          DEFAULT: '#07323c',
          700: '#104d5b',
        },
        grijs: '#516367',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        logo: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
} satisfies Config;
