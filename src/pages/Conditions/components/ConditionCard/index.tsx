import React from 'react';

import { Card, Description } from '../../../../components';
import { sources } from '../../../../data/sources';
import type { Condition } from '../../types';

interface ConditionCardProps {
	condition: Condition;
}

export default function ConditionCard({ condition }: ConditionCardProps) {
	return (
		<Card value={condition.id} title={condition.name} footer={`Source: ${sources[condition.source].title}`}>
			<Description text={condition.desc} />
		</Card>
	);
}
