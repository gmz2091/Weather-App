const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    screens: {
      xs: "320px",
      xm: "540px",
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
