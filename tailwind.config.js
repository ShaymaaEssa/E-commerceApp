/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors: {
        primary: '#048ED6', // Replace with your actual color
      },
      fontFamily: {
        titillium: ["'Titillium Web'", "sans-serif"],
        mulish: ["'Mulish'", "sans-serif"],
      },
    },
    container:{
      center: true
    }
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
}

