/** @type {import('pigmenta/types').Config} */
export default {
  options: {
    output: "tailwind",
    dest: "./src",
    default: "light"
  },
  pallets: {
    black: "#000",
    white: "#fff"
  },
  tokens: {
    surface: {
      light: "white",
      dark: "black",
      another: "black",
    },
  },
};
