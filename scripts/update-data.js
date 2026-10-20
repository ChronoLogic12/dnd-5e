const fs = require('fs');
const path = require('path');

const API = 'https://api.open5e.com/v1';
const DATA_DIRECTORY = path.join(__dirname, '../src/data');

const MONSTER_FIELDS = [
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

const fetchAll = async (resource) => {
	const response = await fetch(`${API}/${resource}/?limit=10000`);
	if (!response.ok) {
		throw new Error(`${resource}: ${response.status} ${response.statusText}`);
	}
	const { count, results } = await response.json();
	if (results.length !== count) {
		throw new Error(`${resource}: received ${results.length} of ${count}`);
	}
	return results;
};

const pick = (item, fields) => Object.fromEntries(fields.map((field) => [field, item[field]]));

const save = (fileName, data) => {
	fs.writeFileSync(path.join(DATA_DIRECTORY, fileName), JSON.stringify(data, null, '\t') + '\n');
	console.log(`${fileName}: ${data.length} entries`);
};

const main = async () => {
	save('spells_from_api.json', await fetchAll('spells'));
	save('conditions.json', await fetchAll('conditions'));
	const monsters = await fetchAll('monsters');
	save(
		'monsters.json',
		monsters.map((monster) => pick(monster, MONSTER_FIELDS))
	);
};

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
