import React from 'react';
import css from './style.module.css';

import { iconPicker } from '../IconPicker';

const sourcePills = {
	'5e Core Rules': { label: 'Core', className: css.core },
	'Level Up Advanced 5e': { label: 'A5e', className: css.a5e },
	'Deep Magic 5e': { label: 'Deep Magic', className: css.otherSource },
	'Deep Magic Extended': { label: 'DM Extended', className: css.otherSource },
	'Warlock Archives': { label: 'Warlock', className: css.otherSource },
	'Kobold Press Compilation': { label: 'Kobold Press', className: css.otherSource },
	'Tome of Heroes': { label: 'Tome of Heroes', className: css.otherSource },
	'Open5e Original Content': { label: 'Open5e', className: css.otherSource },
};

export default (props) => {
	const renderSourcePill = () => {
		const source = props.spell.document__title;
		const { label, className } = sourcePills[source] || {
			label: source,
			className: css.otherSource,
		};
		return (
			<span className={`${css.source} ${className}`} title={source}>
				{label}
			</span>
		);
	};

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
				{props.showSource ? renderSourcePill() : null}
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
