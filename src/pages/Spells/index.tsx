import React, { useState } from 'react';

import { Banner, Nav, CardList, Pagination, ResultsCount, SearchBar } from '../../components';
import SpellCard from './components/SpellCard';
import SpellFilters from './components/SpellFilters';
import handmadeSpells from '../../data/handmade/spells.json';
import openSpells from '../../data/spells.json';
import type { SourceKey } from '../../data/sources';
import { filterSpells } from './utils';
import { getSharedNames } from '../../utils/getSharedNames';
import type { Spell, SpellFilterValues } from './types';

const SHOWN_SOURCES: SourceKey[] = [
	'srd-2014',
	'phb-2014',
	'a5e-ag',
	'deepm',
	'deepmx',
	'wz',
	'kp',
	'toh',
	'open5e',
];

const SPELLS_PER_PAGE = 30;

const DEFAULT_FILTERS: SpellFilterValues = {
	levelFilter: [],
	classFilter: [],
	schoolFilter: [],
	castingFilter: [],
	documentFilter: ['srd-2014'],
	concentrationFilter: false,
	ritualFilter: false,
};

const spells = [...(handmadeSpells as Spell[]), ...(openSpells as Spell[])].filter((spell) =>
	SHOWN_SOURCES.includes(spell.source)
);

export default function Spells() {
	const [search, setSearch] = useState('');
	const [filters, setFilters] = useState(DEFAULT_FILTERS);
	const [currentPage, setCurrentPage] = useState(1);

	const updateSearch = (value: string) => {
		setSearch(value);
		setCurrentPage(1);
	};

	const updateFilter = <K extends keyof SpellFilterValues>(key: K, value: SpellFilterValues[K]) => {
		setFilters((previous) => ({ ...previous, [key]: value }));
		setCurrentPage(1);
	};

	const results = filterSpells(spells, { search, ...filters });
	const sharedNames = getSharedNames(results);
	const pageResults = results.slice((currentPage - 1) * SPELLS_PER_PAGE, currentPage * SPELLS_PER_PAGE);

	return (
		<>
			<Banner page="Spells" />
			<main className="container">
				<SearchBar value={search} onChange={updateSearch} />
				<SpellFilters filters={filters} onChange={updateFilter} />
				<ResultsCount count={results.length} />
				{pageResults.length ? (
					<>
						<CardList>
							{pageResults.map((spell) => (
								<SpellCard key={spell.id} spell={spell} showSource={sharedNames.has(spell.name)} />
							))}
						</CardList>
						<Pagination
							totalItems={results.length}
							perPage={SPELLS_PER_PAGE}
							currentPage={currentPage}
							onPageChange={setCurrentPage}
						/>
					</>
				) : (
					<p className="results">No results found</p>
				)}
				<div className="spacing"></div>
			</main>
			<Nav />
		</>
	);
}
