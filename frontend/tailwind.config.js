/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ['class', '[data-theme="dark"]'], // Ties into your existing theme toggle
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        primaryHover: '#0056b3',
        darkBg: '#121212',
        darkCard: '#1e1e1e',
      }
    },
  },
  plugins:[],
}