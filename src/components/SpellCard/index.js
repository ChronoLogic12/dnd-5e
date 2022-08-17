import React from 'react';

export default (props) => {
	return (
		<>
			<div>
				<h2>{props.spell.name}</h2>
				<em>{props.spell.level}</em>
			</div>
			<em>Components {props.spell.components}</em>
			<p>{props.spell.desc}</p>
		</>
	);
};
