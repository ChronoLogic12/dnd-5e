import React from 'react';
import { Accordion } from '@base-ui/react/accordion';

import css from './style.module.css';

interface CardPresentationalProps {
	value: string;
	title: string;
	icon?: React.ReactNode;
	tags?: React.ReactNode;
	meta?: React.ReactNode;
	footer?: React.ReactNode;
	children: React.ReactNode;
}

export default function CardPresentational({
	value,
	title,
	icon,
	tags,
	meta,
	footer,
	children,
}: CardPresentationalProps) {
	return (
		<Accordion.Item value={value} className={css.card}>
			<Accordion.Header className={css.header}>
				<Accordion.Trigger className={css.trigger}>
					{icon ? <span className={css.icon}>{icon}</span> : null}
					<span className={css.title} data-card-title>
						{title}
					</span>
					{tags}
					{meta ? <span className={css.meta}>{meta}</span> : null}
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Panel className={css.panel}>
				{children}
				{footer ? <p className={css.footer}>{footer}</p> : null}
			</Accordion.Panel>
		</Accordion.Item>
	);
}
