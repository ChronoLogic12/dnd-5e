import React from 'react';
import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { Tooltip } from '@base-ui/react/tooltip';

import css from './style.module.css';
import type { EditionState } from '../../utils/edition/useEditionState';
import type { Edition } from '../../data/sources';

const editions: Edition[] = ['2014', '2024'];

export default function EditionSwitchPresentational({ edition, setEdition }: EditionState) {
	return (
		<Tooltip.Root>
			<Tooltip.Trigger delay={600} render={<div className={css.wrapper} />}>
				<ToggleGroup
					className={css.switch}
					aria-label="Rules edition"
					value={[edition]}
					onValueChange={(value: Edition[]) => {
						if (value.length) {
							setEdition(value[0]);
						}
					}}
					data-edition={edition}
				>
					<span className={css.thumb} aria-hidden />
					{editions.map((option) => (
						<Toggle key={option} value={option} className={css.option}>
							{option}
						</Toggle>
					))}
				</ToggleGroup>
			</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Positioner className={css.positioner} sideOffset={8} align="end">
					<Tooltip.Popup className={css.tooltip}>
						Swaps the core rules between the 2014 and 2024 editions.
					</Tooltip.Popup>
				</Tooltip.Positioner>
			</Tooltip.Portal>
		</Tooltip.Root>
	);
}
