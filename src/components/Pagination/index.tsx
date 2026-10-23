import React from 'react';

import PaginationPresentational from './PaginationPresentational';
import { usePagination } from './usePagination';
import type { UsePaginationProps } from './usePagination';

export default function Pagination(props: UsePaginationProps) {
	const pagination = usePagination(props);
	return pagination.pageCount > 1 ? <PaginationPresentational {...pagination} /> : null;
}
