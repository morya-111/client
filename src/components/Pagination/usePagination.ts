import { useMemo } from "react";

// CREDIT https://github.com/mayankshubham/react-pagination

export const DOTS = -1;

interface Args {
	count: number;
	page: number;
	siblingCount?: number;
}

const range = (start: number, end: number) => {
	let length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({ count, siblingCount = 1, page }: Args) => {
	const paginationRange = useMemo(() => {
		// Pages count is determined as siblingCount + firstPage + lastPage + page + 2*DOTS
		const totalPageNumbers = siblingCount + 5;

		/*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..count]
    */
		if (totalPageNumbers >= count) {
			return range(1, count);
		}

		const leftSiblingIndex = Math.max(page - siblingCount, 1);
		const rightSiblingIndex = Math.min(page + siblingCount, count);

		/*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < count - 2;

		const firstPageIndex = 1;
		const lastPageIndex = count;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount;
			let leftRange = range(1, leftItemCount);

			return [...leftRange, DOTS, count];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount;
			let rightRange = range(count - rightItemCount + 1, count);
			return [firstPageIndex, DOTS, ...rightRange];
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [count, siblingCount, page]);

	return paginationRange;
};
