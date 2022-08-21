export const colourPicker = (school) => {
	let colour = '';
	switch (school.toLowerCase()) {
		case 'abjuration':
			colour = 'amber accent-1';
			break;
		case 'enchantment':
			colour = 'grey lighten-3';
			break;
		case 'conjuration':
			colour = 'orange lighten-4';
			break;
		case 'divination':
			colour = 'white';
			break;
		case 'evocation':
			colour = 'red lighten-4';
			break;
		case 'illusion':
			colour = 'blue lighten-5';
			break;
		case 'necromancy':
			colour = 'grey ';
			break;
		case 'transmutation':
			colour = 'deep-purple lighten-5';
			break;
		default:
			colour = null;
	}
	return colour;
};
