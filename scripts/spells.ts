import { isSourceKey, sources } from '../src/data/sources.ts';
import type { SourceKey } from '../src/data/sources.ts';
import type { Spell } from '../src/pages/Spells/types.ts';
import { slugFromV2Key, sourceFromV1 } from './open5e.ts';
import type { ApiRecord } from './open5e.ts';

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const spellFromV1 = (record: ApiRecord, source: SourceKey = sourceFromV1(record)): Spell => {
	const components = String(record.components);
	return {
		id: `${source}/${record.slug}`,
		name: String(record.name),
		source,
		edition: sources[source].edition,
		level: Number(record.level_int),
		school: capitalise(String(record.school).toLowerCase()),
		classes: String(record.dnd_class)
			.split(',')
			.map((name) => name.trim().replace(/sorceror/i, 'Sorcerer'))
			.filter(Boolean),
		castingTime: String(record.casting_time),
		range: String(record.range),
		components: {
			verbal: components.includes('V'),
			somatic: components.includes('S'),
			material: components.includes('M'),
		},
		material: String(record.material ?? ''),
		ritual: record.ritual === 'yes',
		concentration: record.concentration === 'yes',
		duration: String(record.duration),
		desc: String(record.desc),
		higherLevel: String(record.higher_level ?? ''),
	};
};

const v2CastingTime = (code: string, reactionCondition: unknown) => {
	if (code === 'action') {
		return '1 action';
	}
	if (code === 'bonus-action') {
		return '1 bonus action';
	}
	if (code === 'reaction') {
		return reactionCondition ? `1 reaction, ${reactionCondition}` : '1 reaction';
	}
	if (code === 'round') {
		return '1 round';
	}
	const timed = code.match(/^(\d+)(minute|hour|day|week)s?$/);
	if (timed) {
		const amount = Number(timed[1]);
		return `${amount} ${timed[2]}${amount > 1 ? 's' : ''}`;
	}
	throw new Error(`Unknown v2 casting time: ${code}`);
};

export const spellFromV2 = (record: ApiRecord): Spell | null => {
	const documentKey = (record.document as { key: string }).key;
	if (!isSourceKey(documentKey)) {
		return null;
	}
	const concentration = Boolean(record.concentration);
	const duration = String(record.duration);
	return {
		id: `${documentKey}/${slugFromV2Key(String(record.key))}`,
		name: String(record.name),
		source: documentKey,
		edition: sources[documentKey].edition,
		level: Number(record.level),
		school: (record.school as { name: string }).name,
		classes: (record.classes as { name: string }[]).map(({ name }) => name),
		castingTime: v2CastingTime(String(record.casting_time), record.reaction_condition),
		range: capitalise(String(record.range_text)),
		components: {
			verbal: Boolean(record.verbal),
			somatic: Boolean(record.somatic),
			material: Boolean(record.material),
		},
		material: String(record.material_specified ?? ''),
		ritual: Boolean(record.ritual),
		concentration,
		duration: concentration ? `Up to ${duration}` : capitalise(duration),
		desc: String(record.desc),
		higherLevel: String(record.higher_level ?? ''),
	};
};
