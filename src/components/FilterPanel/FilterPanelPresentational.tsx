import React from 'react';
import { Collapsible } from '@base-ui/react/collapsible';
import { IoChevronDown, IoFilter } from 'react-icons/io5';

import css from './style.module.css';

interface FilterPanelPresentationalProps {
	activeCount: number;
	fields: React.ReactNode;
	toggles?: React.ReactNode;
}

export default function FilterPanelPresentational({ activeCount, fields, toggles }: FilterPanelPresentationalProps) {
	return (
		<Collapsible.Root className={css.panel}>
			<Collapsible.Trigger className={css.trigger}>
				<IoFilter className={css.filterIcon} aria-hidden />
				Filter
				<span className={css.end}>
					{activeCount ? <span className={css.badge}>{activeCount} active</span> : null}
					<IoChevronDown className={css.chevron} aria-hidden />
				</span>
			</Collapsible.Trigger>
			<Collapsible.Panel className={css.body} keepMounted>
				<div className={css.fields}>{fields}</div>
				{toggles ? (
					<div className={css.toggles}>
						<span className={css.togglesLabel}>Show only</span>
						<div className={css.toggleRow}>{toggles}</div>
					</div>
				) : null}
			</Collapsible.Panel>
		</Collapsible.Root>
	);
}
