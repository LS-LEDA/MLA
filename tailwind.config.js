module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // These CSS variables are in index.css app stylesheet
        primary: 'var(--primary)',
        primary_variant: 'var(--primary_variant)',
        secondary: 'var(--secondary)',
        secondary_variant: 'var(--secondary_variant)',
        background: 'var(--background)',
        typography: 'var(--typography)',
        dark_primary: 'var(--dark_primary)',
        dark_primary_variant: 'var(--dark_primary_variant)',
        dark_secondary: 'var(--dark_secondary)',
        dark_secondary_variant: 'var(--dark_secondary_variant)',
        dark_background: 'var(--dark_background)',
        dark_typography: 'var(--dark_typography)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
