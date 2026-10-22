import React, { useState, useEffect } from 'react';
import materialize from 'materialize-css';

import handmadeFeats from '../../data/handmade/feats.json';
import openFeats from '../../data/feats.json';
import { sources } from '../../data/sources';
import type { SourceKey } from '../../data/sources';
import { Banner, Nav, CollapsibleList } from '../../components';
import FeatCard from './components/FeatCard';
import FeatsSearch from './components/FeatsSearch';
import type { Feat } from './types';

const SHOWN_SOURCES: SourceKey[] = ['phb-2014', 'tce', 'xge'];

const allFeats = [...(handmadeFeats as Feat[]), ...(openFeats as Feat[])].filter((feat) =>
	SHOWN_SOURCES.includes(feat.source)
);

const getSearchText = (feat: Feat) =>
	[feat.name, feat.prerequisite, feat.desc, sources[feat.source].title].join(' ').toLowerCase();

export default function Feats() {
	const [feats, setFeats] = useState<Feat[]>([]);
	const [search, setSearch] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	//Get Feats
	useEffect(() => {
		setFeats(allFeats);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		materialize.AutoInit();
	}, [isLoading]);

	const getSearchResults = () => {
		return feats.filter((feat) => {
			return search.length > 0 ? getSearchText(feat).includes(search.toLowerCase()) : true;
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
								<FeatCard key={feat.id} feat={feat} />
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
