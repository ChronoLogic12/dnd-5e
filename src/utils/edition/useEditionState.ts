import { useEffect, useState } from 'react';
import { parseAsStringLiteral, useQueryState } from 'nuqs';

import type { Edition } from '../../data/sources';

export const EDITION_STORAGE_KEY = 'yggdramor-edition';

const editions = ['2014', '2024'] as const satisfies readonly Edition[];

const isEdition = (value: unknown): value is Edition => editions.includes(value as Edition);

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
	const [urlEdition, setUrlEdition] = useQueryState('edition', parseAsStringLiteral(editions));
	const [edition, setEditionState] = useState<Edition>(() => urlEdition ?? readStoredEdition());

	useEffect(() => {
		if (urlEdition) {
			setEditionState(urlEdition);
			storeEdition(urlEdition);
		}
	}, [urlEdition]);

	useEffect(() => {
		if (!urlEdition && edition === '2024') {
			setUrlEdition('2024');
		}
	}, [urlEdition, edition, setUrlEdition]);

	const setEdition = (next: Edition) => {
		setEditionState(next);
		storeEdition(next);
		setUrlEdition(next === '2024' ? next : null);
	};

	return { edition, setEdition };
};

export type EditionState = ReturnType<typeof useEditionState>;
