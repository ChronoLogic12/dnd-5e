import type { Spell } from './types';

export interface SpellFilters {
	search?: string;
	levelFilter?: string[];
	classFilter?: string[];
	schoolFilter?: string[];
	castingFilter?: string[];
	documentFilter?: string[];
	concentrationFilter?: boolean;
	ritualFilter?: boolean;
}

export const getSpellKey = (spell: Pick<Spell, 'name' | 'document__title'>) =>
	`${spell.document__title}/${spell.name}`;

export const getUniqueSpells = (...spellLists: Spell[][]): Spell[] => {
	const uniqueSpells: Spell[] = [];
	const seenKeys = new Set<string>();
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

export const filterSpells = (spells: Spell[], filters: SpellFilters): Spell[] => {
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
