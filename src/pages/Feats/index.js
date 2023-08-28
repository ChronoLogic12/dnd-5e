import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import materialize from 'materialize-css';

import jsonFeats from '../../data/feats.json';
import { FeatCard, FeatsSearch, Banner, Nav } from '../../components';

export default () => {
	const [feats, setFeats] = useState([]);
	const [search, setSearch] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	//Get Feats
	useEffect(() => {
		setFeats(jsonFeats);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		materialize.AutoInit();
	}, [isLoading]);

	const getSearchResults = () => {
		return feats.filter((feat) => {
			const conditionString = JSON.stringify(feat).toLowerCase();
			return search.length > 0 ? conditionString.includes(search) : true;
		});
	};

	const renderSearchResults = () => {
		const currentFeats = getSearchResults();
		const featsCount = currentFeats.length;

		return (
			<>
				<FeatsSearch search={search} setSearch={setSearch} featsCount={featsCount} />
				<hr className="rule" />

				{currentFeats.length ? (
					<>
						<ul className="collapsible">
							{currentFeats.map((feat) => (
								<FeatCard key={feat.name} feat={feat} />
							))}
						</ul>
					</>
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
			<Banner page="Feats" />
			<main className="container">
				{renderSearchResults()}
				<div className="spacing"></div>
			</main>
			<Nav />
		</>
	);
};
