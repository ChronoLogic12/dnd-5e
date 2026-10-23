import { describe, it, expect } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';

import Conditions from '..';
import { renderPage, search, resultNames, switchEdition, currentQuery } from '../../../test/pageHelpers';

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

	it('swaps to the 2024 conditions when the edition changes', () => {
		renderPage(Conditions);
		switchEdition('2024');
		expect(screen.getByText('Results found: 15')).toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: 'Prone' }));
		expect(screen.getByText(/Restricted Movement/)).toBeInTheDocument();
	});

	it('keeps the open card in the URL', async () => {
		renderPage(Conditions, '/conditions?open=srd-2014/prone');
		expect(screen.getByRole('button', { name: 'Prone' })).toHaveAttribute('aria-expanded', 'true');
		fireEvent.click(screen.getByRole('button', { name: 'Blinded' }));
		await waitFor(() => expect(currentQuery().get('open')).toBe('srd-2014/blinded'));
	});

	it('closes the open card when the edition changes', async () => {
		renderPage(Conditions, '/conditions?open=srd-2014/prone');
		switchEdition('2024');
		await waitFor(() => expect(currentQuery().get('open')).toBeNull());
		expect(currentQuery().get('edition')).toBe('2024');
	});

	it('closes the open card when a search hides it', async () => {
		renderPage(Conditions, '/conditions?open=srd-2014/prone');
		search('blind');
		await waitFor(() => expect(currentQuery().get('open')).toBeNull());
	});
});
