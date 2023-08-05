/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { maxHeight: 0 },
          '100%': { maxHeight: '4rem' }
        },
        slideOut: {
          '0%': { maxHeight: '4rem' },
          '100%': { maxHeight: 0 }
        }
      },
      animation: {
        'slide-in': 'slideIn 0.4s ease-in',
        'slide-out': 'slideOut 0.4s ease-in' 
      }
    },
  },
  plugins: [],
};
