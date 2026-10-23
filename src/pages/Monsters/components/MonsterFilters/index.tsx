import React from 'react';

import { FilterPanel, MultiSelect } from '../../../../components';
import type { SelectOption } from '../../../../components';

const challengeRatingOptions: SelectOption[] = [
	'0',
	'1/8',
	'1/4',
	'1/2',
	...Array.from({ length: 27 }, (_, index) => String(index + 1)),
	'30',
].map((value) => ({ value, label: value }));

interface MonsterFiltersProps {
	challengeRatingFilter: string[];
	setChallengeRatingFilter: (value: string[]) => void;
}

export default function MonsterFilters({ challengeRatingFilter, setChallengeRatingFilter }: MonsterFiltersProps) {
	return (
		<FilterPanel
			activeCount={challengeRatingFilter.length ? 1 : 0}
			fields={
				<MultiSelect
					label="Challenge rating"
					options={challengeRatingOptions}
					value={challengeRatingFilter}
					onChange={setChallengeRatingFilter}
				/>
			}
		/>
	);
}
