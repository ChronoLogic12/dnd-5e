import { useEffect, useRef } from 'react';

import type { Edition } from '../data/sources';
import { useEditionChange } from './edition/useEditionChange';
import { useCloseMissingOpen } from './useCloseMissingOpen';

interface UsePagedResultsProps<T> {
	results: T[];
	perPage: number;
	page: number;
	setPage: (page: number) => void;
	open: string | null;
	setOpen: (open: string | null) => void;
	edition: Edition;
	isLoading?: boolean;
}

export const usePagedResults = <T extends { id: string }>({
	results,
	perPage,
	page,
	setPage,
	open,
	setOpen,
	edition,
	isLoading = false,
}: UsePagedResultsProps<T>) => {
	const pageCount = Math.max(1, Math.ceil(results.length / perPage));
	const currentPage = Math.min(Math.max(page, 1), pageCount);
	const jumpedToOpen = useRef(false);

	useEffect(() => {
		if (jumpedToOpen.current || !open || isLoading) {
			return;
		}
		jumpedToOpen.current = true;
		const index = results.findIndex((result) => result.id === open);
		if (index >= 0 && Math.floor(index / perPage) + 1 !== currentPage) {
			setPage(Math.floor(index / perPage) + 1);
		}
	}, [open, results, perPage, currentPage, setPage, isLoading]);

	useCloseMissingOpen({ results, open, setOpen, isLoading });

	useEditionChange(edition, () => {
		setPage(1);
		setOpen(null);
	});

	return {
		currentPage,
		pageResults: results.slice((currentPage - 1) * perPage, currentPage * perPage),
	};
};
