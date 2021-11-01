module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-light':'#F8F8FB',
        'sidebar': '#252945',
        'purple': '#7C5DFA',
        'purple-light': '#9277FF',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'), // import tailwind forms
  ],
}
