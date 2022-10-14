import React from 'react';
import M from 'materialize-css';

export default ({ totalMonsters, paginate, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalMonsters / 50); i++) {
		pageNumbers.push(i);
	}

	const handleNextPageClick = () => {
		if (currentPage == pageNumbers.length) {
			return null;
		}
		paginate(currentPage + 1);
	};

	const handlePrevPageClick = () => {
		if (currentPage == 1) {
			return null;
		}
		paginate(currentPage - 1);
	};

	return (
		<ul className="pagination center">
			<li className={currentPage == 1 ? 'disabled' : 'wave-effect'}>
				<a
					href="#!"
					onClick={() => {
						handlePrevPageClick();
					}}
				>
					<i className="material-icons">chevron_left</i>
				</a>
			</li>
			{pageNumbers.map((number) => {
				return (
					<li key={number}>
						<a
							className={currentPage == number ? 'red-text bold' : 'wave-effect'}
							onClick={() => {
								paginate(number);
							}}
							href="#!"
						>
							{number}
						</a>
					</li>
				);
			})}
			<li className={currentPage == pageNumbers.length ? 'disabled' : 'wave-effect'}>
				<a
					href="#!"
					onClick={() => {
						handleNextPageClick();
					}}
				>
					<i className="material-icons">chevron_right</i>
				</a>
			</li>
		</ul>
	);
};
