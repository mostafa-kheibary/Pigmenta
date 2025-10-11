import { loadConfig } from '../utils/loadConfig.js';
import { cssGenerator } from './cssGenerator.js';
import { sassGenerator } from './sassGenerator.js';
import { tailwindGenerator } from './tailwindGenerator.js';

export const generateThemes = async () => {
	const { tokens, pallets, options } = await loadConfig('./pigmenta.config.js');

	if (options.output === 'css') return cssGenerator(options, tokens, pallets);
	if (options.output === 'scss') return sassGenerator();
	if (options.output === 'tailwind') return tailwindGenerator();
};
