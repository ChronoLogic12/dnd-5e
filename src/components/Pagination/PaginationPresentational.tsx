import React from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import css from './style.module.css';
import type { PaginationState } from './usePagination';

export default function PaginationPresentational({
	currentPage,
	items,
	hasPrevious,
	hasNext,
	goTo,
}: PaginationState) {
	return (
		<nav className={css.pagination} aria-label="Pages">
			<button
				className={css.arrow}
				disabled={!hasPrevious}
				onClick={() => goTo(currentPage - 1)}
				aria-label="Previous page"
			>
				<IoChevronBack aria-hidden />
			</button>
			{items.map((item, index) =>
				item === 'gap' ? (
					<span key={`gap-${index}`} className={css.gap} aria-hidden>
						…
					</span>
				) : (
					<button
						key={item}
						className={css.page}
						aria-current={item === currentPage ? 'page' : undefined}
						onClick={() => goTo(item)}
					>
						{item}
					</button>
				)
			)}
			<button
				className={css.arrow}
				disabled={!hasNext}
				onClick={() => goTo(currentPage + 1)}
				aria-label="Next page"
			>
				<IoChevronForward aria-hidden />
			</button>
		</nav>
	);
}
