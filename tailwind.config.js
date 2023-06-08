/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Open Sans"],
      serif: ["Playfair"],
      body: ["Roboto Slab"],
      mono: ["Montserrat"],
    },
    extend: {},
  },
  plugins: [],
};
