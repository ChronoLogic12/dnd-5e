import { sources } from '../../data/sources';
import type { SourceKey } from '../../data/sources';
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

const ordinalSuffix = (level: number) => (level === 1 ? 'st' : level === 2 ? 'nd' : level === 3 ? 'rd' : 'th');

export const getLevelLabel = (level: number) => (level === 0 ? 'Cantrip' : `${level}${ordinalSuffix(level)}-level`);

export const getComponentsLabel = ({ verbal, somatic, material }: Spell['components']) =>
	[verbal && 'V', somatic && 'S', material && 'M'].filter(Boolean).join(', ');

export const getDisplaySource = (source: SourceKey): SourceKey => (source === 'phb-2014' ? 'srd-2014' : source);

const getSearchText = (spell: Spell) =>
	[
		spell.name,
		spell.desc,
		spell.higherLevel,
		spell.school,
		spell.classes.join(' '),
		spell.castingTime,
		spell.range,
		spell.duration,
		spell.material,
		getLevelLabel(spell.level),
		sources[getDisplaySource(spell.source)].title,
	]
		.join(' ')
		.toLowerCase();

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
	const lowerCaseSearch = search.toLowerCase();

	const searchResults = spells.filter((spell) => {
		const spellClasses = spell.classes.map((name) => name.toLowerCase());
		const castingTime = spell.castingTime.toLowerCase().replaceAll('reaction,', 'reaction');
		return (
			(lowerCaseSearch ? getSearchText(spell).includes(lowerCaseSearch) : true) &&
			(levelFilter.length ? levelFilter.includes(spell.level.toString()) : true) &&
			(classFilter.length ? classFilter.some((r) => spellClasses.includes(r)) : true) &&
			(schoolFilter.length ? schoolFilter.includes(spell.school.toLowerCase()) : true) &&
			(castingFilter.length ? castingFilter.some((r) => castingTime.includes(r)) : true) &&
			(documentFilter.length ? documentFilter.includes(getDisplaySource(spell.source)) : true) &&
			(concentrationFilter ? spell.concentration : true) &&
			(ritualFilter ? spell.ritual : true)
		);
	});
	return searchResults.sort(
		(a, b) =>
			a.level - b.level ||
			a.name.localeCompare(b.name) ||
			sources[getDisplaySource(a.source)].title.localeCompare(sources[getDisplaySource(b.source)].title)
	);
};
