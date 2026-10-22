import React, { useEffect, useState } from 'react';
import materialize from 'materialize-css';

import { Banner, Nav, CollapsibleList } from '../../components';
import SpellCard from './components/SpellCard';
import SpellSearch from './components/SpellSearch';
import Pagination from './components/Pagination';
import handmadeSpells from '../../data/handmade/spells.json';
import openSpells from '../../data/spells.json';
import type { SourceKey } from '../../data/sources';
import { filterSpells } from './utils';
import { getSharedNames } from '../../utils/getSharedNames';
import type { Spell } from './types';

const SHOWN_SOURCES: SourceKey[] = [
	'srd-2014',
	'phb-2014',
	'a5e-ag',
	'deepm',
	'deepmx',
	'wz',
	'kp',
	'toh',
	'open5e',
];

const allSpells = [...(handmadeSpells as Spell[]), ...(openSpells as Spell[])].filter((spell) =>
	SHOWN_SOURCES.includes(spell.source)
);

export default function Spells() {
	const [spells, setSpells] = useState<Spell[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [spellsPerPage] = useState(30);
	const [search, setSearch] = useState('');
	const [levelFilter, setLevelFilter] = useState<string[]>([]);
	const [classFilter, setClassFilter] = useState<string[]>([]);
	const [schoolFilter, setSchoolFilter] = useState<string[]>([]);
	const [castingFilter, setCastingFilter] = useState<string[]>([]);
	const [concentrationFilter, setConcentrationFilter] = useState(false);
	const [ritualFilter, setRitualFilter] = useState(false);
	const [documentFilter, setDocumentFilter] = useState<string[]>(['srd-2014']);
	const [isLoading, setIsLoading] = useState(true);

	//Set spell list to all unique spells
	useEffect(() => {
		setSpells(allSpells);
		setIsLoading(false);
	}, []);

	useEffect(() => {
		materialize.AutoInit();
	}, [isLoading]);

	useEffect(() => {
		setCurrentPage(1);
	}, [
		search,
		levelFilter,
		classFilter,
		schoolFilter,
		concentrationFilter,
		ritualFilter,
		castingFilter,
		documentFilter,
	]);

	const getSearchResults = () =>
		filterSpells(spells, {
			search,
			levelFilter,
			classFilter,
			schoolFilter,
			castingFilter,
			documentFilter,
			concentrationFilter,
			ritualFilter,
		});

	const getCurrentPageSearchResults = (): [Spell[], number, Set<string>] => {
		const allSearchResults = getSearchResults();
		const indexOfLastSpell = currentPage * spellsPerPage;
		const indexOfFirstSpell = indexOfLastSpell - spellsPerPage;
		return [
			allSearchResults.slice(indexOfFirstSpell, indexOfLastSpell),
			allSearchResults.length,
			getSharedNames(allSearchResults),
		];
	};

	const renderSearchResults = () => {
		const [currentSpells, spellCount, sharedSpellNames] = getCurrentPageSearchResults();

		return (
			<>
				<SpellSearch
					search={search}
					levelFilter={levelFilter}
					classFilter={classFilter}
					schoolFilter={schoolFilter}
					castingFilter={castingFilter}
					documentFilter={documentFilter}
					concentrationFilter={concentrationFilter}
					ritualFilter={ritualFilter}
					setSearch={setSearch}
					setLevelFilter={setLevelFilter}
					setClassFilter={setClassFilter}
					setSchoolFilter={setSchoolFilter}
					setCastingFilter={setCastingFilter}
					setConcentrationFilter={setConcentrationFilter}
					setRitualFilter={setRitualFilter}
					setDocumentFilter={setDocumentFilter}
					spellCount={spellCount}
				/>
				<hr className="rule" />
				{currentSpells.length ? (
					<>
						<CollapsibleList>
							{currentSpells.map((spell) => (
								<SpellCard
									key={spell.id}
									spell={spell}
									showSource={sharedSpellNames.has(spell.name)}
								/>
							))}
						</CollapsibleList>
						<Pagination
							spellsPerPage={spellsPerPage}
							totalSpells={spellCount}
							paginate={setCurrentPage}
							currentPage={currentPage}
						/>
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
			<Banner page="Spells" />
			<main className="container">
				{renderSearchResults()}
				<div className="spacing"></div>
			</main>
			<Nav />
		</>
	);
}
