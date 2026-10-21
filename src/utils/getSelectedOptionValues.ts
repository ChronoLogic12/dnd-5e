export const getSelectedOptionValues = (options: HTMLOptionsCollection): string[] => {
	const selectedOptionValues: string[] = [];
	for (const option of options) {
		if (option.selected) {
			selectedOptionValues.push(option.value);
		}
	}
	return selectedOptionValues;
};
