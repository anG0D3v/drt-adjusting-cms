/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
// to remove the build warning, can be remove in the future
delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["trueGray"];
delete colors["coolGray"];
delete colors["blueGray"];

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "midnight-blue": "#002C37",
        "dark-blue": "#103464",
        "steel-blue": "#0b626b",
        gunmetal: "#28728f",
        "light-aquamarine": "#CFDED7",
        aquamarine: "#92b7a6",
        tangerine: "#FFA500",
        maroon: "#6B0B16",
        "light-gray": "#EAEAEA",
        "shady-white": "#FBFFFD",
        ...colors,
      },
    },
  },
  plugins: [],
};
