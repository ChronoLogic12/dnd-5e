import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import userEvent from '@testing-library/user-event';

import { EditionProvider } from '../utils/edition';

export const renderPage = (Page: React.ComponentType, path = '/') => {
	window.history.replaceState(null, '', path);
	return render(
		<BrowserRouter>
			<NuqsAdapter>
				<EditionProvider>
					<Page />
				</EditionProvider>
			</NuqsAdapter>
		</BrowserRouter>
	);
};

export const currentQuery = () => new URLSearchParams(window.location.search);

export const search = (text: string) => fireEvent.change(screen.getByLabelText('Search'), { target: { value: text } });

export const switchEdition = (edition: '2014' | '2024') =>
	fireEvent.click(screen.getByRole('button', { name: edition }));

export const openFilters = () => fireEvent.click(screen.getByRole('button', { name: /^Filter/ }));

export const chooseOptions = async (label: string, options: string[]) => {
	const user = userEvent.setup();
	await user.click(screen.getByRole('combobox', { name: label }));
	for (const name of options) {
		await user.click(await screen.findByRole('option', { name }));
	}
	await user.keyboard('{Escape}');
};

export const resultsList = () => screen.getByTestId('card-list');

export const resultNames = () =>
	[...resultsList().querySelectorAll('[data-card-title]')].map((title) => title.textContent);
