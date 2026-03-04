/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          950: '#0a0a0f',
          900: '#111118',
          800: '#1a1a24',
          700: '#252532',
          600: '#323244',
        },
        accent: {
          DEFAULT: '#7c6af7',
          light: '#a89df9',
          glow: 'rgba(124,106,247,0.15)',
        },
        jade: '#2dd4a0',
        amber: '#f59e0b',
        rose: '#f43f5e',
        sky: '#38bdf8',
      },
    },
  },
  plugins: [],
}