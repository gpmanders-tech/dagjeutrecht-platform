/** Shared Tailwind preset — Utrecht stadshuisstijl: rood / wit / zwart. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // "canal" = donkere primaire (was navy → nu zwart/grijs, VVV-stijl)
        canal: {
          DEFAULT: '#111111',
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#cfcfcf',
          300: '#b0b0b0',
          400: '#8a8a8a',
          500: '#5e5e5e',
          600: '#3f3f3f',
          700: '#2a2a2a',
          800: '#1a1a1a',
          900: '#111111',
        },
        // "terracotta" = stadskleur rood (Utrechtse vlag / FC Utrecht / VVV-accent)
        terracotta: {
          DEFAULT: '#E2001A',
          50: '#fff1f3',
          100: '#ffd9de',
          200: '#ffb4be',
          300: '#ff7d8d',
          400: '#ff445c',
          500: '#E2001A',
          600: '#b8001a',
          700: '#8e0014',
        },
        // cream = warm wit voor achtergrond
        cream: {
          DEFAULT: '#FAFAF7',
          50: '#FFFFFF',
          100: '#FAFAF7',
          200: '#F2F2EE',
        },
        // UtrechtIncoming B2B-portaal: navy + oranje blijft (eigen ontwerp)
        incoming: {
          navy: '#1a2e4a',
          orange: '#e85d26',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 24px -8px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
