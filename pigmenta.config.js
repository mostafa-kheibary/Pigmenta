/** @type {import('pigmenta/types').Pallets} */
const pallets = {
  black: "#000",
  white: "#fff",
};

/** @type {import('pigmenta/types').Config} */
export default {
  options: {
    output: "css", // css, scss, tailwind
    lazy: true, // load the theme as needed
    default: "light",
  },
  tokens: {
    surface: {
      light: pallets.white,
      dark: pallets.black,
      another: pallets.black,
    },
  },
};
