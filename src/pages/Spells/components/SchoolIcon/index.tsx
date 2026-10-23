import React from 'react';

import { getSchool } from '../../schools';

interface SchoolIconProps {
	school: string;
}

export default function SchoolIcon({ school }: SchoolIconProps) {
	const details = getSchool(school);
	if (!details) {
		return null;
	}
	const Icon = details.icon;
	return <Icon color={details.colour} aria-hidden />;
}
