import React from 'react';

import TogglePillPresentational from './TogglePillPresentational';

interface TogglePillProps {
	pressed: boolean;
	onPressedChange: (pressed: boolean) => void;
	icon?: React.ReactNode;
	children: React.ReactNode;
}

export default function TogglePill(props: TogglePillProps) {
	return <TogglePillPresentational {...props} />;
}
