import React from 'react';

import css from './style.module.css';

import { getSelectedOptionValues } from '../../utils';
import { IoFilter } from 'react-icons/io5';

const cRValues = [
	'0',
	'1/8',
	'1/4',
	'1/2',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'17',
	'18',
	'19',
	'20',
	'21',
	'22',
	'23',
	'24',
	'25',
	'26',
	'27',
	'30',
];

export default (props) => {
	const handleSearchInputChange = ({ target }) => {
		props.setSearch(target.value);
	};

	const handleChallengeRatingInputChange = ({ target }) => {
		let value = getSelectedOptionValues(target.options);
		props.setChallengeRatingFilter(value);
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
				<ul className="collapsible col m6 s12">
					<li>
						<div className="collapsible-header valign-wrapper">
							<IoFilter className={css.icon} />
							Filter
						</div>
						<div className="collapsible-body white">
							{/* Challenge Rating */}
							<div className="container">
								<label htmlFor="cr">Challenge Rating:</label>
								<select
									name="cr"
									id="cr"
									value={props.challengeRatingFilter}
									className={css.dropdown}
									onChange={handleChallengeRatingInputChange}
								>
									<option defaultValue="" disabled>
										Select Challenge Rating
									</option>
									<option value="null">-No filter-</option>
									{cRValues.map((n) => {
										return (
											<option key={n} value={n}>
												{n}
											</option>
										);
									})}
								</select>
							</div>
						</div>
					</li>
				</ul>
			</form>
			<p className="results">Results found: {props.count}</p>
		</>
	);
};
