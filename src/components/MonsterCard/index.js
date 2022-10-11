import React from 'react';

export default (props) => {
	return (
		<li>
			<header className="collapsible-header valign-wrapper">
				<h6>{props.monster.name}</h6>
			</header>
			<div className="collapsible-body white"></div>
		</li>
	);
};
