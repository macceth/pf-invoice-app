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
      },
      boxShadow: {
        't-sm': '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
        't-md': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        't-lg': '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        't-xl': '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        't-2xl': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
        't-3xl': '0 -35px 60px -15px rgba(0, 0, 0, 0.3)',
      }, 
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
