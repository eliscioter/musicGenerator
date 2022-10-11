/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      'xs': '300px',
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    },
    extend: {
      colors: {
        'body-black': '#1E1E1E',
        'nav-grey': '#4C4949',
        'button-white': '#D9D9D9',
        'link-text': '#EEB7B7',
      }
    },
  },
  plugins: [],
}
