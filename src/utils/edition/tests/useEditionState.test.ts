import { describe, it, expect, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { EDITION_STORAGE_KEY, useEditionState } from '../useEditionState';

describe('useEditionState', () => {
	afterEach(() => localStorage.clear());

	it('starts on 2014 when nothing is stored', () => {
		expect(renderHook(useEditionState).result.current.edition).toBe('2014');
	});

	it('remembers the chosen edition', () => {
		const { result } = renderHook(useEditionState);
		act(() => result.current.setEdition('2024'));
		expect(result.current.edition).toBe('2024');
		expect(localStorage.getItem(EDITION_STORAGE_KEY)).toBe('2024');
		expect(renderHook(useEditionState).result.current.edition).toBe('2024');
	});

	it('ignores an unknown stored value', () => {
		localStorage.setItem(EDITION_STORAGE_KEY, '3000');
		expect(renderHook(useEditionState).result.current.edition).toBe('2014');
	});
});
