import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';

import Conditions from '..';
import { renderPage, search, resultNames } from '../../../test/pageHelpers';

describe('Conditions page', () => {
	it('searches regardless of letter case', () => {
		renderPage(Conditions);
		search('PRONE');
		expect(resultNames()).toContain('Prone');
	});

	it('shows a message when nothing matches and recovers after clearing the search', () => {
		renderPage(Conditions);
		search('zzzz');
		expect(screen.getByText('No results found')).toBeInTheDocument();
		search('');
		expect(resultNames()).toContain('Prone');
	});

	it('opens one card at a time', () => {
		renderPage(Conditions);
		const blinded = screen.getByRole('button', { name: 'Blinded' });
		const charmed = screen.getByRole('button', { name: 'Charmed' });
		fireEvent.click(blinded);
		expect(blinded).toHaveAttribute('aria-expanded', 'true');
		fireEvent.click(charmed);
		expect(charmed).toHaveAttribute('aria-expanded', 'true');
		expect(blinded).toHaveAttribute('aria-expanded', 'false');
	});
});
