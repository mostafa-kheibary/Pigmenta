import { Options } from '../types.js';

export const createPigmentaConfigFileTemplate = (
	options: Partial<Options>,
) => `/** @type {import('pigmenta/types').Config} */
const pallets = {
  black: "#000",
  white: "#fff",
};

/** @type {import('pigmenta/types').Config} */
export default {
  options: {
    /** Output type: css, scss, tailwind */
    output: "${options.output}",
    /** Load the theme lazily */
    lazy: ${options.lazy},
    /** destination of the generated output file */
    dest: "${options.dest}",
    /** default theme mode */
    default: "light";
  },
  tokens: {
    surface: {
      light: pallets.white,
      dark: pallets.black,
      another: pallets.black,
    },
  },
};
`;
