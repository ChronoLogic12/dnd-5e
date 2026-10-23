import React from 'react';

import FilterPanelPresentational from './FilterPanelPresentational';

interface FilterPanelProps {
	activeCount: number;
	fields: React.ReactNode;
	toggles?: React.ReactNode;
}

export default function FilterPanel(props: FilterPanelProps) {
	return <FilterPanelPresentational {...props} />;
}
