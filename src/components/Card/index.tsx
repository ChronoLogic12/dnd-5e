import React from 'react';

import CardPresentational from './CardPresentational';

interface CardProps {
	value: string;
	title: string;
	icon?: React.ReactNode;
	tags?: React.ReactNode;
	meta?: React.ReactNode;
	footer?: React.ReactNode;
	children: React.ReactNode;
}

export default function Card(props: CardProps) {
	return <CardPresentational {...props} />;
}
