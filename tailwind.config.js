/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'height': 'height'
      },
      animation: {
        'infinite-scroll1': 'infinite-scroll1 20s linear infinite',
        'infinite-scroll2': 'infinite-scroll2 3s linear infinite',
      },
      keyframes: {
        'infinite-scroll1': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(0px - 50%))' },
        },
        'infinite-scroll2': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        }
      } 
      
    },
    colors:{
      'black-light':'#24232c',
      'text': '#141105',
      'background': '#fefaec',
      'background-1':'#CED5C6',
      'background-2':'#9EB2A6',
      'background-3':'#718E8B',
      'background-4':'#4B6B72',
      'background-5':'#2F4858',
      'primary': '#1392cb',
      'secondary': '#b2bfeb',
      'accent': '#4e2ca5',
      'accent-comp':'#A69C2D',
      'accent-comp-dark':'#595306',
      'accent-dark':'#240F59',
      'hazard':'#d41d6d',
      'white':'#fff',
      'white-accent':'#f7f7f7',
      'bg-jobs':'#f7fafc'
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
