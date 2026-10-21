import React, { useState, useEffect } from 'react';
import materialize from 'materialize-css';

import jsonFeats from '../../data/feats.json';
import { FeatCard, FeatsSearch, Banner, Nav, CollapsibleList } from '../../components';
import type { Feat } from '../../types/data';

export default function Feats() {
	const [feats, setFeats] = useState<Feat[]>([]);
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
			const featString = JSON.stringify(feat).toLowerCase();
			return search.length > 0 ? featString.includes(search.toLowerCase()) : true;
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
						<CollapsibleList>
							{currentFeats.map((feat) => (
								<FeatCard key={feat.name} feat={feat} />
							))}
						</CollapsibleList>
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
}
