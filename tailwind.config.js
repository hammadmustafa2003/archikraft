/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark-gray': '#404040',
      },
      textColor: {
        'white': '#ffffff',
      },
    },
  },
  plugins: [],
}

