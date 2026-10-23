import React from 'react';
import { Accordion } from '@base-ui/react/accordion';

import css from './style.module.css';

interface CardListPresentationalProps {
	value?: string[];
	onValueChange?: (value: string[]) => void;
	children: React.ReactNode;
}

export default function CardListPresentational({ value, onValueChange, children }: CardListPresentationalProps) {
	return (
		<Accordion.Root
			className={css.list}
			hiddenUntilFound
			value={value}
			onValueChange={onValueChange}
			data-testid="card-list"
		>
			{children}
		</Accordion.Root>
	);
}
