import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';

import MonsterCard from '..';
import { CardList } from '../../../../../components';
import { makeMonster } from '../../../tests/factories';
import type { Monster } from '../../../types';

const renderCard = (overrides: Partial<Monster> = {}) =>
	render(
		<CardList>
			<MonsterCard monster={makeMonster(overrides)} />
		</CardList>
	);

describe('MonsterCard', () => {
	it('hides Reactions and Legendary Actions when there are none', () => {
		renderCard();
		expect(screen.queryByText('Reactions')).not.toBeInTheDocument();
		expect(screen.queryByText('Legendary Actions')).not.toBeInTheDocument();
	});

	it('renders monsters with no actions in the data', () => {
		renderCard({ name: 'Frog', actions: [], specialAbilities: [], reactions: [], legendaryActions: [] });
		expect(screen.getAllByText('Frog').length).toBeGreaterThan(0);
		expect(screen.queryByText('Actions')).not.toBeInTheDocument();
	});

	it('shows Reactions and Legendary Actions when there are some', () => {
		renderCard({
			reactions: [{ name: 'Parry', desc: 'Adds 2 to its AC.' }],
			legendaryActions: [{ name: 'Detect', desc: 'Makes a Perception check.' }],
		});
		expect(screen.getByText('Reactions')).toBeInTheDocument();
		expect(screen.getByText('Legendary Actions')).toBeInTheDocument();
	});
});
