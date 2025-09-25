/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        dark: {
          900: '#0a0a0a',
          800: '#1f1f1f',
          700: '#2d2d2d',
          600: '#3d3d3d',
        }
      },
    },
  },
  plugins: [],
}