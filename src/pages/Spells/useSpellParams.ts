import { parseAsArrayOf, parseAsBoolean, parseAsString, useQueryStates } from 'nuqs';

import { CORE_FILTER } from './components/SpellFilters';
import type { SpellFilterValues } from './types';
import { listParams, listUrlKeys } from '../../utils/listParams';

const list = parseAsArrayOf(parseAsString).withDefault([]);

const spellParams = {
	...listParams,
	levelFilter: list,
	classFilter: list,
	schoolFilter: list,
	castingFilter: list,
	documentFilter: parseAsArrayOf(parseAsString).withDefault([CORE_FILTER]),
	ritualFilter: parseAsBoolean.withDefault(false),
	concentrationFilter: parseAsBoolean.withDefault(false),
};

const urlKeys = {
	...listUrlKeys,
	levelFilter: 'level',
	classFilter: 'class',
	schoolFilter: 'school',
	castingFilter: 'casting',
	documentFilter: 'source',
	ritualFilter: 'ritual',
	concentrationFilter: 'concentration',
};

export const useSpellParams = () => {
	const [{ search, page, open, ...filters }, setParams] = useQueryStates(spellParams, { urlKeys });

	return {
		search,
		filters: filters as SpellFilterValues,
		page,
		open,
		setSearch: (value: string) => setParams({ search: value, page: null }),
		setFilter: <K extends keyof SpellFilterValues>(key: K, value: SpellFilterValues[K]) =>
			setParams({ [key]: value, page: null }),
		setPage: (value: number) => setParams({ page: value }),
		setOpen: (value: string | null) => setParams({ open: value }),
	};
};
