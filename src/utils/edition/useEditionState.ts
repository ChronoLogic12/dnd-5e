import { useState } from 'react';

import type { Edition } from '../../data/sources';

export const EDITION_STORAGE_KEY = 'yggdramor-edition';

const isEdition = (value: unknown): value is Edition => value === '2014' || value === '2024';

export const readStoredEdition = (): Edition => {
	try {
		const stored = localStorage.getItem(EDITION_STORAGE_KEY);
		return isEdition(stored) ? stored : '2014';
	} catch {
		return '2014';
	}
};

const storeEdition = (edition: Edition) => {
	try {
		localStorage.setItem(EDITION_STORAGE_KEY, edition);
	} catch {
		return;
	}
};

export const useEditionState = () => {
	const [edition, setEditionState] = useState<Edition>(readStoredEdition);

	const setEdition = (next: Edition) => {
		setEditionState(next);
		storeEdition(next);
	};

	return { edition, setEdition };
};

export type EditionState = ReturnType<typeof useEditionState>;
