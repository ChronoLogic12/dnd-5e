import React from 'react';
import { TbBook2, TbBrain } from 'react-icons/tb';

import { FilterPanel, MultiSelect, TogglePill } from '../../../../components';
import type { SelectOption } from '../../../../components';
import { countActiveFilters } from '../../utils';
import type { SpellFilterValues } from '../../types';

const levelOptions: SelectOption[] = [
	{ value: '0', label: 'Cantrip' },
	...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level) => ({ value: String(level), label: String(level) })),
];

const classOptions: SelectOption[] = [
	'Artificer',
	'Bard',
	'Cleric',
	'Druid',
	'Paladin',
	'Ranger',
	'Sorcerer',
	'Warlock',
	'Wizard',
].map((name) => ({ value: name.toLowerCase(), label: name }));

const schoolOptions: SelectOption[] = [
	'Abjuration',
	'Conjuration',
	'Divination',
	'Enchantment',
	'Evocation',
	'Illusion',
	'Necromancy',
	'Transmutation',
].map((name) => ({ value: name.toLowerCase(), label: name }));

const castingOptions: SelectOption[] = [
	{ value: '1 action', label: 'Action' },
	{ value: '1 bonus action', label: 'Bonus action' },
	{ value: 'reaction', label: 'Reaction' },
];

const sourceOptions: SelectOption[] = [
	{ value: 'srd-2014', label: '5e Core Rules' },
	{ value: 'a5e-ag', label: 'Level Up Advanced 5e' },
	{ value: 'deepm', label: 'Deep Magic 5e' },
	{ value: 'deepmx', label: 'Deep Magic Extended' },
	{ value: 'wz', label: 'Warlock Archives' },
	{ value: 'kp', label: 'Kobold Press Compilation' },
	{ value: 'toh', label: 'Tome of Heroes' },
	{ value: 'open5e', label: 'Open5e Original Content' },
];

interface SpellFiltersProps {
	filters: SpellFilterValues;
	onChange: <K extends keyof SpellFilterValues>(key: K, value: SpellFilterValues[K]) => void;
}

export default function SpellFilters({ filters, onChange }: SpellFiltersProps) {
	return (
		<FilterPanel
			activeCount={countActiveFilters(filters)}
			fields={
				<>
					<MultiSelect
						label="Level"
						options={levelOptions}
						value={filters.levelFilter}
						onChange={(value) => onChange('levelFilter', value)}
					/>
					<MultiSelect
						label="Class"
						options={classOptions}
						value={filters.classFilter}
						onChange={(value) => onChange('classFilter', value)}
					/>
					<MultiSelect
						label="School"
						options={schoolOptions}
						value={filters.schoolFilter}
						onChange={(value) => onChange('schoolFilter', value)}
					/>
					<MultiSelect
						label="Casting time"
						options={castingOptions}
						value={filters.castingFilter}
						onChange={(value) => onChange('castingFilter', value)}
					/>
					<MultiSelect
						label="Source"
						options={sourceOptions}
						value={filters.documentFilter}
						onChange={(value) => onChange('documentFilter', value)}
					/>
				</>
			}
			toggles={
				<>
					<TogglePill
						icon={<TbBook2 aria-hidden />}
						pressed={filters.ritualFilter}
						onPressedChange={(pressed) => onChange('ritualFilter', pressed)}
					>
						Ritual
					</TogglePill>
					<TogglePill
						icon={<TbBrain aria-hidden />}
						pressed={filters.concentrationFilter}
						onPressedChange={(pressed) => onChange('concentrationFilter', pressed)}
					>
						Concentration
					</TogglePill>
				</>
			}
		/>
	);
}
