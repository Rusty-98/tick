/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        madimiOne : ["Madimi One", "sans-serif"],
        lemon : ["Lemon", "sans-serif"],
      }
    },
  },
  plugins: [],
}

