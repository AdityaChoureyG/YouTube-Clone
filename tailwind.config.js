/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'roboto' is the class name you'll use (font-roboto)
        // The array contains the fallback fonts
        roboto: ['Roboto', 'Arial', 'sans-serif'],
      },
      screens: {
        'xs': '528px', // Adds a new 'xs' breakpoint
      },
    },
  },
  plugins: [],
}