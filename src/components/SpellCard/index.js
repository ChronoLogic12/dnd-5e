import React from 'react';
import css from './style.module.css';

export default (props) => {
	return (
		<li className="spell">
			<header className="collapsible-header valign-wrapper">
				<h5>{props.spell.name}</h5>
				<em className={css.level}>{props.spell.level}</em>
			</header>
			<div className="collapsible-body">
				<em>Components {props.spell.components}</em>
				<p>{props.spell.desc}</p>
			</div>
		</li>
	);
};
