import React from 'react';
import { Select } from '@base-ui/react/select';
import { IoCheckmark, IoChevronDown } from 'react-icons/io5';

import css from './style.module.css';
import type { MultiSelectState } from './useMultiSelect';

interface MultiSelectPresentationalProps extends MultiSelectState {
	label: string;
}

export default function MultiSelectPresentational({
	label,
	options,
	value,
	onChange,
	summary,
}: MultiSelectPresentationalProps) {
	return (
		<Select.Root multiple value={value} onValueChange={(selected) => onChange(selected as string[])}>
			<div className={css.field}>
				<Select.Label className={css.label}>{label}</Select.Label>
				<Select.Trigger className={css.trigger}>
					<Select.Value className={css.value}>{() => summary}</Select.Value>
					<IoChevronDown className={css.chevron} aria-hidden />
				</Select.Trigger>
			</div>
			<Select.Portal>
				<Select.Positioner className={css.positioner} sideOffset={4} alignItemWithTrigger={false}>
					<Select.Popup className={css.popup}>
						{options.map((option) => (
							<Select.Item key={option.value} value={option.value} className={css.item}>
								<span className={css.indicator}>
									<Select.ItemIndicator>
										<IoCheckmark aria-hidden />
									</Select.ItemIndicator>
								</span>
								<Select.ItemText>{option.label}</Select.ItemText>
							</Select.Item>
						))}
					</Select.Popup>
				</Select.Positioner>
			</Select.Portal>
		</Select.Root>
	);
}
