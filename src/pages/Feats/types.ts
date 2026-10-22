import type { Edition, SourceKey } from '../../data/sources';

export interface Feat {
	id: string;
	name: string;
	prerequisite: string;
	desc: string;
	source: SourceKey;
	edition: Edition;
}
