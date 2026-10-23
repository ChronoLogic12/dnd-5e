import React from 'react';
import { TbBook2, TbBrain } from 'react-icons/tb';

import css from './style.module.css';
import SchoolIcon from '../SchoolIcon';
import { getSchool } from '../../schools';
import type { Spell } from '../../types';

interface SpellTagsProps {
	spell: Spell;
}

export default function SpellTags({ spell }: SpellTagsProps) {
	const colour = getSchool(spell.school)?.colour ?? 'var(--colour-muted)';
	return (
		<div className={css.tags}>
			<span className={`${css.tag} ${css.school}`} style={{ borderColor: colour }}>
				<SchoolIcon school={spell.school} />
				<span className="capitalize">{spell.school}</span>
			</span>
			{spell.ritual ? (
				<span className={`${css.tag} ${css.flag}`}>
					<TbBook2 aria-hidden />
					Ritual
				</span>
			) : null}
			{spell.concentration ? (
				<span className={`${css.tag} ${css.flag}`}>
					<TbBrain aria-hidden />
					Concentration
				</span>
			) : null}
		</div>
	);
}
