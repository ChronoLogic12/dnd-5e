import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { SpellCard, Pagination } from '../../components';

export default () => {
	const [spells, setSpells] = useState([]);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [spellsPerPage] = useState(30);

	//Get Spells from API
	useEffect(() => {
		axios
			.get('https://api.open5e.com/spells/?ordering=level_int&limit=1000')
			.then((response) => {
				const data = Array.isArray(response.data.results)
					? response.data.results
					: [response.data.results];
				setSpells(data);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, []);

	//Get current spells
	const indexOfLastSpell = currentPage * spellsPerPage;
	const indexOfFirstSpell = indexOfLastSpell - spellsPerPage;
	const currentSpells = spells.slice(indexOfFirstSpell, indexOfLastSpell);

	//Change page
	const paginate = (number) => {
		setCurrentPage(number);
	};

	return (
		<>
			<main>
				<h1>Spells</h1>
				<p>Results found: {spells.length}</p>
				<hr />
				{currentSpells.length ? (
					currentSpells.map((spell) => (
						<div key={spell.name}>
							<SpellCard spell={spell} />
							<hr />
						</div>
					))
				) : error ? (
					<p>{error}</p>
				) : (
					<h4>Loading Posts...</h4>
				)}
				<Pagination
					spellsPerPage={spellsPerPage}
					totalPosts={spells.length}
					paginate={paginate}
					currentPage={currentPage}
				/>
			</main>
		</>
	);
};
