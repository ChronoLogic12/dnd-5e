import React from 'react';

import css from './style.module.css';

interface ResultsCountProps {
	count: number;
}

export default function ResultsCount({ count }: ResultsCountProps) {
	return (
		<>
			<p className={css.count} role="status">
				Results found: {count}
			</p>
			<hr className="rule" />
		</>
	);
}
