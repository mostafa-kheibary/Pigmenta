import path from 'path';
import fs from 'fs/promises';
import { Options, Pallets, Tokens } from '../types.js';

export const cssGenerator = async (
	options: Options,
	tokens: Tokens,
	pallets: Pallets,
) => {
	let palletsVarsCss = '';
	let tokensVarsCss = '';

	palletsVarsCss += ':root {\n';
	for (const pallet in pallets) {
		palletsVarsCss += `	--pt-${pallet}: ${pallets[pallet]};\n`;
	}
	palletsVarsCss += '}\n';

	const tokensKey = Object.keys(tokens);
	const themes = Object.keys(tokens[tokensKey[0]]);

	for (const theme of themes) {
		tokensVarsCss += `.${theme} {\n`;
		for (const token in tokens) {
			tokensVarsCss += `	--${token}: var(--pt-${tokens[token][theme]});\n`;
		}
		tokensVarsCss += '}\n';
	}

	const destinationPath = path.join(options.dest, './theme');
	try {
		await fs.readdir(destinationPath);
	} catch (error) {
		if (error.code === 'ENOENT') await fs.mkdir(destinationPath);
	}

	await fs.writeFile(
		path.join(destinationPath, './pallets.css'),
		palletsVarsCss,
		{ encoding: 'utf8' },
	);

	await fs.writeFile(
		path.join(destinationPath, './tokens.css'),
		tokensVarsCss,
		{ encoding: 'utf8' },
	);
};
