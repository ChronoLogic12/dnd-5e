import type { Edition, SourceKey } from '../../data/sources';

export interface Condition {
	id: string;
	name: string;
	desc: string;
	source: SourceKey;
	edition: Edition;
}
