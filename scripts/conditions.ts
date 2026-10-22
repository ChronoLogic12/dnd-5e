import { isSourceKey, sources } from '../src/data/sources.ts';
import type { Condition } from '../src/pages/Conditions/types.ts';
import { sourceFromV1, slugFromV2Key } from './open5e.ts';
import type { ApiRecord } from './open5e.ts';

interface V2Description {
	desc: string;
	document: string;
}

export const conditionFromV1 = (record: ApiRecord): Condition => {
	const source = sourceFromV1(record);
	return {
		id: `${source}/${record.slug}`,
		name: String(record.name),
		desc: String(record.desc),
		source,
		edition: sources[source].edition,
	};
};

export const conditionsFromV2 = (record: ApiRecord, skipSources: string[]): Condition[] =>
	(record.descriptions as V2Description[])
		.filter(({ document }) => isSourceKey(document) && !skipSources.includes(document))
		.map(({ desc, document }) => {
			const source = document as keyof typeof sources;
			return {
				id: `${source}/${slugFromV2Key(String(record.key))}`,
				name: String(record.name),
				desc,
				source,
				edition: sources[source].edition,
			};
		});
