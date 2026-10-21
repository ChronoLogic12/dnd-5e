import React from 'react';
import css from './style.module.css';

const sources = {
	'5e Core Rules': { label: 'Core', className: css.core },
	'Level Up Advanced 5e': { label: 'A5e', className: css.a5e },
	'Level Up Advanced 5e Monstrous Menagerie': { label: 'A5e', className: css.a5e },
	'Black Flag SRD': { label: 'Black Flag', className: css.outline },
	'Tome of Beasts': { label: 'ToB', className: css.otherSource },
	'Tome of Beasts 2023': { label: 'ToB 2023', className: css.outline },
	'Tome of Beasts 2': { label: 'ToB 2', className: css.otherSource },
	'Tome of Beasts 3': { label: 'ToB 3', className: css.otherSource },
	'Creature Codex': { label: 'Creature Codex', className: css.otherSource },
	'Critical Role: Tal’Dorei Campaign Setting': { label: 'Tal’Dorei', className: css.otherSource },
	'Deep Magic 5e': { label: 'Deep Magic', className: css.otherSource },
	'Deep Magic Extended': { label: 'DM Extended', className: css.otherSource },
	'Warlock Archives': { label: 'Warlock', className: css.otherSource },
	'Kobold Press Compilation': { label: 'Kobold Press', className: css.otherSource },
	'Tome of Heroes': { label: 'Tome of Heroes', className: css.otherSource },
	'Open5e Original Content': { label: 'Open5e', className: css.otherSource },
};

export default ({ source }) => {
	const { label, className } = sources[source] || { label: source, className: css.otherSource };
	return (
		<span className={`${css.source} ${className}`} title={source}>
			{label}
		</span>
	);
};
