/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jcb: {
          brand: '#FFD700', // Classic JCB Yellow
          dark: '#1A1A1A',
          black: '#000000',
          gray: '#333333',
        },
        solution: '#F8BB00',
      }
    },
  },
  plugins: [],
}
