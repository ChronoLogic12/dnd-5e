import type { SourceKey } from '../src/data/sources.ts';

export type ApiRecord = Record<string, unknown>;

const V1 = 'https://api.open5e.com/v1';
const V2 = 'https://api.open5e.com/v2';
const V2_PAGE_SIZE = 500;

const getJson = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`${url}: ${response.status} ${response.statusText}`);
	}
	return response.json() as Promise<{ count: number; next: string | null; results: ApiRecord[] }>;
};

export const fetchV1 = async (resource: string): Promise<ApiRecord[]> => {
	const { count, results } = await getJson(`${V1}/${resource}/?limit=10000`);
	if (results.length !== count) {
		throw new Error(`v1 ${resource}: received ${results.length} of ${count}`);
	}
	return results;
};

export const fetchV2 = async (resource: string): Promise<ApiRecord[]> => {
	const results: ApiRecord[] = [];
	let url: string | null = `${V2}/${resource}/?limit=${V2_PAGE_SIZE}`;
	let count = 0;
	while (url) {
		const page = await getJson(url);
		results.push(...page.results);
		count = page.count;
		url = page.next;
	}
	if (results.length !== count) {
		throw new Error(`v2 ${resource}: received ${results.length} of ${count}`);
	}
	return results;
};

const v1Sources: Record<string, SourceKey> = {
	'wotc-srd': 'srd-2014',
	a5e: 'a5e-ag',
	menagerie: 'a5e-mm',
	blackflag: 'bfrd',
	cc: 'ccdx',
	dmag: 'deepm',
	'dmag-e': 'deepmx',
	kp: 'kp',
	o5e: 'open5e',
	taldorei: 'tdcs',
	tob: 'tob',
	'tob-2023': 'tob-2023',
	tob2: 'tob2',
	tob3: 'tob3',
	toh: 'toh',
	warlock: 'wz',
};

export const sourceFromV1 = (record: ApiRecord): SourceKey => {
	const slug = String(record.document__slug);
	const source = v1Sources[slug];
	if (!source) {
		throw new Error(`Unknown v1 document: ${slug}`);
	}
	return source;
};

export const slugFromV2Key = (key: string) => key.slice(key.indexOf('_') + 1);
