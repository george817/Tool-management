/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          950: '#09090f',
          900: '#0f0f17',
          800: '#16161f',
          700: '#1c1c28',
          600: '#222232',
          500: '#2a2a3d',
        },
        ink: {
          primary: '#ededf5',
          secondary: '#8080a0',
          muted: '#50506a',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        panel: '0 16px 40px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
}
