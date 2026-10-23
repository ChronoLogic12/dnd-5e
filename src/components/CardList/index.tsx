import React from 'react';

import CardListPresentational from './CardListPresentational';

interface CardListProps {
	children: React.ReactNode;
}

export default function CardList(props: CardListProps) {
	return <CardListPresentational {...props} />;
}
