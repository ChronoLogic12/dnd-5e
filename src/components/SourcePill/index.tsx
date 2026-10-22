import React from 'react';
import css from './style.module.css';

import { sources } from '../../data/sources';
import type { PillStyle, SourceKey } from '../../data/sources';

const pillClasses: Record<PillStyle, string> = {
	core: css.core,
	a5e: css.a5e,
	outline: css.outline,
	other: css.otherSource,
};

interface SourcePillProps {
	source: SourceKey;
}

export default function SourcePill({ source }: SourcePillProps) {
	const { title, shortLabel, pill } = sources[source];
	return (
		<span className={`${css.source} ${pillClasses[pill]}`} title={title}>
			{shortLabel}
		</span>
	);
}
