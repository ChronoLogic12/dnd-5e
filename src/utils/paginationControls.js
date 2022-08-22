const paginationControls = (direction) => {
	const operator = direction == forward ? +1 : -1;
	currentPage != pageNumbers.length
		? () => {
				paginate(currentPage + operator);
		  }
		: null;
};
