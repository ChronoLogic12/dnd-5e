import React from 'react';
import css from './style.module.css';

const prependPlusSymbol = (value) => {
	if (value > 0) {
		return `+${value}`;
	} else {
		return value;
	}
};

const calculateModifier = (score) => {
	return prependPlusSymbol(Math.floor((score - 10) / 2));
};

const calculateSavingThrow = (score, stat) => {
	return prependPlusSymbol(+calculateModifier(score) + (stat != null ? +stat : 0));
};

export default (props) => {
	return (
		<li>
			<header className="collapsible-header valign-wrapper">
				<h6>{props.monster.name}</h6>
				<p className={css.cr}>{props.monster.challenge_rating}</p>
			</header>
			<div className="collapsible-body white">
				{props.monster.size} {props.monster.type}, {props.monster.alignment}
				<hr className={css.rule} />
				<p>
					<strong>Armor Class: </strong>
					{props.monster.armor_class}
				</p>
				<p>
					<strong>Hit Points: </strong>
					{props.monster.hit_points} ({props.monster.hit_dice})
				</p>
				<p>
					<strong>Speed: </strong>
					{Object.entries(props.monster.speed).map(([key, value]) => (
						<span key={key} className="capitalize">
							{key}: {value}.{' '}
						</span>
					))}
				</p>
				<hr className={css.rule} />
				<table>
					<tbody>
						<tr>
							<th className="center-align">
								<strong>STR</strong>
							</th>
							<th className="center-align">
								<strong>DEX</strong>
							</th>
							<th className="center-align">
								<strong>CON</strong>
							</th>
							<th className="center-align">
								<strong>INT</strong>
							</th>
							<th className="center-align">
								<strong>WIS</strong>
							</th>
							<th className="center-align">
								<strong>CHA</strong>
							</th>
						</tr>
						<tr>
							<td className="center-align">
								{props.monster.strength} ({calculateModifier(props.monster.strength)})
							</td>
							<td className="center-align">
								{props.monster.dexterity} ({calculateModifier(props.monster.dexterity)})
							</td>
							<td className="center-align">
								{props.monster.constitution} ({calculateModifier(props.monster.constitution)})
							</td>
							<td className="center-align">
								{props.monster.intelligence} ({calculateModifier(props.monster.intelligence)})
							</td>
							<td className="center-align">
								{props.monster.wisdom} ({calculateModifier(props.monster.wisdom)})
							</td>
							<td className="center-align">
								{props.monster.charisma} ({calculateModifier(props.monster.charisma)})
							</td>
						</tr>
					</tbody>
				</table>
				<hr className={css.rule} />
				<p>
					<strong>Saving Throws: </strong>
					Str {calculateSavingThrow(props.monster.strength, props.monster.strength_save)}, Dex{' '}
					{calculateSavingThrow(props.monster.dexterity, props.monster.dexterity_save)}, Con{' '}
					{calculateSavingThrow(props.monster.constitution, props.monster.constitution_save)}, Int{' '}
					{calculateSavingThrow(props.monster.intelligence, props.monster.intelligence_save)}, Wis{' '}
					{calculateSavingThrow(props.monster.wisdom, props.monster.wisdom_save)}, Cha{' '}
					{calculateSavingThrow(props.monster.charisma, props.monster.charisma_save)}
				</p>
				<p>
					<strong>Skills: </strong>
					{Object.keys(props.monster.skills).length != 0 ? (
						Object.entries(props.monster.skills).map(([key, value]) => (
							<span key={key} className="capitalize">
								{key}: {prependPlusSymbol(value)}.{' '}
							</span>
						))
					) : (
						<em>none</em>
					)}
				</p>
				<p>
					<strong>Damage Resistances: </strong>
					{props.monster.damage_resistances.length != 0 ? (
						<span>{props.monster.damage_resistances}</span>
					) : (
						<em>none</em>
					)}
				</p>
				<p>
					<strong>Damage Immunities: </strong>
					{props.monster.damage_immunities.length != 0 ? (
						props.monster.damage_immunities
					) : (
						<em>none</em>
					)}
				</p>
				<p>
					<strong>Senses: </strong>
					{props.monster.senses.length != 0 ? props.monster.senses : <em>none</em>}
				</p>
				<p>
					<strong>Languages: </strong>
					{props.monster.languages.length != 0 ? props.monster.languages : <em>none</em>}
				</p>
				<p>
					<strong>Challenge Rating: </strong>
					{props.monster.challenge_rating}
				</p>
				<hr className={css.rule} />
			</div>
		</li>
	);
};
