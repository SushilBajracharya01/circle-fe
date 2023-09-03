/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E1D5F2",
          100: "#B6A2D8",
          500: "#7F4BD8",
          600: "#5C1FC4",
          800: "#533F73",
          900: "#442873",
        },
        secondary: {
          400: "#FFB531",
          500: "#FFA300",
          700: "#CC8300",
        },
        success: {
          500: "#40A140",
          800: "#27641B",
        },
        danger: {
          500: "#A14040",
          800: "#641B1B",
        },
      }
    },
  },
  plugins: [],
}