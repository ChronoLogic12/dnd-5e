import React from 'react';
import css from './style.module.css';

import SourcePill from '../../../../components/SourcePill';
import { sources } from '../../../../data/sources';
import type { Monster } from '../../types';

const prependPlusSymbol = (value: number) => {
	if (value > 0) {
		return `+${value}`;
	} else {
		return value;
	}
};

const calculateModifier = (score: number) => {
	return prependPlusSymbol(Math.floor((score - 10) / 2));
};

const calculateSavingThrow = (score: number, stat: number | null) => {
	return prependPlusSymbol(stat === null ? +calculateModifier(score) : +stat);
};

interface MonsterCardProps {
	monster: Monster;
	showSource?: boolean;
}

export default function MonsterCard(props: MonsterCardProps) {
	return (
		<li>
			<header className="collapsible-header valign-wrapper">
				<h6>{props.monster.name}</h6>
				{props.showSource ? <SourcePill source={props.monster.source} /> : null}
				<p className={css.cr}>{props.monster.challengeRating}</p>
			</header>
			<div className="collapsible-body white">
				<h5>
					<strong>{props.monster.name}</strong>
				</h5>
				{props.monster.size} {props.monster.type}, {props.monster.alignment}
				<hr className="rule" />
				<p>
					<strong>Armor Class: </strong>
					{props.monster.armorClass}
				</p>
				<p>
					<strong>Hit Points: </strong>
					{props.monster.hitPoints} ({props.monster.hitDice})
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
								{props.monster.abilities.strength} ({calculateModifier(props.monster.abilities.strength)})
							</td>
							<td className="center-align">
								{props.monster.abilities.dexterity} ({calculateModifier(props.monster.abilities.dexterity)})
							</td>
							<td className="center-align">
								{props.monster.abilities.constitution} ({calculateModifier(props.monster.abilities.constitution)})
							</td>
							<td className="center-align">
								{props.monster.abilities.intelligence} ({calculateModifier(props.monster.abilities.intelligence)})
							</td>
							<td className="center-align">
								{props.monster.abilities.wisdom} ({calculateModifier(props.monster.abilities.wisdom)})
							</td>
							<td className="center-align">
								{props.monster.abilities.charisma} ({calculateModifier(props.monster.abilities.charisma)})
							</td>
						</tr>
					</tbody>
				</table>
				<hr className="rule" />
				<p>
					<strong>Saving Throws: </strong>
					Str {calculateSavingThrow(props.monster.abilities.strength, props.monster.savingThrows.strength)}, Dex{' '}
					{calculateSavingThrow(props.monster.abilities.dexterity, props.monster.savingThrows.dexterity)}, Con{' '}
					{calculateSavingThrow(props.monster.abilities.constitution, props.monster.savingThrows.constitution)}, Int{' '}
					{calculateSavingThrow(props.monster.abilities.intelligence, props.monster.savingThrows.intelligence)}, Wis{' '}
					{calculateSavingThrow(props.monster.abilities.wisdom, props.monster.savingThrows.wisdom)}, Cha{' '}
					{calculateSavingThrow(props.monster.abilities.charisma, props.monster.savingThrows.charisma)}
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
				{props.monster.damageVulnerabilities.length ? (
					<p>
						<strong>Damage Vulnerabilities: </strong> {props.monster.damageVulnerabilities}
					</p>
				) : null}
				{/* Resistances */}
				{props.monster.damageResistances.length ? (
					<p>
						<strong>Damage Resistances: </strong> {props.monster.damageResistances}
					</p>
				) : null}
				{/* Immunities */}
				{props.monster.damageImmunities.length ? (
					<p>
						<strong>Damage Immunities: </strong> {props.monster.damageImmunities}
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
					{props.monster.challengeRating}
				</p>
				<hr className="rule" />
				{/* Special Abilities */}
				{props.monster.specialAbilities ? (
					<>
						{props.monster.specialAbilities.map((ability) => {
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
				{props.monster.actions && props.monster.actions.length ? (
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
				{props.monster.reactions && props.monster.reactions.length ? (
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
				{props.monster.legendaryActions && props.monster.legendaryActions.length ? (
					<>
						<h5>
							<strong>Legendary Actions</strong>
						</h5>
						<hr className="rule" />
						<p>{props.monster.legendaryDescription}</p>
						{props.monster.legendaryActions.map((action) => {
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
					<small className="grey-text">Source: {sources[props.monster.source].title}</small>
				</div>
			</div>
		</li>
	);
}
