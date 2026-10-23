export type PageItem = number | 'gap';

export interface UsePaginationProps {
	totalItems: number;
	perPage: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, index) => from + index);

export const getPageItems = (currentPage: number, pageCount: number): PageItem[] => {
	if (pageCount <= 7) {
		return range(1, pageCount);
	}
	if (currentPage <= 4) {
		return [...range(1, 5), 'gap', pageCount];
	}
	if (currentPage >= pageCount - 3) {
		return [1, 'gap', ...range(pageCount - 4, pageCount)];
	}
	return [1, 'gap', currentPage - 1, currentPage, currentPage + 1, 'gap', pageCount];
};

export const usePagination = ({ totalItems, perPage, currentPage, onPageChange }: UsePaginationProps) => {
	const pageCount = Math.ceil(totalItems / perPage);
	return {
		pageCount,
		currentPage,
		items: getPageItems(currentPage, pageCount),
		hasPrevious: currentPage > 1,
		hasNext: currentPage < pageCount,
		goTo: onPageChange,
	};
};

export type PaginationState = ReturnType<typeof usePagination>;
