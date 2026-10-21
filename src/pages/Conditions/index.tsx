import React, { useState, useEffect } from 'react';
import materialize from 'materialize-css';

import { ConditionCard, ConditionsSearch, Banner, Nav, CollapsibleList } from '../../components';
import conditions from '../../data/conditions.json';

export default function Conditions() {
	const [search, setSearch] = useState('');

	useEffect(() => {
		materialize.AutoInit();
	}, []);

	const getSearchResults = () => {
		return conditions.filter((condition) => {
			const conditionString = JSON.stringify(condition).toLowerCase();
			return search.length > 0 ? conditionString.includes(search.toLowerCase()) : true;
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
								<ConditionCard key={condition.name} condition={condition} />
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
