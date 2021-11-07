import React from "react";
import classNames from "classnames";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Pagination.css";
import { DOTS, usePagination } from "./usePagination";

interface Props {
	count: number;
	page: number;
	onPageChange: (page: number) => any;
	previousDisabled: boolean;
	nextDisabled: boolean;
}

const Pagination: React.FC<Props> = ({
	count,
	page,
	onPageChange,
	nextDisabled = false,
	previousDisabled = false,
}) => {
	const paginationRange = usePagination({ page, count, siblingCount: 0 })!;

	return (
		<div className="flex items-center text-dark">
			<button
				disabled={previousDisabled}
				className="disabled:opacity-50"
				onClick={() => {
					onPageChange(page - 1);
				}}
			>
				<FaChevronLeft className="btn " size={20} />
			</button>
			{paginationRange.map((pageNumber, idx) => {
				if (pageNumber === DOTS) {
					return (
						<span key={idx} className="px-2 py-1">
							...
						</span>
					);
				}

				return (
					<span
						key={idx}
						className={classNames("page", {
							"active-page": pageNumber === page,
							"inactive-page": pageNumber !== page,
						})}
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</span>
				);
			})}
			<button
				disabled={nextDisabled}
				className="disabled:opacity-50"
				onClick={() => {
					onPageChange(page + 1);
				}}
			>
				<FaChevronRight className="btn" size={20} />
			</button>
		</div>
	);
};

export default Pagination;
