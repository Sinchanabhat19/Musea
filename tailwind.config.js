/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          50: '#fef9e7',
          100: '#fdf1c7',
          200: '#fbe392',
          300: '#f9d35d',
          400: '#f7c433',
          500: '#f5a10a',
          600: '#db7d08',
          700: '#b55a0c',
          800: '#914611',
          900: '#763a13',
          950: '#461e09',
        },
        gallery: {
          900: '#121212',
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#323232',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};