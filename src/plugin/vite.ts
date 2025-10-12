import { generateThemes } from '../generators/index.js';

export default function pigmentaVitePlugin() {
	let config: any;

	return {
		name: 'vite-plugin-pigmenta',
		configResolved(resolvedConfig: any) {
			config = resolvedConfig;
		},
		buildStart() {
			generateThemes();
		},
		handleHotUpdate({ file }: any) {
			if (file.endsWith('pigmenta.config.js')) generateThemes();
		},
	};
}
