import React from 'react';
import css from './style.module.css';

import { iconPicker } from '../IconPicker';
import SourcePill from '../../../../components/SourcePill';
import { sources } from '../../../../data/sources';
import type { Spell } from '../../types';
import { getComponentsLabel, getDisplaySource, getLevelLabel } from '../../utils';

interface SpellCardProps {
	spell: Spell;
	showSource?: boolean;
}

export default function SpellCard(props: SpellCardProps) {
	const sourceTitle = sources[getDisplaySource(props.spell.source)].title;

	const renderDescription = () => {
		return (
			<p>
				{props.spell.desc
					.replace(/(\]{1,4}|\[{1,4}|\*{2}|\/{2})/g, '')
					.split('\n')
					.map((str, index) => (
						<React.Fragment key={index}>
							{str}
							<br />
						</React.Fragment>
					))}
			</p>
		);
	};

	const renderBooleanIcon = (value: boolean) => {
		return !value ? (
			<i className="material-icons red-text">cancel</i>
		) : (
			<i className="material-icons green-text">check_circle</i>
		);
	};

	return (
		<li>
			<header className="collapsible-header valign-wrapper">
				{iconPicker(props.spell.school)}
				<h6>{props.spell.name}</h6>
				{props.showSource ? <SourcePill source={getDisplaySource(props.spell.source)} /> : null}
				<p className={css.level}>{getLevelLabel(props.spell.level)}</p>
			</header>
			<div className="collapsible-body white">
				<div className={css.spellInfo}>
					<em>
						Components: <strong>{getComponentsLabel(props.spell.components)}</strong>
					</em>
					{props.spell.components.material ? <em> {props.spell.material}</em> : null}
					<br />
					<em>
						Casting Time: <strong>{props.spell.castingTime}</strong>
					</em>
					<br />
					<em>
						Range: <strong>{props.spell.range}</strong>
					</em>
					<br />
					<em className="valign-wrapper">
						Ritual:
						{renderBooleanIcon(props.spell.ritual)}
					</em>
					<em className="valign-wrapper">
						Concentration:
						{renderBooleanIcon(props.spell.concentration)}
					</em>
					<em>
						Duration: <strong>{props.spell.duration}</strong>
					</em>
					<br />
					<em>
						School: <strong className="capitalize">{props.spell.school}</strong>
					</em>
					<br />
				</div>
				{renderDescription()}
				{props.spell.higherLevel ? <p>{props.spell.higherLevel}</p> : null}
				<em className={css.spellInfo}>
					Classes: <strong>{props.spell.classes.join(', ')}</strong>
				</em>
				<br />
				<br />
				<div className="center">
					<small className="grey-text">Source: {sourceTitle}</small>
				</div>
			</div>
		</li>
	);
}
