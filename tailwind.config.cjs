/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'handLetter': ['Solitreo', 'cursive']
    },
    extend: {
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      minWidth: {
        '1/3': '10.88%;',
        '80': '80%',
        '1/8': '12.50%',
        '1/2': '50%',
        '1/6': '16.66667%'
      },
      flex: {
        '3': '3 3 0%'
      },
      height: {
        '90': '90%',
        '70': '70%',
        '10': '10%',
        '68': '16.5rem',
      },
      minHeight: {
        '1/6': '16.6666666667%'
      },
      borderWidth: {
        '1': '1px'
      },
      flex: {
        'flex-card': '0 0 10%'
      }
    },
  },
  plugins: [],
}