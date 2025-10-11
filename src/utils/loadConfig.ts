import { readFile } from 'fs/promises';
import { Config } from '../types.js';

export const loadConfig = async (path: string) => {
	const configText = await readFile(path, {
		encoding: 'utf8',
	});

	const base64 = Buffer.from(configText).toString('base64');
	const module = await import(`data:text/javascript;base64,${base64}`);
	return module.default as Config;
};
