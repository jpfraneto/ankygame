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
      thepurple: '#774D92',
      theblack: '#000',
      thewhite: '#FFF',
      theredbtn: '#EB251E',
      thegreenbtn: '#138B00',
      thelight: '#A8BA96',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
