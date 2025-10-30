figma.showUI(__html__);

const rgbaToHex = ({
	r,
	g,
	b,
	a,
}: {
	r: number;
	g: number;
	b: number;
	a: number;
}): string => {
	return (
		'#' +
		[r, g, b]
			.map((x) => {
				const hex = Math.round(x * 255).toString(16);
				return hex.length === 1 ? '0' + hex : hex;
			})
			.join('')
	);
};
function deepMerge(...objects: Record<any, any>[]) {
	return objects.reduce((acc, obj) => {
		for (const key in obj) {
			if (
				acc[key] &&
				typeof acc[key] === 'object' &&
				typeof obj[key] === 'object'
			) {
				acc[key] = deepMerge(acc[key], obj[key]);
			} else {
				acc[key] = obj[key];
			}
		}
		return acc;
	}, {});
}

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async (msg: { type: string; count: number }) => {
	if (msg.type !== 'create') return;
	const colors = await figma.variables.getLocalVariablesAsync('COLOR');

	const pallets = [];

	colors.forEach((color) => {
		const colorNameArray = color.name.split('/');
		const objectPallet = (colorNameArray: string[], pallet: any = []) => {
			if (!color.valuesByMode['82:1']) return;
			if (colorNameArray.length === 0)
				return rgbaToHex({ ...(color.valuesByMode['82:1'] as any) });
			else {
				const colorName = colorNameArray[0];
				colorNameArray.shift();
				if (colorNameArray.length === 0)
					pallet[colorName] = objectPallet(colorNameArray, pallet[colorName]);
				else
					pallet[colorName] = {
						...pallet[colorName],
						...objectPallet(colorNameArray, pallet[colorName]),
					};
			}
			return pallet;
		};
		const pp = objectPallet(colorNameArray);
		pallets.push(pp);
	});

	const palletsFinal: any = deepMerge(...pallets);
	figma.ui.postMessage(palletsFinal);
};
