import * as vscode from 'vscode';

export const parseHexColor = (hex: string): vscode.Color => {
	const value = hex.replace('#', '');
	const bigint = parseInt(
		value.length === 3
			? value
					.split('')
					.map((c) => c + c)
					.join('')
			: value,
		16,
	);
	const r = ((bigint >> 16) & 255) / 255;
	const g = ((bigint >> 8) & 255) / 255;
	const b = (bigint & 255) / 255;
	return new vscode.Color(r, g, b, 1);
};

export const rgbaToHex = (
	r: number,
	g: number,
	b: number,
	a: number,
): string => {
	return `#${[r, g, b]
		.map((x) =>
			Math.round(x * 255)
				.toString(16)
				.padStart(2, '0'),
		)
		.join('')}`;
};
