import { Config } from '../types';

export const loadConfig = async (text: string) => {
	const base64 = Buffer.from(text).toString('base64');
	const module = await import(`data:text/javascript;base64,${base64}`);
	return module.default as Config;
};
