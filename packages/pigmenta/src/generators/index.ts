import { flatPallets } from '../utils/flatPallets.js';
import { generateUnionType } from '../utils/generateConfigType.js';
import { loadConfig } from '../utils/loadConfig.js';
import { cssGenerator } from './cssGenerator.js';
import { tailwindGenerator } from './tailwindGenerator.js';

export const generateThemes = async () => {
	console.log('Reloading Themes ...');
	const { tokens, pallets, options } = await loadConfig('./pigmenta.config.js');

	const flatPalletsArray = flatPallets(pallets);
	await generateUnionType(flatPalletsArray);
	if (!options) return;
	if (options.output === 'css') await cssGenerator(options, tokens, flatPalletsArray);
	if (options.output === 'tailwind') await tailwindGenerator(options, tokens, flatPalletsArray);

	console.log('Theme Generated Successfully');
};
