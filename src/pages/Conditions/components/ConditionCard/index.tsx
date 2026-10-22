import React from 'react';
import { sources } from '../../../../data/sources';
import type { Condition } from '../../types';

interface ConditionCardProps {
	condition: Condition;
}

export default function ConditionCard(props: ConditionCardProps) {
	const renderDescription = () => {
		return (
			<p>
				{props.condition.desc
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
		<li key={props.condition.name}>
			<header className="collapsible-header valign-wrapper">
				<h6>{props.condition.name}</h6>
			</header>
			<div className="collapsible-body white">
				{renderDescription()}
				<div className="center">
					<small className="grey-text">Source: {sources[props.condition.source].title}</small>
				</div>
			</div>
		</li>
	);
}
