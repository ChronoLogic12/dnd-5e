export const getSharedNames = (items) => {
	const seenNames = new Set();
	const sharedNames = new Set();
	for (const { name } of items) {
		(seenNames.has(name) ? sharedNames : seenNames).add(name);
	}
	return sharedNames;
};
