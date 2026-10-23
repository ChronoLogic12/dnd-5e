import React from 'react';
import { Accordion } from '@base-ui/react/accordion';

import css from './style.module.css';

interface CardListPresentationalProps {
	children: React.ReactNode;
}

export default function CardListPresentational({ children }: CardListPresentationalProps) {
	return (
		<Accordion.Root className={css.list} hiddenUntilFound data-testid="card-list">
			{children}
		</Accordion.Root>
	);
}
