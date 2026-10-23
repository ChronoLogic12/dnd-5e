import React, { useState } from 'react';

import handmadeFeats from '../../data/handmade/feats.json';
import openFeats from '../../data/feats.json';
import { sources } from '../../data/sources';
import type { SourceKey } from '../../data/sources';
import { Banner, Nav, CardList, ResultsCount, SearchBar } from '../../components';
import FeatCard from './components/FeatCard';
import type { Feat } from './types';

const SHOWN_SOURCES: SourceKey[] = ['phb-2014', 'tce', 'xge'];

const feats = [...(handmadeFeats as Feat[]), ...(openFeats as Feat[])].filter((feat) =>
	SHOWN_SOURCES.includes(feat.source)
);

const getSearchText = (feat: Feat) =>
	[feat.name, feat.prerequisite, feat.desc, sources[feat.source].title].join(' ').toLowerCase();

export default function Feats() {
	const [search, setSearch] = useState('');

	const results = search ? feats.filter((feat) => getSearchText(feat).includes(search.toLowerCase())) : feats;

	return (
		<>
			<Banner page="Feats" />
			<main className="container">
				<SearchBar value={search} onChange={setSearch} />
				<ResultsCount count={results.length} />
				{results.length ? (
					<CardList>
						{results.map((feat) => (
							<FeatCard key={feat.id} feat={feat} />
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
