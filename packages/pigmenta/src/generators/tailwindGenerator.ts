import path from 'path';
import fs from 'fs/promises';
import { Options, Tokens } from '../types.js';

export const tailwindGenerator = async (
	options: Options,
	tokens: Tokens,
	pallets: Map<string, string>,
) => {
	let tokensVarsCss = '';

	tokensVarsCss += '@import "tailwindcss";\n\n';

	const tokensKey = Object.keys(tokens);
	if (tokensKey.length === 0) return;

	const themes = Object.keys(tokens[tokensKey[0]]);
	const defaultThemeIndex = themes.findIndex((theme) => theme === options.default);
	themes.splice(defaultThemeIndex, 1);

	tokensVarsCss += '@theme {\n';
	for (const token in tokens) {
		let tokenName = token;
		if (options.tokenPrefix) tokenName = `${options.tokenPrefix}-${token}`;
		tokensVarsCss += `	--${tokenName}: ${pallets.get(tokens[token][options.default])};\n`;
	}
	tokensVarsCss += '}\n';

	tokensVarsCss += '@layer theme {\n';
	for (const theme of themes) {
		tokensVarsCss += `  .${theme} {\n`;
		for (const token in tokens) {
			let tokenName = token;
			if (options.tokenPrefix) tokenName = `color-${options.tokenPrefix}-${token}`;
			tokensVarsCss += `  	--${tokenName}: ${pallets.get(tokens[token][theme])};\n`;
		}
		tokensVarsCss += '  }\n';
	}
	tokensVarsCss += '}\n';

	await fs.writeFile(path.join(options.dest, './theme.css'), tokensVarsCss, {
		encoding: 'utf8',
	});
};
