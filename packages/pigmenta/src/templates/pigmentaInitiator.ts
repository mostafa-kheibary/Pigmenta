import { readFile, writeFile } from 'fs/promises';
import prompts from 'prompts';
import { createPigmentaConfigFileTemplate } from './configTemplate.js';
import { exec } from 'child_process';
import path from 'path';

export const initiatePigmentaWithUserPrompt = async (configPath: string) => {
	const { output } = await prompts({
		type: 'select',
		name: 'output',
		message: "Choose how you want to create your app's theme:",
		choices: [
			{ title: 'Css', value: 'css' },
			{ title: 'Tailwind css', value: 'tailwind' },
		],
		initial: 0,
	});
	const { dest } = await prompts({
		type: 'text',
		name: 'dest',
		initial: './src',
		message: 'location of the generated theme folder ?',
	});
	await writeFile(
		path.resolve(configPath),
		createPigmentaConfigFileTemplate({ dest, output }),
	);
	try {
		let gitIgnore = await readFile(path.resolve('./.gitignore'), {
			encoding: 'utf8',
		});
		gitIgnore += '\n.pigmenta';
		await writeFile(path.resolve('./.gitignore'), gitIgnore, {
			encoding: 'utf8',
		});
	} catch {}

	try {
		console.log('installing pigmenta...');
		exec('npm i pigmenta@latest -y', () => {
			console.log('Pigmenta Initiate Successfully');
		});
	} catch {}
};
