import fs from 'fs/promises';

export const makeFolder = async (path: string) => {
	try {
		await fs.readdir(path);
	} catch (error) {
		if (error.code === 'ENOENT') await fs.mkdir(path);
	}
};
