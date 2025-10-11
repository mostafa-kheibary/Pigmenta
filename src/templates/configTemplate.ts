import { Options } from '../types.js';

export const createPigmentaConfigFileTemplate = (
	options: Partial<Options>,
) => `/** @type {import('pigmenta/types').Config} */
export default {
  options: {
    output: "${options.output}",
    lazy: ${options.lazy},
    dest: "${options.dest}",
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
`;
