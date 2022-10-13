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
	return prependPlusSymbol(stat === null ? +calculateModifier(score) : +stat);
};

export default (props) => {
	return (
		<li key={props.monster.name}>
			<header className="collapsible-header valign-wrapper">
				<h6>{props.monster.name}</h6>
				<p className={css.cr}>{props.monster.challenge_rating}</p>
			</header>
			<div className="collapsible-body white">
				<h5>
					<strong>{props.monster.name}</strong>
				</h5>
				{props.monster.size} {props.monster.type}, {props.monster.alignment}
				<hr className="rule" />
				<p>
					<strong>Armor Class: </strong>
					{props.monster.armor_class}
				</p>
				<p>
					<strong>Hit Points: </strong>
					{props.monster.hit_points} ({props.monster.hit_dice})
				</p>
				<div>
					<strong>Speed: </strong>
					<ul className={`capitalize ${css.speed}`}>
						{Object.entries(props.monster.speed).map(([key, value]) =>
							key === 'hover' ? (
								<li key={key}>Hover: True</li>
							) : (
								<li key={key}>
									{key}: {value}
								</li>
							)
						)}
					</ul>
				</div>
				<hr className="rule" />
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
				<hr className="rule" />
				<p>
					<strong>Saving Throws: </strong>
					Str {calculateSavingThrow(props.monster.strength, props.monster.strength_save)}, Dex{' '}
					{calculateSavingThrow(props.monster.dexterity, props.monster.dexterity_save)}, Con{' '}
					{calculateSavingThrow(props.monster.constitution, props.monster.constitution_save)}, Int{' '}
					{calculateSavingThrow(props.monster.intelligence, props.monster.intelligence_save)}, Wis{' '}
					{calculateSavingThrow(props.monster.wisdom, props.monster.wisdom_save)}, Cha{' '}
					{calculateSavingThrow(props.monster.charisma, props.monster.charisma_save)}
				</p>
				{/* Skills */}
				{Object.keys(props.monster.skills).length ? (
					<p>
						<strong>Skills: </strong>
						{Object.entries(props.monster.skills).map(([key, value]) => (
							<span key={key} className="capitalize">
								{key}: {prependPlusSymbol(value)}.{' '}
							</span>
						))}
					</p>
				) : null}
				{/* Vulnerabilities */}
				{props.monster.damage_vulnerabilities.length ? (
					<p>
						<strong>Damage Vulnerabilities: </strong> {props.monster.damage_vulnerabilities}
					</p>
				) : null}
				{/* Resistances */}
				{props.monster.damage_resistances.length ? (
					<p>
						<strong>Damage Resistances: </strong> {props.monster.damage_resistances}
					</p>
				) : null}
				{/* Immunities */}
				{props.monster.damage_immunities.length ? (
					<p>
						<strong>Damage Immunities: </strong> {props.monster.damage_immunities}
					</p>
				) : null}
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
				<hr className="rule" />
				{/* Special Abilities */}
				{props.monster.special_abilities.length ? (
					<>
						{props.monster.special_abilities.map((ability) => {
							return (
								<p key={ability.name}>
									<strong key={ability.name}>{ability.name}: </strong>
									<span>{ability.desc}</span>
									<br />
								</p>
							);
						})}
					</>
				) : null}
				{/* Actions */}
				{props.monster.actions.length ? (
					<>
						<h5>
							<strong>Actions</strong>
						</h5>
						<hr className="rule" />
						{props.monster.actions.map((action) => {
							return (
								<p key={action.name}>
									<strong key={action.name}>{action.name}: </strong>
									<span>{action.desc}</span>
									<br />
								</p>
							);
						})}
					</>
				) : null}
				{/* Reactions */}
				{props.monster.reactions.length ? (
					<>
						<h5>
							<strong>Reactions</strong>
						</h5>
						<hr className="rule" />
						{props.monster.reactions.map((reaction) => {
							return (
								<p key={reaction.name}>
									<strong key={reaction.name}>{reaction.name}: </strong>
									<span>{reaction.desc}</span>
									<br />
								</p>
							);
						})}
					</>
				) : null}
				{/* Legendary Actions */}
				{props.monster.legendary_actions.length ? (
					<>
						<h5>
							<strong>Legendary Actions</strong>
						</h5>
						<hr className="rule" />
						<p>{props.monster.legendary_desc}</p>
						{props.monster.legendary_actions.map((action) => {
							return (
								<p key={action.name}>
									<strong key={action.name}>{action.name}: </strong>
									<span>{action.desc}</span>
									<br />
								</p>
							);
						})}
					</>
				) : null}
				<div className="center">
					<small className="grey-text">Source: {props.monster.document__title}</small>
				</div>
			</div>
		</li>
	);
};
