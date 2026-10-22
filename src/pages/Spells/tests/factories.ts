import type { Spell } from '../types';

export const makeSpell = (overrides: Partial<Spell> = {}): Spell => ({
	id: 'srd-2014/acid-arrow',
	name: 'Acid Arrow',
	source: 'srd-2014',
	edition: '2014',
	level: 2,
	school: 'Evocation',
	classes: ['Wizard'],
	castingTime: '1 action',
	range: '90 feet',
	components: { verbal: true, somatic: true, material: true },
	material: '',
	ritual: false,
	concentration: false,
	duration: 'Instantaneous',
	desc: '',
	higherLevel: '',
	...overrides,
});
