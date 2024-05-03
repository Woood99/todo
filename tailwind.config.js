/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,css,scss}"],
  theme: {
    extend: {
      screens: {
        'md1': {'max': '1300px'},  
        'md2': {'max': '1024px'},
        'md3': {'max': '768px'},
        'md4': {'max': '576px'},
      }
    },
  },
  plugins: [],
}

