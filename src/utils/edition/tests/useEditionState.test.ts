import { describe, it, expect, afterEach } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing';
import type { UrlUpdateEvent } from 'nuqs/adapters/testing';

import { EDITION_STORAGE_KEY, useEditionState } from '../useEditionState';

const renderEdition = (searchParams = '', onUrlUpdate?: (event: UrlUpdateEvent) => void) =>
	renderHook(useEditionState, { wrapper: withNuqsTestingAdapter({ searchParams, onUrlUpdate }) });

describe('useEditionState', () => {
	afterEach(() => localStorage.clear());

	it('starts on 2014 when nothing is stored or in the URL', () => {
		expect(renderEdition().result.current.edition).toBe('2014');
	});

	it('remembers the chosen edition and puts 2024 in the URL', async () => {
		const urls: string[] = [];
		const { result } = renderEdition('', (event) => urls.push(event.queryString));
		act(() => result.current.setEdition('2024'));
		expect(result.current.edition).toBe('2024');
		expect(localStorage.getItem(EDITION_STORAGE_KEY)).toBe('2024');
		await waitFor(() => expect(urls.at(-1)).toBe('?edition=2024'));
		expect(renderEdition().result.current.edition).toBe('2024');
	});

	it('follows an edition in the URL and remembers it', () => {
		expect(renderEdition('?edition=2024').result.current.edition).toBe('2024');
		expect(localStorage.getItem(EDITION_STORAGE_KEY)).toBe('2024');
	});

	it('ignores unknown stored and URL values', () => {
		localStorage.setItem(EDITION_STORAGE_KEY, '3000');
		expect(renderEdition('?edition=3000').result.current.edition).toBe('2014');
	});
});
