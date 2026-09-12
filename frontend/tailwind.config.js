// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
        },
        dark: {
          bg: '#0F172A', // Nền chính
          surface: '#1E293B', // Nền card
          hover: '#334155', // Nền hover
          border: '#334155', // Viền
        },
      },
    },
  },
  plugins: [],
};
