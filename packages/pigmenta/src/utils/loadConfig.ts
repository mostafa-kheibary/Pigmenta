import { readFile } from 'fs/promises';
import { Config } from '../types.js';
import path from 'path';

export const loadConfig = async (configPath: string) => {
	const configText = await readFile(path.resolve(configPath), {
		encoding: 'utf8',
	});

	const base64 = Buffer.from(configText).toString('base64');
	const module = (await import(`data:text/javascript;base64,${base64}`)).default as Config;

	let pallets = {};
	let tokens = {};

	if (module.options?.extend) {
		for (const extensionPath of module.options.extend) {
			const config = await loadConfig(extensionPath);
			pallets = { ...pallets, ...config.pallets };
			tokens = { ...tokens, ...config.tokens };
		}
	}
	module.pallets = { ...pallets, ...module.pallets };
	module.tokens = { ...tokens, ...module.tokens };
	return module;
};
