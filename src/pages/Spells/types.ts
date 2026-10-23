import type { Edition, SourceKey } from '../../data/sources';

export interface Spell {
	id: string;
	name: string;
	source: SourceKey;
	edition: Edition;
	level: number;
	school: string;
	classes: string[];
	castingTime: string;
	range: string;
	components: {
		verbal: boolean;
		somatic: boolean;
		material: boolean;
	};
	material: string;
	ritual: boolean;
	concentration: boolean;
	duration: string;
	desc: string;
	higherLevel: string;
}

export interface SpellFilterValues {
	levelFilter: string[];
	classFilter: string[];
	schoolFilter: string[];
	castingFilter: string[];
	documentFilter: string[];
	concentrationFilter: boolean;
	ritualFilter: boolean;
}
