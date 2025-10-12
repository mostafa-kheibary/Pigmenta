import { Pallets } from '../types.js';

export const flatPallets = (
	pallets: Pallets,
	flatPalletsArray = new Map<string, string>(),
	parentName = '',
) => {
	for (const key in pallets) {
		const value = pallets[key];
		const fullName = parentName ? `${parentName}-${key}` : key;

		if (typeof value === 'string') {
			flatPalletsArray.set(fullName, value);
		} else {
			flatPallets(value, flatPalletsArray, fullName);
		}
	}

	return flatPalletsArray;
};
