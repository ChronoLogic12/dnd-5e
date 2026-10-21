import React from 'react';


interface FeatsSearchProps {
	search: string;
	setSearch: (search: string) => void;
	featsCount: number;
}

export default function FeatsSearch(props: FeatsSearchProps) {
	const handleSearchInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
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
			<p className="results">Results found: {props.featsCount}</p>
		</>
	);
}
