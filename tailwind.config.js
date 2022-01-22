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
        dark_primary: colors.slate['500'],
        dark_primary_variant: colors.slate['700'],
        dark_secondary: colors.slate['800'],
        dark_secondary_variant: colors.slate['500'],
        dark_background: colors.slate['900'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
