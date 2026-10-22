import React, { useState, useEffect } from 'react';
import materialize from 'materialize-css';

import { Banner, Nav, CollapsibleList } from '../../components';
import ConditionCard from './components/ConditionCard';
import ConditionsSearch from './components/ConditionsSearch';
import conditionsData from '../../data/conditions.json';
import { sources } from '../../data/sources';
import type { SourceKey } from '../../data/sources';
import type { Condition } from './types';

const SHOWN_SOURCES: SourceKey[] = ['srd-2014'];

const conditions = (conditionsData as Condition[]).filter((condition) =>
	SHOWN_SOURCES.includes(condition.source)
);

const getSearchText = (condition: Condition) =>
	[condition.name, condition.desc, sources[condition.source].title].join(' ').toLowerCase();

export default function Conditions() {
	const [search, setSearch] = useState('');

	useEffect(() => {
		materialize.AutoInit();
	}, []);

	const getSearchResults = () => {
		return conditions.filter((condition) => {
			return search.length > 0 ? getSearchText(condition).includes(search.toLowerCase()) : true;
		});
	};

	const renderSearchResults = () => {
		const currentConditions = getSearchResults();
		const conditionsCount = currentConditions.length;

		return (
			<>
				<ConditionsSearch search={search} setSearch={setSearch} conditionsCount={conditionsCount} />
				<hr className="rule" />
				{currentConditions.length ? (
					<>
						<CollapsibleList>
							{currentConditions.map((condition) => (
								<ConditionCard key={condition.id} condition={condition} />
							))}
						</CollapsibleList>
					</>
				) : (
					<div>No results found</div>
				)}
			</>
		);
	};

	return (
		<>
			<Banner page="Conditions" />
			<main className="container">
				{renderSearchResults()}
				<div className="spacing"></div>
			</main>
			<Nav />
		</>
	);
}
