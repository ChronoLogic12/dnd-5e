export const getSpellKey = (spell) => `${spell.document__title}/${spell.name}`;

export const getUniqueSpells = (...spellLists) => {
	const uniqueSpells = [];
	const seenKeys = new Set();
	for (const spell of spellLists.flat()) {
		const key = getSpellKey(spell);
		if (!seenKeys.has(key)) {
			seenKeys.add(key);
			uniqueSpells.push({
				...spell,
				dnd_class: spell.dnd_class.replace(/sorceror/gi, 'Sorcerer'),
			});
		}
	}
	return uniqueSpells;
};

export const filterSpells = (spells, filters) => {
	const {
		search = '',
		levelFilter = [],
		classFilter = [],
		schoolFilter = [],
		castingFilter = [],
		documentFilter = [],
		concentrationFilter = false,
		ritualFilter = false,
	} = filters;

	const searchResults = spells.filter((spell) => {
		const spellString = JSON.stringify(spell).toLowerCase();
		const spellClasses = spell.dnd_class.split(', ').map((s) => s.toLowerCase());
		const castingTime = spell.casting_time.toLowerCase().replaceAll('reaction,', 'reaction');
		return (
			(search.length > 0 ? spellString.includes(search.toLocaleLowerCase()) : true) &&
			(levelFilter.length ? levelFilter.includes(spell.level_int.toString()) : true) &&
			(classFilter.length ? classFilter.some((r) => spellClasses.includes(r)) : true) &&
			(schoolFilter.length ? schoolFilter.includes(spell.school.toLowerCase()) : true) &&
			(castingFilter.length ? castingFilter.some((r) => castingTime.includes(r)) : true) &&
			(documentFilter.length ? documentFilter.includes(spell.document__title) : true) &&
			(concentrationFilter ? spell.concentration == 'yes' : true) &&
			(ritualFilter ? spell.ritual == 'yes' : true)
		);
	});
	return searchResults.sort(
		(a, b) =>
			a.level_int - b.level_int ||
			a.name.localeCompare(b.name) ||
			a.document__title.localeCompare(b.document__title)
	);
};

export const getSharedSpellNames = (spells) => {
	const seenNames = new Set();
	const sharedNames = new Set();
	for (const { name } of spells) {
		(seenNames.has(name) ? sharedNames : seenNames).add(name);
	}
	return sharedNames;
};
