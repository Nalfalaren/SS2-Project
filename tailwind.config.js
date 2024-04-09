/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
  ],
  theme: {
    extend: {
      colors: {
        mantis: {
          50: "#f2fbf3",
          100: "#e1f7e2",
          200: "#c4eec8",
          300: "#95e09c",
          400: "#5ec869",
          500: "#3aad46",
          600: "#2a8f35",
          700: "#25702d",
          800: "#215a28",
          900: "#1d4a23",
          950: "#0b280f",
        },
      },
    },
  },
  plugins: [],
};
