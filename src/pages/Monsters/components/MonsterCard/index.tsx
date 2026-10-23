import React from 'react';
import css from './style.module.css';

import { Card, SourcePill } from '../../../../components';
import { sources } from '../../../../data/sources';
import type { Ability, Monster, MonsterAbility } from '../../types';

const abilities: [Ability, string][] = [
	['strength', 'Str'],
	['dexterity', 'Dex'],
	['constitution', 'Con'],
	['intelligence', 'Int'],
	['wisdom', 'Wis'],
	['charisma', 'Cha'],
];

const prependPlusSymbol = (value: number) => (value > 0 ? `+${value}` : value);

const calculateModifier = (score: number) => prependPlusSymbol(Math.floor((score - 10) / 2));

const calculateSavingThrow = (score: number, stat: number | null) =>
	prependPlusSymbol(stat === null ? +calculateModifier(score) : +stat);

interface AbilityListProps {
	title?: string;
	intro?: string;
	entries: MonsterAbility[];
}

const AbilityList = ({ title, intro, entries }: AbilityListProps) =>
	entries.length ? (
		<>
			{title ? (
				<>
					<h4 className={css.heading}>{title}</h4>
					<hr className="rule" />
				</>
			) : null}
			{intro ? <p>{intro}</p> : null}
			{entries.map((entry) => (
				<p key={entry.name}>
					<strong>{entry.name}: </strong>
					<span>{entry.desc}</span>
				</p>
			))}
		</>
	) : null;

interface MonsterCardProps {
	monster: Monster;
	showSource?: boolean;
}

export default function MonsterCard({ monster, showSource }: MonsterCardProps) {
	return (
		<Card
			value={monster.id}
			title={monster.name}
			tags={showSource ? <SourcePill source={monster.source} /> : null}
			meta={monster.challengeRating}
			footer={`Source: ${sources[monster.source].title}`}
		>
			<div className={css.body}>
				<h4 className={css.heading}>{monster.name}</h4>
				<p className={css.type}>
					{monster.size} {monster.type}, {monster.alignment}
				</p>
				<hr className="rule" />
				<p>
					<strong>Armor Class: </strong>
					{monster.armorClass}
				</p>
				<p>
					<strong>Hit Points: </strong>
					{monster.hitPoints} ({monster.hitDice})
				</p>
				<div>
					<strong>Speed: </strong>
					<ul className={`capitalize ${css.speed}`}>
						{Object.entries(monster.speed).map(([key, value]) =>
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
				<table className={css.abilities}>
					<tbody>
						<tr>
							{abilities.map(([ability, label]) => (
								<th key={ability}>{label.toUpperCase()}</th>
							))}
						</tr>
						<tr>
							{abilities.map(([ability]) => (
								<td key={ability}>
									{monster.abilities[ability]} ({calculateModifier(monster.abilities[ability])})
								</td>
							))}
						</tr>
					</tbody>
				</table>
				<hr className="rule" />
				<p>
					<strong>Saving Throws: </strong>
					{abilities
						.map(
							([ability, label]) =>
								`${label} ${calculateSavingThrow(monster.abilities[ability], monster.savingThrows[ability])}`
						)
						.join(', ')}
				</p>
				{Object.keys(monster.skills).length ? (
					<p>
						<strong>Skills: </strong>
						{Object.entries(monster.skills).map(([key, value]) => (
							<span key={key} className="capitalize">
								{key}: {prependPlusSymbol(value)}.{' '}
							</span>
						))}
					</p>
				) : null}
				{monster.damageVulnerabilities.length ? (
					<p>
						<strong>Damage Vulnerabilities: </strong> {monster.damageVulnerabilities}
					</p>
				) : null}
				{monster.damageResistances.length ? (
					<p>
						<strong>Damage Resistances: </strong> {monster.damageResistances}
					</p>
				) : null}
				{monster.damageImmunities.length ? (
					<p>
						<strong>Damage Immunities: </strong> {monster.damageImmunities}
					</p>
				) : null}
				<p>
					<strong>Senses: </strong>
					{monster.senses.length ? monster.senses : <em>none</em>}
				</p>
				<p>
					<strong>Languages: </strong>
					{monster.languages.length ? monster.languages : <em>none</em>}
				</p>
				<p>
					<strong>Challenge Rating: </strong>
					{monster.challengeRating}
				</p>
				<hr className="rule" />
				<AbilityList entries={monster.specialAbilities} />
				<AbilityList title="Actions" entries={monster.actions} />
				<AbilityList title="Reactions" entries={monster.reactions} />
				<AbilityList
					title="Legendary Actions"
					intro={monster.legendaryDescription}
					entries={monster.legendaryActions}
				/>
			</div>
		</Card>
	);
}
