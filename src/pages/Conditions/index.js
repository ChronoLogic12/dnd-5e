import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import materialize from 'materialize-css';

import { ConditionCard, ConditionsSearch } from '../../components';

export default () => {
	const [conditions, setConditions] = useState([]);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	//Get Conditions from API
	useEffect(() => {
		axios
			.get('https://api.open5e.com/conditions')
			.then((response) => {
				const data = Array.isArray(response.data.results)
					? response.data.results
					: [response.data.results];
				setConditions(data);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, []);

	useEffect(() => {
		materialize.AutoInit();
	}, [isLoading]);

	const getSearchResults = () => {
		return conditions.filter((condition) => {
			const conditionString = JSON.stringify(condition).toLowerCase();
			return search.length > 0 ? conditionString.includes(search) : true;
		});
	};

	const renderSearchResults = () => {
		const currentConditions = getSearchResults();
		const conditionsCount = currentConditions.length;

		return (
			<>
				<ConditionsSearch search={search} setSearch={setSearch} conditionsCount={conditionsCount} />
				<hr />
				{currentConditions.length ? (
					<>
						<ul className="collapsible">
							{currentConditions.map((condition) => (
								<ConditionCard key={condition.name} condition={condition} />
							))}
						</ul>
					</>
				) : error ? (
					<p>{error}</p>
				) : isLoading ? (
					<div className="loader"></div>
				) : (
					<div>No results found</div>
				)}
			</>
		);
	};

	return (
		<>
			<main className="container">
				<h1>
					<Link to="/">
						<span className="red-text home">5e:</span>
					</Link>{' '}
					Conditions
				</h1>
				{renderSearchResults()}
				<div className="spacing"></div>
			</main>
		</>
	);
};
