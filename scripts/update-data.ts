import fs from 'node:fs';
import path from 'node:path';

import type { Monster } from '../src/pages/Monsters/types.ts';
import { conditionFromV1, conditionsFromV2 } from './conditions.ts';
import { featFromV2 } from './feats.ts';
import { fetchV1, fetchV2 } from './open5e.ts';
import type { ApiRecord } from './open5e.ts';

const DATA_DIRECTORY = path.join(import.meta.dirname, '../src/data');

const MONSTER_FIELDS: (keyof Monster)[] = [
	'slug',
	'name',
	'size',
	'type',
	'alignment',
	'armor_class',
	'hit_points',
	'hit_dice',
	'speed',
	'strength',
	'dexterity',
	'constitution',
	'intelligence',
	'wisdom',
	'charisma',
	'strength_save',
	'dexterity_save',
	'constitution_save',
	'intelligence_save',
	'wisdom_save',
	'charisma_save',
	'skills',
	'damage_vulnerabilities',
	'damage_resistances',
	'damage_immunities',
	'senses',
	'languages',
	'challenge_rating',
	'special_abilities',
	'actions',
	'reactions',
	'legendary_desc',
	'legendary_actions',
	'document__title',
];

const pick = (item: ApiRecord, fields: string[]) =>
	Object.fromEntries(fields.map((field) => [field, item[field]]));

const save = (fileName: string, data: unknown[]) => {
	fs.writeFileSync(path.join(DATA_DIRECTORY, fileName), JSON.stringify(data, null, '\t') + '\n');
	console.log(`${fileName}: ${data.length} entries`);
};

const main = async () => {
	save('spells_from_api.json', await fetchV1('spells'));
	save('conditions.json', [
		...(await fetchV1('conditions')).map(conditionFromV1),
		...(await fetchV2('conditions')).flatMap((condition) => conditionsFromV2(condition, ['srd-2014'])),
	]);
	save(
		'feats.json',
		(await fetchV2('feats')).map(featFromV2).filter((feat) => feat !== null)
	);
	const monsters = await fetchV1('monsters');
	save(
		'monsters.json',
		monsters.map((monster) => pick(monster, MONSTER_FIELDS))
	);
};

main().catch((error: Error) => {
	console.error(error.message);
	process.exit(1);
});
