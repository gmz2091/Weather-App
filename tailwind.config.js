const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "320px",
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ["Raleway", "sans-serif"],
    },
    colors: {
      white: "#FFFFFF",
      gray: {
        850: "#1E213A",
        860: "#88869D",
        870: "#100E1D",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
