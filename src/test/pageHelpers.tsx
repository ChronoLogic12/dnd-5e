import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import { EditionProvider } from '../utils/edition';

export const renderPage = (Page: React.ComponentType) =>
	render(
		<MemoryRouter>
			<EditionProvider>
				<Page />
			</EditionProvider>
		</MemoryRouter>
	);

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
