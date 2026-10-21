import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const renderPage = (Page: React.ComponentType) =>
	render(
		<MemoryRouter>
			<Page />
		</MemoryRouter>
	);

export const search = (text: string) => fireEvent.change(screen.getByLabelText('Search:'), { target: { value: text } });

export const selectOptions = (id: string, values: string[]) => {
	const select = document.getElementById(id) as HTMLSelectElement;
	for (const option of select.options) {
		option.selected = values.includes(option.value);
	}
	fireEvent.change(select);
};

export const resultsList = () => {
	const list = document.querySelector<HTMLElement>('main ul.collapsible.no-autoinit');
	if (!list) {
		throw new Error('Results list not found');
	}
	return list;
};

export const resultNames = () =>
	[...resultsList().querySelectorAll(':scope > li h6')].map((heading) => heading.textContent);
