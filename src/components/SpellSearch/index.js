import React from 'react';

import css from './style.module.css';

import { getSelectedOptionValues } from '../../utils';
import { IoFilter } from 'react-icons/io5';

export default (props) => {
	const handleSearchInputChange = ({ target }) => {
		props.setSearch(target.value);
	};

	const handleLevelInputChange = ({ target }) => {
		let value = getSelectedOptionValues(target.options);
		props.setLevelFilter(value);
	};

	const handleClassInputChange = ({ target }) => {
		let value = getSelectedOptionValues(target.options);
		props.setClassFilter(value);
	};

	const handleSchoolInputChange = ({ target }) => {
		let value = getSelectedOptionValues(target.options);
		props.setSchoolFilter(value);
	};

	const handleCastingInputChange = ({ target }) => {
		let value = getSelectedOptionValues(target.options);
		props.setCastingFilter(value);
	};

	const handleConcentrationCheckboxChange = () => {
		props.setConcentrationFilter((prevState) => !prevState);
	};

	const handleRitualCheckboxChange = () => {
		props.setRitualFilter((prevState) => !prevState);
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
							{/* Level */}
							<div className="container">
								<label htmlFor="level">Level:</label>
								<select
									name="level"
									id="level"
									value={props.levelFilter}
									className={css.dropdown}
									onChange={handleLevelInputChange}
									multiple
								>
									<option defaultValue="" disabled>
										Select Spell Level
									</option>
									<option value="0">Cantrip</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
								</select>
							</div>
							{/* Class */}
							<div className="container">
								<label htmlFor="class">Class:</label>
								<select
									name="class"
									id="class"
									value={props.classFilter}
									onChange={handleClassInputChange}
									multiple
								>
									<option defaultValue="" disabled>
										Select Class
									</option>
									<option value="bard">Bard</option>
									<option value="cleric">Cleric</option>
									<option value="druid">Druid</option>
									<option value="paladin">Paladin</option>
									<option value="ranger">Ranger</option>
									<option value="sorcerer">Sorcerer</option>
									<option value="warlock">Warlock</option>
									<option value="wizard">Wizard</option>
								</select>
							</div>
							{/* School */}
							<div className="container">
								<label htmlFor="school">School:</label>
								<select
									name="school"
									id="school"
									value={props.schoolFilter}
									onChange={handleSchoolInputChange}
									multiple
								>
									<option defaultValue="" disabled>
										Select Spell School
									</option>
									<option value="abjuration">Abjuration</option>
									<option value="enchantment">Enchantment</option>
									<option value="conjuration">Conjuration</option>
									<option value="divination">Divination</option>
									<option value="evocation">Evocation</option>
									<option value="illusion">Illusion</option>
									<option value="necromancy">Necromancy</option>
									<option value="transmutation">Transmutation</option>
								</select>
							</div>
							{/* Casting time */}
							<div className="container">
								<label htmlFor="casting">Casting Time:</label>
								<select
									name="casting"
									id="casting"
									value={props.castingFilter}
									onChange={handleCastingInputChange}
									multiple
								>
									<option defaultValue="" disabled>
										Select Casting Time
									</option>
									<option value="1 action">Action</option>
									<option value="1 bonus action">Bonus Action</option>
									<option value="reaction">Reaction</option>
								</select>
							</div>
							<div className="container">
								<p>
									<label>
										<input
											type="checkbox"
											name="concentration"
											id="concentration"
											value={props.concentrationFilter}
											onChange={handleConcentrationCheckboxChange}
											checked={props.concentrationFilter}
										/>
										<span>Concentration</span>
									</label>
								</p>
								<p>
									<label>
										<input
											type="checkbox"
											name="ritual"
											id="ritual"
											value={props.ritualFilter}
											onChange={handleRitualCheckboxChange}
											checked={props.ritualFilter}
										/>
										<span>Ritual</span>
									</label>
								</p>
							</div>
						</div>
					</li>
				</ul>
			</form>
			<p className="results">Results found: {props.spellCount}</p>
		</>
	);
};
