import React from 'react';
import { render, screen } from '@testing-library/react';

import { MonsterCard } from '../components';

const monster = {
	name: 'Goblin',
	challenge_rating: '1/4',
	size: 'Small',
	type: 'humanoid',
	alignment: 'neutral evil',
	armor_class: 15,
	hit_points: 7,
	hit_dice: '2d6',
	speed: { walk: 30 },
	strength: 8,
	dexterity: 14,
	constitution: 10,
	intelligence: 10,
	wisdom: 8,
	charisma: 8,
	strength_save: null,
	dexterity_save: null,
	constitution_save: null,
	intelligence_save: null,
	wisdom_save: null,
	charisma_save: null,
	skills: { stealth: 6 },
	damage_vulnerabilities: '',
	damage_resistances: '',
	damage_immunities: '',
	senses: 'darkvision 60 ft.',
	languages: 'Common, Goblin',
	special_abilities: [],
	actions: [{ name: 'Scimitar', desc: 'Melee Weapon Attack.' }],
	reactions: [],
	legendary_actions: [],
	document__title: '5e Core Rules',
};

const renderCard = (overrides) =>
	render(
		<ul>
			<MonsterCard monster={{ ...monster, ...overrides }} />
		</ul>
	);

describe('MonsterCard', () => {
	it('hides Reactions and Legendary Actions when there are none', () => {
		renderCard();
		expect(screen.queryByText('Reactions')).not.toBeInTheDocument();
		expect(screen.queryByText('Legendary Actions')).not.toBeInTheDocument();
	});

	it('shows Reactions and Legendary Actions when there are some', () => {
		renderCard({
			reactions: [{ name: 'Parry', desc: 'Adds 2 to its AC.' }],
			legendary_actions: [{ name: 'Detect', desc: 'Makes a Perception check.' }],
		});
		expect(screen.getByText('Reactions')).toBeInTheDocument();
		expect(screen.getByText('Legendary Actions')).toBeInTheDocument();
	});
});
