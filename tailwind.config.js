/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      '1230': {'max': '1230px'},
      '880': {'max': '880px'},
      // '1680': '1680px',
      // '1680': '1680px',
      // '1680': '1680px',
      // '1680': '1680px',
    }
  },
  plugins: [],
}
