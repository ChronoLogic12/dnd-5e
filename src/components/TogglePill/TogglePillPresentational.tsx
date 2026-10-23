import React from 'react';
import { Toggle } from '@base-ui/react/toggle';

import css from './style.module.css';

interface TogglePillPresentationalProps {
	pressed: boolean;
	onPressedChange: (pressed: boolean) => void;
	icon?: React.ReactNode;
	children: React.ReactNode;
}

export default function TogglePillPresentational({
	pressed,
	onPressedChange,
	icon,
	children,
}: TogglePillPresentationalProps) {
	return (
		<Toggle className={css.pill} pressed={pressed} onPressedChange={onPressedChange}>
			{icon ? <span className={css.icon}>{icon}</span> : null}
			{children}
		</Toggle>
	);
}
