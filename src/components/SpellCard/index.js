import React from 'react';
import css from './style.module.css';

import { iconPicker } from '../IconPicker';

export default (props) => {
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

	const renderBooleanIcon = (value) => {
		return value == 'no' ? (
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
				<p className={css.level}>{props.spell.level}</p>
			</header>
			<div className="collapsible-body white">
				<div className={css.spellInfo}>
					<em>
						Components: <strong>{props.spell.components}</strong>
					</em>
					{props.spell.components.includes('M') ? <em> {props.spell.material}</em> : null}
					<br />
					<em>
						Casting Time: <strong>{props.spell.casting_time}</strong>
					</em>
					<br />
					<em>
						Range: <strong>{props.spell.range}</strong>
					</em>
					<br />
					<em className="valign-wrapper">
						Concentration:
						{renderBooleanIcon(props.spell.concentration)}
					</em>
					<em className="valign-wrapper">
						Ritual:
						{renderBooleanIcon(props.spell.ritual)}
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
				{props.spell.higher_level ? <p>{props.spell.higher_level}</p> : null}
				<em className={css.spellInfo}>
					Classes: <strong>{props.spell.dnd_class}</strong>
				</em>
				<br />
				<br />
				<div className="center">
					<small className="grey-text">Source: {props.spell.document__title}</small>
				</div>
			</div>
		</li>
	);
};
