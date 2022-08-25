import React, { useEffect, useState } from 'react';
import axios from 'axios';
import materialize from 'materialize-css';
import $ from 'jquery';

import { SpellCard, Pagination, SpellSearch } from '../../components';
import jsonSpells from '../../spells.json';

import style from '../../styles/styles.css';

export default () => {
	const [spells, setSpells] = useState([]);
	const [filteredSpells, setFilteredSpells] = useState([]);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [spellsPerPage] = useState(30);
	const [search, setSearch] = useState('');
	const [levelFilter, setLevelFilter] = useState([]);
	const [classFilter, setClassFilter] = useState([]);
	const [schoolFilter, setSchoolFilter] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	//Get Spells from API
	useEffect(() => {
		axios
			.get('https://api.open5e.com/spells/?ordering=level_int&limit=1000')
			.then((response) => {
				const data = Array.isArray(response.data.results)
					? response.data.results
					: [response.data.results];
				Array.prototype.push.apply(data, jsonSpells);
				setSpells(data);
				setFilteredSpells(data);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, []);

	useEffect(() => {
		const elements = document.querySelectorAll('.collapsible');
		const instance = materialize.Collapsible.init(elements);
	}, [filteredSpells]);

	useEffect(() => {
		M.AutoInit();
	}, []);

	//Get current spells
	const indexOfLastSpell = currentPage * spellsPerPage;
	const indexOfFirstSpell = indexOfLastSpell - spellsPerPage;
	const currentSpells = filteredSpells.slice(indexOfFirstSpell, indexOfLastSpell);

	//Change page
	const paginate = (number) => {
		setCurrentPage(number);
	};

	// Filter all spells against search term and set NoResults to true on 0 matches.
	const handleChange = (e) => {
		const inputText = e.target.value.toLowerCase();

		switch (e.target.id) {
			case 'search':
				setSearch(inputText);
				break;
			case 'level':
				setLevelFilter($('#level').val());
				break;
			case 'class':
				setClassFilter($('#class').val());
				break;
			case 'school':
				setSchoolFilter($('#school').val());
				break;
			default:
				return;
		}
	};

	useEffect(() => {
		let spellsFromSearch = spells.filter((spell) => {
			const spellString = JSON.stringify(spell).toLowerCase();
			const spellClasses = spell.dnd_class.split(', ').map((s) => s.toLowerCase());
			return (
				(search.length > 0 ? spellString.includes(search) : true) &&
				(levelFilter.length ? levelFilter.includes(spell.level_int.toString()) : true) &&
				(classFilter.length ? classFilter.some((r) => spellClasses.includes(r)) : true) &&
				(schoolFilter.length ? schoolFilter.includes(spell.school.toLowerCase()) : true)
			);
		});

		setFilteredSpells(spellsFromSearch);
		setCurrentPage(1);
	}, [search, levelFilter, classFilter, schoolFilter]);

	// Reset all search filters
	const resetSearchFilters = (e) => {
		e.preventDefault();
		setSearch('');
		setLevelFilter([]);
		setClassFilter([]);
		setSchoolFilter([]);
		console.log(levelFilter);
	};

	return (
		<>
			<main>
				<h1>5e: Spells</h1>
				<SpellSearch
					handleChange={handleChange}
					search={search}
					levelFilter={levelFilter}
					classFilter={classFilter}
					schoolFilter={schoolFilter}
					filteredSpells={filteredSpells}
					resetSearchFilters={resetSearchFilters}
				/>
				<hr />
				{currentSpells.length ? (
					<ul className="collapsible">
						{currentSpells.map((spell) => (
							<SpellCard key={spell.name} spell={spell} />
						))}
					</ul>
				) : error ? (
					<p>{error}</p>
				) : isLoading ? (
					<div className="loader"></div>
				) : null}
				<Pagination
					spellsPerPage={spellsPerPage}
					totalSpells={filteredSpells.length}
					paginate={paginate}
					currentPage={currentPage}
				/>
			</main>
		</>
	);
};
