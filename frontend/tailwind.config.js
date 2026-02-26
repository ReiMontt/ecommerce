/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Adding your Inter Tight font here
        sans: ['"Inter Tight"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}