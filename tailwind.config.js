/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    colors: {
      black: {
        100: '#111111',
        200: '#1B232F',
      },
      white: {
        100: '#F1F5F9',
      },
      blue: {
        100: '#3A5F7E',
        200: '#1E293B',
        300: '#0F172A',
        400: '#10141E',
        500: '#283444',
      },
      gray: {
        100: '#94A3B8',
      },
      red: {
        100: '#CC333D',
      },
    },
  },
  plugins: [],
};
