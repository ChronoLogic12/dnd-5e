import React, { useEffect, useState } from 'react';

import { Banner, Nav, CardList, Pagination, ResultsCount, SearchBar } from '../../components';
import MonsterCard from './components/MonsterCard';
import MonsterFilters from './components/MonsterFilters';
import { prepareMonsters, filterMonsters } from './utils';
import type { PreparedMonster } from './utils';
import { getSharedNames } from '../../utils/getSharedNames';
import type { SourceKey } from '../../data/sources';
import type { Monster } from './types';

const SHOWN_SOURCES: SourceKey[] = [
	'srd-2014',
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

export default function Monsters() {
	const [monsters, setMonsters] = useState<PreparedMonster[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [challengeRatingFilter, setChallengeRatingFilter] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

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

	const updateSearch = (value: string) => {
		setSearch(value);
		setCurrentPage(1);
	};

	const updateChallengeRatingFilter = (value: string[]) => {
		setChallengeRatingFilter(value);
		setCurrentPage(1);
	};

	const results = filterMonsters(monsters, { search, challengeRatingFilter });
	const sharedNames = getSharedNames(results);
	const pageResults = results.slice((currentPage - 1) * MONSTERS_PER_PAGE, currentPage * MONSTERS_PER_PAGE);

	const renderResults = () => {
		if (pageResults.length) {
			return (
				<>
					<CardList>
						{pageResults.map((monster) => (
							<MonsterCard key={monster.id} monster={monster} showSource={sharedNames.has(monster.name)} />
						))}
					</CardList>
					<Pagination
						totalItems={results.length}
						perPage={MONSTERS_PER_PAGE}
						currentPage={currentPage}
						onPageChange={setCurrentPage}
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
				<SearchBar value={search} onChange={updateSearch} />
				<MonsterFilters
					challengeRatingFilter={challengeRatingFilter}
					setChallengeRatingFilter={updateChallengeRatingFilter}
				/>
				<ResultsCount count={results.length} />
				{renderResults()}
				<div className="spacing"></div>
			</main>
			<Nav />
		</>
	);
}
