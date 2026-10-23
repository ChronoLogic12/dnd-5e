import React from 'react';

import { Banner, Nav, CardList, Pagination, ResultsCount, SearchBar } from '../../components';
import SpellCard from './components/SpellCard';
import SpellFilters, { CORE_FILTER } from './components/SpellFilters';
import handmadeSpells from '../../data/handmade/spells.json';
import openSpells from '../../data/spells.json';
import { coreSource, isShownInEdition, sources } from '../../data/sources';
import type { SourceKey } from '../../data/sources';
import { useEdition } from '../../utils/edition';
import { usePagedResults } from '../../utils/usePagedResults';
import { filterSpells } from './utils';
import { getSharedNames } from '../../utils/getSharedNames';
import { useSpellParams } from './useSpellParams';
import type { Spell } from './types';

const SHOWN_SOURCES: SourceKey[] = [
	'srd-2014',
	'srd-2024',
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

const spells = [...(handmadeSpells as Spell[]), ...(openSpells as Spell[])].filter((spell) =>
	SHOWN_SOURCES.includes(spell.source)
);

export default function Spells() {
	const { search, filters, page, open, setSearch, setFilter, setPage, setOpen } = useSpellParams();
	const { edition } = useEdition();

	const results = filterSpells(
		spells.filter((spell) => isShownInEdition(spell.source, edition)),
		{
			search,
			...filters,
			documentFilter: filters.documentFilter.map((source) => (source === CORE_FILTER ? coreSource(edition) : source)),
		}
	);
	const sharedNames = getSharedNames(results);
	const { currentPage, pageResults } = usePagedResults({
		results,
		perPage: SPELLS_PER_PAGE,
		page,
		setPage,
		open,
		setOpen,
		edition,
	});

	return (
		<>
			<Banner page="Spells" />
			<main className="container">
				<SearchBar value={search} onChange={setSearch} />
				<SpellFilters filters={filters} coreLabel={sources[coreSource(edition)].title} onChange={setFilter} />
				<ResultsCount count={results.length} />
				{pageResults.length ? (
					<>
						<CardList open={open} onOpenChange={setOpen}>
							{pageResults.map((spell) => (
								<SpellCard key={spell.id} spell={spell} showSource={sharedNames.has(spell.name)} />
							))}
						</CardList>
						<Pagination
							totalItems={results.length}
							perPage={SPELLS_PER_PAGE}
							currentPage={currentPage}
							onPageChange={setPage}
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
