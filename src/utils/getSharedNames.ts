export const getSharedNames = (items: { name: string }[]): Set<string> => {
	const seenNames = new Set<string>();
	const sharedNames = new Set<string>();
	for (const { name } of items) {
		(seenNames.has(name) ? sharedNames : seenNames).add(name);
	}
	return sharedNames;
};
