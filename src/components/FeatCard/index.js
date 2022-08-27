import React from 'react';

import css from './style.module.css';

export default (props) => {
	const renderDescription = () => {
		return (
			<p>
				{props.feat.desc
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

	return (
		<li>
			<header className="collapsible-header valign-wrapper">
				<h6>{props.feat.name}</h6>
			</header>
			<div className="collapsible-body white">
				{props.feat.prerequisite ? (
					<p>
						Prerequisite: <strong>{props.feat.prerequisite}</strong>
					</p>
				) : null}
				{renderDescription()}
				<div className="center">
					<small className="grey-text">Source: {props.feat.document__title}</small>
				</div>
			</div>
		</li>
	);
};
