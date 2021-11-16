module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        '1.5': '1.5 1.5 0%',
        '2': '2 2 0%',
        '3': '3 3 0%',
      },
      colors: {
        'app-light': '#F8F8FB',
        'app-dark-1': '#141625',
        'app-dark-2': '#0C0E16',
        'app-dark-3': '#252945',
        'app-dark-4': '#1E2139',
        'app-dark-5': '#363a57',
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
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      fontWeight: ['hover'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'), // import tailwind forms
  ],
}
