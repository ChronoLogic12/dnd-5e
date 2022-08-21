import React from 'react';
import css from './style.module.css';

import { colourPicker } from './colourPicker';

export default (props) => {
	return (
		<li>
			<header className={`collapsible-header valign-wrapper ${colourPicker(props.spell.school)}`}>
				<h6>{props.spell.name}</h6>
				<em className={css.level}>{props.spell.level}</em>
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
					<em className="valign-wrapper">
						Concentration:
						{props.spell.concentration == 'no' ? (
							<i className="material-icons red-text">cancel</i>
						) : (
							<i className="material-icons green-text">check_circle</i>
						)}
					</em>
					<em className="valign-wrapper">
						Ritual:
						{props.spell.ritual == 'no' ? (
							<i className="material-icons red-text">cancel</i>
						) : (
							<i className="material-icons green-text">check_circle</i>
						)}
					</em>
					<em>
						Duration: <strong>{props.spell.duration}</strong>
					</em>
					<br />
					<em>
						School: <strong>{props.spell.school}</strong>
					</em>
					<br />
				</div>
				<p>{props.spell.desc}</p>
				<br />
				<em className={css.spellInfo}>
					Classes: <strong>{props.spell.dnd_class}</strong>
				</em>
			</div>
		</li>
	);
};
