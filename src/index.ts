#!/usr/bin/env node

import { watchFile } from 'fs';
import { initiatePigmentaWithUserPrompt } from './templates/pigmentaInitiator.js';
import { generateThemes } from './generators/index.js';
import { Command } from 'commander';
import path from 'path';

const program = new Command();

program
	.name('pigmenta')
	.description('The Complete Toolkit for App and UI Theming')
	.version('0.0.1');

program
	.command('init')
	.description('Init Pigmenta to your project')
	.action(() => {
		initiatePigmentaWithUserPrompt('./pigmenta.config.js');
	});
program
	.command('watch')
	.description('generate Themes and watch all changes to generate as needed')
	.action(() => {
		generateThemes();
		watchFile(path.resolve('./pigmenta.config.js'), async () =>
			generateThemes(),
		);
	});

await program.parseAsync();
