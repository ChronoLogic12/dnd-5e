export type Edition = '2014' | '2024';

export type PillStyle = 'core' | 'a5e' | 'outline' | 'other';

export interface Source {
	title: string;
	shortLabel: string;
	pill: PillStyle;
	edition: Edition;
}

export const sources = {
	'srd-2014': { title: '5e Core Rules', shortLabel: 'Core', pill: 'core', edition: '2014' },
	'srd-2024': { title: '5e Core Rules (2024)', shortLabel: 'Core 2024', pill: 'core', edition: '2024' },
	'phb-2014': { title: "Player's Handbook", shortLabel: 'PHB', pill: 'core', edition: '2014' },
	tce: { title: "Tasha's Cauldron of Everything", shortLabel: "Tasha's", pill: 'other', edition: '2014' },
	xge: { title: 'Xanathar´s Guide to Everything', shortLabel: "Xanathar's", pill: 'other', edition: '2014' },
	'a5e-ag': { title: 'Level Up Advanced 5e', shortLabel: 'A5e', pill: 'a5e', edition: '2014' },
	'a5e-mm': { title: 'Level Up Advanced 5e Monstrous Menagerie', shortLabel: 'A5e', pill: 'a5e', edition: '2014' },
	bfrd: { title: 'Black Flag SRD', shortLabel: 'Black Flag', pill: 'outline', edition: '2014' },
	ccdx: { title: 'Creature Codex', shortLabel: 'Creature Codex', pill: 'other', edition: '2014' },
	deepm: { title: 'Deep Magic 5e', shortLabel: 'Deep Magic', pill: 'other', edition: '2014' },
	deepmx: { title: 'Deep Magic Extended', shortLabel: 'DM Extended', pill: 'other', edition: '2014' },
	kp: { title: 'Kobold Press Compilation', shortLabel: 'Kobold Press', pill: 'other', edition: '2014' },
	open5e: { title: 'Open5e Original Content', shortLabel: 'Open5e', pill: 'other', edition: '2014' },
	'spells-that-dont-suck': {
		title: "Spells That Don't Suck",
		shortLabel: "Spells That Don't Suck",
		pill: 'other',
		edition: '2014',
	},
	tdcs: { title: 'Critical Role: Tal’Dorei Campaign Setting', shortLabel: 'Tal’Dorei', pill: 'other', edition: '2014' },
	tob: { title: 'Tome of Beasts', shortLabel: 'ToB', pill: 'other', edition: '2014' },
	'tob-2023': { title: 'Tome of Beasts 2023', shortLabel: 'ToB 2023', pill: 'outline', edition: '2014' },
	tob2: { title: 'Tome of Beasts 2', shortLabel: 'ToB 2', pill: 'other', edition: '2014' },
	tob3: { title: 'Tome of Beasts 3', shortLabel: 'ToB 3', pill: 'other', edition: '2014' },
	toh: { title: 'Tome of Heroes', shortLabel: 'Tome of Heroes', pill: 'other', edition: '2014' },
	wz: { title: 'Warlock Archives', shortLabel: 'Warlock', pill: 'other', edition: '2014' },
} as const satisfies Record<string, Source>;

export type SourceKey = keyof typeof sources;

export const isSourceKey = (key: string): key is SourceKey => key in sources;
