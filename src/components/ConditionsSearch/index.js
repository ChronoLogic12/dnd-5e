import React from 'react';

import { IoFilter } from 'react-icons/io5';

export default (props) => {
	const handleSearchInputChange = ({ target }) => {
		props.setSearch(target.value);
	};

	return (
		<>
			<form className="" action="" onSubmit={(event) => event.preventDefault()}>
				<div className="input-field valign-wrapper">
					<i className="material-icons prefix">search</i>
					<label htmlFor="search">Search: </label>
					<input
						type="text"
						value={props.search}
						id="search"
						name="search"
						onChange={handleSearchInputChange}
					/>
				</div>
			</form>
			<p>Results found: {props.conditionsCount}</p>
		</>
	);
};
