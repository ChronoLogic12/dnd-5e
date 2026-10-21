import React from 'react';


interface ConditionsSearchProps {
	search: string;
	setSearch: (search: string) => void;
	conditionsCount: number;
}

export default function ConditionsSearch(props: ConditionsSearchProps) {
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
			<p className="results">Results found: {props.conditionsCount}</p>
		</>
	);
}
