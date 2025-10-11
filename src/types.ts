export interface Pallets {
	[key: string]: string;
}

export interface Options {
	/** Output type: css, scss, tailwind */
	output: 'css' | 'scss' | 'tailwind';
	/** Load the theme lazily */
	lazy: boolean;
	/** destination of the generated output file */
	dest: string;
	/** default theme mode */
	default: string;
}

export type Tokens = Record<string, Record<string, string>>;

export interface Config {
	options: Options;
	pallets: Pallets;
	tokens: Tokens;
}
