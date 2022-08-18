import React from 'react';
import M from 'materialize-css';

export default ({ spellsPerPage, totalPosts, paginate, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / spellsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<ul className="pagination">
			<li className={currentPage == 1 ? 'disabled' : 'wave-effect'}>
				<a href="#!">
					<i className="material-icons">chevron_left</i>
				</a>
			</li>
			{pageNumbers.map((number) => {
				return (
					<li key={number}>
						<a
							className={currentPage == number ? 'z-depth-2 grey darken-3 red-text' : 'wave-effect'}
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
			<li className={currentPage == pageNumbers.length ? 'disabled' : 'waves-effect'}>
				<a href="#!">
					<i className="material-icons">chevron_right</i>
				</a>
			</li>
		</ul>
	);
};
