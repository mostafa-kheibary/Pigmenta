import { writeFile } from 'fs/promises';
import prompts from 'prompts';
import { createPigmentaConfigFileTemplate } from './configTemplate.js';
import path from 'path';

export const initiatePigmentaWithUserPrompt = async (configPath: string) => {
	const { output } = await prompts({
		type: 'select',
		name: 'output',
		message: "Choose how you want to create your app's theme:",
		choices: [
			{ title: 'Css', value: 'css' },
			{ title: 'Sass', value: 'sass' },
			{ title: 'Tailwind css', value: 'tailwind' },
		],
		initial: 0,
	});
	const { lazy } = await prompts({
		type: 'toggle',
		name: 'lazy',
		message: 'Lazy load the themes?',
		initial: true,
		active: 'Enabled',
		inactive: 'Disabled',
	});
	const { dest } = await prompts({
		type: 'text',
		name: 'dest',
		initial: './src',
		message: 'location of the generated theme folder ?',
	});
	await writeFile(
		path.resolve(configPath),
		createPigmentaConfigFileTemplate({ dest, lazy, output }),
	);
	console.log('Pigmenta Initiate Successfully');
};
