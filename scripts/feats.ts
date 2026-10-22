import { isSourceKey, sources } from '../src/data/sources.ts';
import type { Feat } from '../src/pages/Feats/types.ts';
import { slugFromV2Key } from './open5e.ts';
import type { ApiRecord } from './open5e.ts';

interface V2Benefit {
	desc: string;
}

export const featFromV2 = (record: ApiRecord): Feat | null => {
	const documentKey = (record.document as { key: string }).key;
	if (!isSourceKey(documentKey)) {
		return null;
	}
	const benefits = (record.benefits as V2Benefit[]).map(({ desc }) => `* ${desc}`);
	return {
		id: `${documentKey}/${slugFromV2Key(String(record.key))}`,
		name: String(record.name),
		prerequisite: String(record.prerequisite ?? ''),
		desc: [String(record.desc ?? ''), ...benefits].filter(Boolean).join('\n\n'),
		source: documentKey,
		edition: sources[documentKey].edition,
	};
};
