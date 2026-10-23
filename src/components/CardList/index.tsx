import React from 'react';

import CardListPresentational from './CardListPresentational';
import { useCardList } from './useCardList';
import type { UseCardListProps } from './useCardList';

interface CardListProps extends UseCardListProps {
	children: React.ReactNode;
}

export default function CardList({ children, ...props }: CardListProps) {
	return <CardListPresentational {...useCardList(props)}>{children}</CardListPresentational>;
}
