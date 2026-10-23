import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const renderPage = (Page: React.ComponentType) =>
	render(
		<MemoryRouter>
			<Page />
		</MemoryRouter>
	);

export const search = (text: string) => fireEvent.change(screen.getByLabelText(/^Search:?$/), { target: { value: text } });

export const selectOptions = (id: string, values: string[]) => {
	const select = document.getElementById(id) as HTMLSelectElement;
	for (const option of select.options) {
		option.selected = values.includes(option.value);
	}
	fireEvent.change(select);
};

export const resultsList = () =>
	screen.queryByTestId('card-list') ?? (document.querySelector('main ul.collapsible.no-autoinit') as HTMLElement);

export const resultNames = () =>
	[...resultsList().querySelectorAll('[data-card-title], :scope > li h6')].map((title) => title.textContent);
