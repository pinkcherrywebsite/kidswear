import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef1f7',
          100: '#fee5f0',
          200: '#fecce3',
          300: '#ffa3cc',
          400: '#ff69aa',
          500: '#fb3a8b',
          600: '#ea1a6b',
          700: '#cc0d52',
          800: '#a80f45',
          900: '#8c123c',
          DEFAULT: '#ffa3cc', // Soft pink
        },
        secondary: {
          50: '#fefdfb',
          100: '#fdfbf7',
          200: '#fbf7ef',
          300: '#f9f3e7',
          400: '#f5ebdb',
          500: '#f0e3cf',
          DEFAULT: '#fefdfb', // Cream/white
        },
        accent: {
          DEFAULT: '#ff69aa',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config




