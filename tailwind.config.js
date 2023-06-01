/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    // ...
  ],
  theme: {
    colors: {
      thegreen: '#329397',
      thegreener: '#3A6777',
      thered: '#673446',
      thedarkred: '#2E1330',
      thedarkgreen: '#3A6777',
      theorange: '#E3933D',
      theblue: '#132A8D',
      thepurple: '#97067B',
      theblack: '#000',
      thewhite: '#FFF',
      theredbtn: '#EB251E',
      thelightblue: '#02ADEE',
      thegreenbtn: '#138B00',
      thelight: '#A8BA96',
    },
    extend: {
      extend: {
        animation: {
          glowing: 'glowing 2s infinite',
        },
      },
    },
  },
  plugins: [],
};
