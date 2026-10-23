import React, { useState } from 'react';

import handmadeFeats from '../../data/handmade/feats.json';
import openFeats from '../../data/feats.json';
import { isShownInEdition, sources } from '../../data/sources';
import type { SourceKey } from '../../data/sources';
import { Banner, Nav, CardList, ResultsCount, SearchBar } from '../../components';
import FeatCard from './components/FeatCard';
import type { Feat } from './types';
import { useEdition } from '../../utils/edition';

const SHOWN_SOURCES: SourceKey[] = ['phb-2014', 'tce', 'xge', 'srd-2024'];

const feats = [...(handmadeFeats as Feat[]), ...(openFeats as Feat[])].filter((feat) =>
	SHOWN_SOURCES.includes(feat.source)
);

const getSearchText = (feat: Feat) =>
	[feat.name, feat.prerequisite, feat.desc, sources[feat.source].title].join(' ').toLowerCase();

export default function Feats() {
	const [search, setSearch] = useState('');
	const { edition } = useEdition();

	const results = feats.filter(
		(feat) =>
			isShownInEdition(feat.source, edition) && (!search || getSearchText(feat).includes(search.toLowerCase()))
	);

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
