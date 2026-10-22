import fs from 'node:fs';
import path from 'node:path';

import type { SourceKey } from '../src/data/sources.ts';
import { conditionFromV1, conditionsFromV2 } from './conditions.ts';
import { featFromV2 } from './feats.ts';
import { monsterFromV1, monsterFromV2 } from './monsters.ts';
import { fetchV1, fetchV2 } from './open5e.ts';
import type { ApiRecord } from './open5e.ts';
import { spellFromV1, spellFromV2 } from './spells.ts';

const DATA_DIRECTORY = path.join(import.meta.dirname, '../src/data');

const save = (fileName: string, data: unknown[]) => {
	fs.writeFileSync(path.join(DATA_DIRECTORY, fileName), JSON.stringify(data, null, '\t') + '\n');
	console.log(`${fileName}: ${data.length} entries`);
};

const documentKey = (record: ApiRecord) => (record.document as { key: string }).key as SourceKey;

const fromV1ThenV2 = async <T extends { source: SourceKey }>(
	v1Resource: string,
	v2Resource: string,
	fromV1: (record: ApiRecord) => T,
	fromV2: (record: ApiRecord) => T | null
): Promise<T[]> => {
	const v1Records = (await fetchV1(v1Resource)).map((record) => fromV1(record));
	const v1Sources = new Set(v1Records.map((record) => record.source));
	const v2Records = (await fetchV2(v2Resource))
		.filter((record) => !v1Sources.has(documentKey(record)))
		.map(fromV2)
		.filter((record) => record !== null);
	return [...v1Records, ...v2Records];
};

const main = async () => {
	save('spells.json', await fromV1ThenV2('spells', 'spells', spellFromV1, spellFromV2));
	save('monsters.json', await fromV1ThenV2('monsters', 'creatures', monsterFromV1, monsterFromV2));
	save('conditions.json', [
		...(await fetchV1('conditions')).map(conditionFromV1),
		...(await fetchV2('conditions')).flatMap((condition) => conditionsFromV2(condition, ['srd-2014'])),
	]);
	save(
		'feats.json',
		(await fetchV2('feats')).map(featFromV2).filter((feat) => feat !== null)
	);
};

main().catch((error: Error) => {
	console.error(error.message);
	process.exit(1);
});
