import React, { useState } from 'react';

import { Banner, Nav, CardList, ResultsCount, SearchBar } from '../../components';
import ConditionCard from './components/ConditionCard';
import conditionsData from '../../data/conditions.json';
import { isShownInEdition, sources } from '../../data/sources';
import type { SourceKey } from '../../data/sources';
import type { Condition } from './types';
import { useEdition } from '../../utils/edition';

const SHOWN_SOURCES: SourceKey[] = ['srd-2014', 'srd-2024'];

const conditions = (conditionsData as Condition[]).filter((condition) =>
	SHOWN_SOURCES.includes(condition.source)
);

const getSearchText = (condition: Condition) =>
	[condition.name, condition.desc, sources[condition.source].title].join(' ').toLowerCase();

export default function Conditions() {
	const [search, setSearch] = useState('');
	const { edition } = useEdition();

	const results = conditions.filter(
		(condition) =>
			isShownInEdition(condition.source, edition) &&
			(!search || getSearchText(condition).includes(search.toLowerCase()))
	);

	return (
		<>
			<Banner page="Conditions" />
			<main className="container">
				<SearchBar value={search} onChange={setSearch} />
				<ResultsCount count={results.length} />
				{results.length ? (
					<CardList>
						{results.map((condition) => (
							<ConditionCard key={condition.id} condition={condition} />
						))}
					</CardList>
				) : (
					<p className="results">No results found</p>
				)}
				<div className="spacing"></div>
			</main>
			<Nav />
		</>
	);
}
