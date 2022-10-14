import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import materialize from 'materialize-css';

import { MonsterCard, MonstersPagination, Banner } from '../../components';

export default () => {
	const [monsters, setMonsters] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [count, setCount] = useState(0);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	//Get Spells from API
	useEffect(() => {
		axios
			.get(`https://api.open5e.com/monsters/?page=${currentPage}`)
			.then((response) => {
				const data = Array.isArray(response.data.results)
					? response.data.results
					: [response.data.results];
				setMonsters(data);
				setCount(response.data.count);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, [currentPage]);

	useEffect(() => {
		materialize.AutoInit();
	}, [isLoading]);

	const renderSearchResults = () => {
		return (
			<>
				<hr className="rule" />
				{monsters.length ? (
					<>
						<ul className="collapsible">
							{monsters.map((monster) => (
								<MonsterCard key={monster.name} monster={monster} />
							))}
						</ul>
						<MonstersPagination
							totalMonsters={count}
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
			<Banner page="Monsters" />
			<main className="container">
				{renderSearchResults()}
				<div className="spacing"></div>
			</main>
		</>
	);
};
