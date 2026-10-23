import React from 'react';

import MultiSelectPresentational from './MultiSelectPresentational';
import { useMultiSelect } from './useMultiSelect';
import type { UseMultiSelectProps } from './useMultiSelect';

export type { SelectOption } from './useMultiSelect';

interface MultiSelectProps extends UseMultiSelectProps {
	label: string;
}

export default function MultiSelect({ label, ...props }: MultiSelectProps) {
	return <MultiSelectPresentational label={label} {...useMultiSelect(props)} />;
}
