import React, { useEffect, useState } from 'react';
import axios from 'axios';
import materialize from 'materialize-css';

import { SpellCard, Pagination } from '../../components';

import style from '../../styles/styles.css';

export default () => {
	const [spells, setSpells] = useState([]);
	const [filteredSpells, setFilteredSpells] = useState([]);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [spellsPerPage] = useState(30);
	const [search, setSearch] = useState('');
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

	console.log(filteredSpells);

	//Get current spells
	const indexOfLastSpell = currentPage * spellsPerPage;
	const indexOfFirstSpell = indexOfLastSpell - spellsPerPage;
	const currentSpells = filteredSpells.slice(indexOfFirstSpell, indexOfLastSpell);

	//Change page
	const paginate = (number) => {
		setCurrentPage(number);
	};

	const handleChange = (e) => {
		const inputText = e.target.value.toLowerCase();
		setSearch(inputText);
		const spellsFromSearch = spells.filter((spell) => {
			const spellString = JSON.stringify(spell).toLowerCase();
			return spellString.includes(inputText);
		});
		setFilteredSpells(spellsFromSearch);
	};

	return (
		<>
			<main>
				<h1>Spells</h1>
				<form action="" onSubmit={(event) => event.preventDefault()}>
					<div className="input-field">
						<i className="material-icons prefix">search</i>
						<label htmlFor="search">Search: </label>
						<input
							type="text"
							value={search}
							id="id-search"
							name="search"
							onChange={handleChange}
						/>
					</div>
				</form>
				<p>Results found: {filteredSpells.length}</p>
				<hr />
				{currentSpells.length ? (
					<ul className="collapsible">
						{currentSpells.map((spell) => (
							<SpellCard key={spell.name} spell={spell} />
						))}
					</ul>
				) : error ? (
					<p>{error}</p>
				) : (
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
