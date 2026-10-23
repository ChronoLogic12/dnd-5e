import React from 'react';

import { Card, Description } from '../../../../components';
import { sources } from '../../../../data/sources';
import type { Feat } from '../../types';

interface FeatCardProps {
	feat: Feat;
}

export default function FeatCard({ feat }: FeatCardProps) {
	return (
		<Card value={feat.id} title={feat.name} footer={`Source: ${sources[feat.source].title}`}>
			{feat.prerequisite ? (
				<p>
					Prerequisite: <strong>{feat.prerequisite}</strong>
				</p>
			) : null}
			<Description text={feat.desc} />
		</Card>
	);
}
