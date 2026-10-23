import React from 'react';
import { TbClock, TbHandFinger, TbHourglass, TbRulerMeasure } from 'react-icons/tb';

import css from './style.module.css';
import SchoolIcon from '../SchoolIcon';
import SpellTags from '../SpellTags';
import { Card, Description, SourcePill } from '../../../../components';
import { sources } from '../../../../data/sources';
import type { Spell } from '../../types';
import { getComponentsLabel, getDisplaySource, getLevelLabel, getMaterialNote } from '../../utils';

interface SpellCardProps {
	spell: Spell;
	showSource?: boolean;
}

export default function SpellCard({ spell, showSource }: SpellCardProps) {
	const source = getDisplaySource(spell.source);
	const components = getComponentsLabel(spell.components);
	const material = spell.components.material ? getMaterialNote(spell.material) : '';
	const stats = [
		{ icon: <TbClock />, label: 'Casting time', value: spell.castingTime },
		{ icon: <TbRulerMeasure />, label: 'Range', value: spell.range },
		{ icon: <TbHourglass />, label: 'Duration', value: spell.duration },
		{ icon: <TbHandFinger />, label: 'Components', value: material ? `${components} (${material})` : components },
	];

	return (
		<Card
			value={spell.id}
			title={spell.name}
			icon={<SchoolIcon school={spell.school} />}
			tags={showSource ? <SourcePill source={source} /> : null}
			meta={getLevelLabel(spell.level)}
			footer={[spell.classes.join(', '), sources[source].title].filter(Boolean).join(' · ')}
		>
			<SpellTags spell={spell} />
			<dl className={css.stats}>
				{stats.map((stat) => (
					<div key={stat.label} className={css.stat}>
						<span className={css.statIcon} aria-hidden>
							{stat.icon}
						</span>
						<div>
							<dt className={css.statLabel}>{stat.label}</dt>
							<dd className={css.statValue}>{stat.value}</dd>
						</div>
					</div>
				))}
			</dl>
			<Description text={spell.desc} />
			{spell.higherLevel ? <p>{spell.higherLevel}</p> : null}
		</Card>
	);
}
