import React, { useEffect, useState } from 'react';
import axios from 'axios';
import materialize from 'materialize-css';
import $ from 'jquery';

import { SpellCard, Pagination, SpellSearch } from '../../components';

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
	const [noResults, setNoResults] = useState(false);

	//Get Spells from API
	useEffect(() => {
		axios
			.get('https://api.open5e.com/spells/?ordering=level_int&limit=1000')
			.then((response) => {
				const data = Array.isArray(response.data.results)
					? response.data.results
					: [response.data.results];
				setSpells(data);
				setFilteredSpells(data);
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
		const levelArray = $('#level').val();
		const classArray = $('#class').val();
		const schoolArray = $('#school').val();

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

		const filter = {
			level_int: levelArray,
			class: classArray,
			school: schoolArray,
		};

		let spellsFromSearch = spells.filter((spell) => {
			const spellString = JSON.stringify(spell).toLowerCase();
			const spellClasses = spell.dnd_class.split(', ').map((s) => s.toLowerCase());
			return (
				spellString.includes(inputText) &&
				(filter.level_int.length ? filter.level_int.includes(spell.level_int.toString()) : true) &&
				(filter.class.length ? filter.class.every((r) => spellClasses.includes(r)) : true) &&
				(filter.school.length ? filter.school.includes(spell.school.toLowerCase()) : true)
			);
		});
		setFilteredSpells(spellsFromSearch);
		spellsFromSearch.length == 0 ? setNoResults(true) : setNoResults(false);
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
				) : noResults ? null : (
					<div className="loader"></div>
				)}
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
