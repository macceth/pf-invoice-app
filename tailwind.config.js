module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'app-light': '#F8F8FB',
        'sidebar': '#252945',
        'purple': '#7C5DFA',
        'purple-light': '#9277FF',
        'gray-line': '#888EB0',
        'purple-line': '#7E88C3',
      }
    },
  },
  variants: {
    extend: {
      translate: ['dark'],
      display: ['dark'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'), // import tailwind forms
  ],
}
