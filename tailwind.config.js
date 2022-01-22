const colors = require("tailwindcss/colors");

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.blue['200'],
        primary_variant: colors.blue['300'],
        secondary: colors.white,
        secondary_variant: colors.white,
        background: colors.blue['100'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
