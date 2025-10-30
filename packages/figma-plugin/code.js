var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__);
const rgbaToHex = ({ r, g, b, a, }) => {
    return ('#' +
        [r, g, b]
            .map((x) => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        })
            .join(''));
};
function deepMerge(...objects) {
    return objects.reduce((acc, obj) => {
        for (const key in obj) {
            if (acc[key] &&
                typeof acc[key] === 'object' &&
                typeof obj[key] === 'object') {
                acc[key] = deepMerge(acc[key], obj[key]);
            }
            else {
                acc[key] = obj[key];
            }
        }
        return acc;
    }, {});
}
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    if (msg.type !== 'create')
        return;
    const colors = yield figma.variables.getLocalVariablesAsync('COLOR');
    const pallets = [];
    colors.forEach((color) => {
        const colorNameArray = color.name.split('/');
        const objectPallet = (colorNameArray, pallet = []) => {
            if (!color.valuesByMode['82:1'])
                return;
            if (colorNameArray.length === 0)
                return rgbaToHex(Object.assign({}, color.valuesByMode['82:1']));
            else {
                const colorName = colorNameArray[0];
                colorNameArray.shift();
                if (colorNameArray.length === 0)
                    pallet[colorName] = objectPallet(colorNameArray, pallet[colorName]);
                else
                    pallet[colorName] = Object.assign(Object.assign({}, pallet[colorName]), objectPallet(colorNameArray, pallet[colorName]));
            }
            return pallet;
        };
        const pp = objectPallet(colorNameArray);
        pallets.push(pp);
    });
    const palletsFinal = deepMerge(...pallets);
    figma.ui.postMessage(palletsFinal);
});
