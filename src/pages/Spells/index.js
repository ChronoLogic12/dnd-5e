import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import materialize from 'materialize-css';

import { SpellCard, Pagination, SpellSearch, Navbar } from '../../components';
import jsonSpells from '../../spells.json';

export default () => {
	const [spells, setSpells] = useState([]);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [spellsPerPage] = useState(30);
	const [search, setSearch] = useState('');
	const [levelFilter, setLevelFilter] = useState([]);
	const [classFilter, setClassFilter] = useState([]);
	const [schoolFilter, setSchoolFilter] = useState([]);
	const [concentrationFilter, setConcentrationFilter] = useState(false);
	const [ritualFilter, setRitualFilter] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	//Get Spells from API
	useEffect(() => {
		axios
			.get('https://api.open5e.com/spells/?ordering=level_int&limit=1000')
			.then((response) => {
				const data = Array.isArray(response.data.results)
					? response.data.results
					: [response.data.results];
				setSpells([...data, ...jsonSpells]);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, []);

	useEffect(() => {
		materialize.AutoInit();
	}, [isLoading]);

	useEffect(() => {
		setCurrentPage(1);
	}, [search, levelFilter, classFilter, schoolFilter, concentrationFilter, ritualFilter]);

	const getSearchResults = () => {
		return spells.filter((spell) => {
			const spellString = JSON.stringify(spell).toLowerCase();
			const spellClasses = spell.dnd_class.split(', ').map((s) => s.toLowerCase());
			return (
				(search.length > 0 ? spellString.includes(search) : true) &&
				(levelFilter.length ? levelFilter.includes(spell.level_int.toString()) : true) &&
				(classFilter.length ? classFilter.some((r) => spellClasses.includes(r)) : true) &&
				(schoolFilter.length ? schoolFilter.includes(spell.school.toLowerCase()) : true) &&
				(concentrationFilter ? spell.concentration == 'yes' : true) &&
				(ritualFilter ? spell.ritual == 'yes' : true)
			);
		});
	};

	const getCurrentPageSearchResults = () => {
		const allSearchResults = getSearchResults();
		const indexOfLastSpell = currentPage * spellsPerPage;
		const indexOfFirstSpell = indexOfLastSpell - spellsPerPage;
		return [allSearchResults.slice(indexOfFirstSpell, indexOfLastSpell), allSearchResults.length];
	};

	const renderSearchResults = () => {
		const [currentSpells, spellCount] = getCurrentPageSearchResults();

		return (
			<>
				<SpellSearch
					search={search}
					levelFilter={levelFilter}
					classFilter={classFilter}
					schoolFilter={schoolFilter}
					concentrationFilter={concentrationFilter}
					ritualFilter={ritualFilter}
					setSearch={setSearch}
					setLevelFilter={setLevelFilter}
					setClassFilter={setClassFilter}
					setSchoolFilter={setSchoolFilter}
					setConcentrationFilter={setConcentrationFilter}
					setRitualFilter={setRitualFilter}
					spellCount={spellCount}
				/>
				<hr />
				{currentSpells.length ? (
					<>
						<ul className="collapsible">
							{currentSpells.map((spell) => (
								<SpellCard key={spell.name} spell={spell} />
							))}
						</ul>
						<Pagination
							spellsPerPage={spellsPerPage}
							totalSpells={spellCount}
							paginate={setCurrentPage}
							currentPage={currentPage}
						/>
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
			{/* <Navbar /> */}
			<main className="container">
				<h1>
					<Link to="/">
						<span className="red-text">5e:</span>
					</Link>{' '}
					Spells
				</h1>
				{renderSearchResults()}
				<div className="spacing"></div>
			</main>
		</>
	);
};
