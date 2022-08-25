export const getSelectedOptionValues = (options) => {
	let selectedOptionValues = [];
	for (let option of options) {
		if (option.selected) {
			selectedOptionValues.push(option.value);
		}
	}
	return selectedOptionValues;
};
