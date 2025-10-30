export interface Pallets {
	[palletName: string]: string | Pallets;
}
export interface Options {
	/** Output type: css, scss, tailwind */
	output: 'css' | 'tailwind';
	/** destination of the generated output file */
	dest: string;
	/** default theme mode */
	default: string;
	/** prefix for token name */
	tokenPrefix: string;
	/** path for the pigmenta config to extend */
	extend: string[];
}

export type Tokens = Record<string, Record<string, string>>;

export interface Config {
	options: Options;
	pallets: Pallets;
	tokens: Tokens;
}
