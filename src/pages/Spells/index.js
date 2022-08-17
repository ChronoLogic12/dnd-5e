import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { SpellCard } from '../../components';

export default () => {
	const [spells, setSpells] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get('https://api.open5e.com/spells/?ordering=level_int ')
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

	return (
		<>
			<main>
				<h1>Spells</h1>
				<hr />
				{spells.length ? (
					spells.map((spell) => (
						<div key={spell.count}>
							<SpellCard key={spell.count} spell={spell} />
							<hr />
						</div>
					))
				) : error ? (
					<p>{error}</p>
				) : (
					<h4>Loading Posts...</h4>
				)}
			</main>
		</>
	);
};
