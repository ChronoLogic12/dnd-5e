import type { Spell } from '../types';

export const makeSpell = (overrides: Partial<Spell> = {}): Spell => ({
	slug: 'acid-arrow',
	name: 'Acid Arrow',
	desc: '',
	higher_level: '',
	range: '90 feet',
	components: 'V, S, M',
	material: '',
	ritual: 'no',
	duration: 'Instantaneous',
	concentration: 'no',
	casting_time: '1 action',
	level: '2nd-level',
	level_int: 2,
	school: 'Evocation',
	dnd_class: 'Wizard',
	document__title: '5e Core Rules',
	...overrides,
});
