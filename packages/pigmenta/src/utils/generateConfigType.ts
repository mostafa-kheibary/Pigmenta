import path from 'path';
import { makeFolder } from './makeFolder.js';
import { writeFile } from 'fs/promises';

export const generateUnionType = async (
	name: string,
	keys: Map<string, string>,
) => {
	let types = 'import { Options, Pallets } from "pigmenta/types";\n';
	types += `export type ${name} = \n`;
	keys.forEach((_value, key) => {
		let keyLine = ` | '${key}' \n`;
		types += keyLine;
	});
	types += ';\n';

	types += `export type Tokens = Record<string, Record<string, PalletKeys>>;\n`;
	types += `export interface Config {
	options: Options;
	pallets: Pallets;
	tokens: Tokens;
}`;
	await makeFolder(path.resolve('./.pigmenta'));
	await writeFile(path.resolve('./.pigmenta/types.d.ts'), types, {
		encoding: 'utf8',
	});
};
