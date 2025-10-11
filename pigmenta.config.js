/** @type {import('pigmenta/types').Config} */
export default {
	options: {
		output: 'css',
		lazy: true,
		dest: './src',
		default: 'light',
	},
	pallets: {
		black: '#000',
		white: '#fff',
	},
	tokens: {
		surface: {
			light: 'black',
			dark: 'white',
			another: 'white',
		},
	},
};
