import React, { useEffect, useState } from 'react';
import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';

import { Banner, Nav, CardList, Pagination, ResultsCount, SearchBar } from '../../components';
import MonsterCard from './components/MonsterCard';
import MonsterFilters from './components/MonsterFilters';
import { prepareMonsters, filterMonsters } from './utils';
import type { PreparedMonster } from './utils';
import { getSharedNames } from '../../utils/getSharedNames';
import { isShownInEdition } from '../../data/sources';
import type { SourceKey } from '../../data/sources';
import { useEdition } from '../../utils/edition';
import { usePagedResults } from '../../utils/usePagedResults';
import { listParams, listUrlKeys } from '../../utils/listParams';
import type { Monster } from './types';

const SHOWN_SOURCES: SourceKey[] = [
	'srd-2014',
	'srd-2024',
	'a5e-mm',
	'bfrd',
	'ccdx',
	'tdcs',
	'tob',
	'tob-2023',
	'tob2',
	'tob3',
];

const MONSTERS_PER_PAGE = 50;

const monsterParams = {
	...listParams,
	challengeRatingFilter: parseAsArrayOf(parseAsString).withDefault([]),
};

const urlKeys = { ...listUrlKeys, challengeRatingFilter: 'cr' };

export default function Monsters() {
	const [monsters, setMonsters] = useState<PreparedMonster[]>([]);
	const [{ search, challengeRatingFilter, page, open }, setParams] = useQueryStates(monsterParams, { urlKeys });
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const { edition } = useEdition();

	useEffect(() => {
		import('../../data/monsters.json')
			.then(({ default: data }) =>
				setMonsters(
					prepareMonsters((data as Monster[]).filter((monster) => SHOWN_SOURCES.includes(monster.source)))
				)
			)
			.catch(() => setError('Monsters could not be loaded. Try refreshing the page.'))
			.finally(() => setIsLoading(false));
	}, []);

	const setPage = (value: number) => setParams({ page: value });
	const setOpen = (value: string | null) => setParams({ open: value });

	const results = filterMonsters(
		monsters.filter(({ monster }) => isShownInEdition(monster.source, edition)),
		{ search, challengeRatingFilter }
	);
	const sharedNames = getSharedNames(results);
	const { currentPage, pageResults } = usePagedResults({
		results,
		perPage: MONSTERS_PER_PAGE,
		page,
		setPage,
		open,
		setOpen,
		edition,
		isLoading,
	});

	const renderResults = () => {
		if (pageResults.length) {
			return (
				<>
					<CardList open={open} onOpenChange={setOpen}>
						{pageResults.map((monster) => (
							<MonsterCard key={monster.id} monster={monster} showSource={sharedNames.has(monster.name)} />
						))}
					</CardList>
					<Pagination
						totalItems={results.length}
						perPage={MONSTERS_PER_PAGE}
						currentPage={currentPage}
						onPageChange={setPage}
					/>
				</>
			);
		}
		if (error) {
			return <p className="results">{error}</p>;
		}
		return isLoading ? <div className="loader"></div> : <p className="results">No results found</p>;
	};

	return (
		<>
			<Banner page="Monsters" />
			<main className="container">
				<SearchBar value={search} onChange={(value) => setParams({ search: value, page: null })} />
				<MonsterFilters
					challengeRatingFilter={challengeRatingFilter}
					setChallengeRatingFilter={(value) => setParams({ challengeRatingFilter: value, page: null })}
				/>
				<ResultsCount count={results.length} />
				{renderResults()}
				<div className="spacing"></div>
			</main>
			<Nav />
		</>
	);
}
