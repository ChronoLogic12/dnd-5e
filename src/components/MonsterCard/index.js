import React from 'react';
import css from './style.module.css';

export default (props) => {
	return (
		<li>
			<header className="collapsible-header valign-wrapper">
				<h6>{props.monster.name}</h6>
				<p className={css.cr}>{props.monster.challenge_rating}</p>
			</header>
			<div className="collapsible-body white">
				<em>
					{props.monster.size} {props.monster.type}, {props.monster.alignment}
				</em>
			</div>
		</li>
	);
};
