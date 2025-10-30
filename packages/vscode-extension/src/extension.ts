import * as vscode from 'vscode';
import { parseHexColor, rgbaToHex } from './utils/color';
import { loadConfig } from './utils/loadConfig';
import { flatPallets } from './utils/flatPallets';

export function activate(context: vscode.ExtensionContext) {
	const palletColorProvider: vscode.DocumentColorProvider = {
		provideDocumentColors(document) {
			const results: vscode.ColorInformation[] = [];

			const text = document.getText();
			const colorMatches = [...text.matchAll(/#[0-9a-fA-F]{3,8}\b/g)];
			colorMatches.map((match) => {
				const start = document.positionAt(match.index!);
				const end = document.positionAt(match.index! + match[0].length);
				const color = parseHexColor(match[0]);
				results.push(
					new vscode.ColorInformation(new vscode.Range(start, end), color),
				);
			});

			return results;
		},
		provideColorPresentations(color) {
			const hex = rgbaToHex(color.red, color.green, color.blue, color.alpha);
			return [new vscode.ColorPresentation(hex)];
		},
	};

	const tokenColorProvider: vscode.DocumentColorProvider = {
		async provideDocumentColors(document) {
			const results: vscode.ColorInformation[] = [];

			const text = document.getText();
			const config = await loadConfig(text);
			const flatPalletsMap = flatPallets(config.pallets);
			const set = new Set();

			for (const token in config.tokens) {
				for (const theme in config.tokens[token]) {
					if (set.has(config.tokens[token][theme])) {
						continue;
					}

					const regex = new RegExp(`\\b${config.tokens[token][theme]}\\b`, 'g');
					const matches = [...text.matchAll(regex)];
					set.add(config.tokens[token][theme]);
					matches.map((match) => {
						const start = document.positionAt(match.index!);
						const end = document.positionAt(match.index! + match[0].length);
						const color = flatPalletsMap.get(match[0]);
						if (!color) {
							return;
						}
						results.push(
							new vscode.ColorInformation(
								new vscode.Range(start, end),
								parseHexColor(color as string),
							),
						);
					});
				}
			}
			return results;
		},
		provideColorPresentations() {
			return [];
		},
	};

	context.subscriptions.push(
		vscode.languages.registerColorProvider(
			{ pattern: '**/pigmenta.config.js' },
			palletColorProvider,
		),
	);
	context.subscriptions.push(
		vscode.languages.registerColorProvider(
			{ pattern: '**/pigmenta.config.js' },
			tokenColorProvider,
		),
	);
}
