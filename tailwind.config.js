const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./pages/*.{js,ts,jsx,tsx}", "./shared/components/**/*.{js,ts,jsx,tsx}", "./shared/layout/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./pages/*.{js,ts,jsx,tsx}", "./shared/components/**/*.{js,ts,jsx,tsx}", "./shared/layout/*.{js,ts,jsx,tsx}"],
  theme: {
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
    },
    fontFamily: {
      sans: ['"PT Sans"', "sans-serif"],
    },
    colors: {
      ...colors,
      one: "#012A36", // purple like
      two: "#29274C",
      three: "#7E52A0",
      four: "#E6BCCD",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
