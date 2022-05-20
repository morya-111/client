import React from "react";
import classNames from "classnames";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Pagination.css";
import { DOTS, usePagination } from "./usePagination";
import { Form, Formik } from "formik";
import TextInput from "components/Inputs/TextInput";
import { BiSearchAlt } from "react-icons/bi";

interface Props {
	count: number;
	page: number;
	onPageChange: (page: any) => any;
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
		<div>
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
				<Formik
					initialValues={{ pageNumber: "" }}
					onSubmit={(formData) => {
						onPageChange(formData.pageNumber);
					}}
				>
					<Form className="flex flex-grow w-full max-h-full bg-white rounded-lg md:mx-4 hover:shadow-xl">
						<div className="flex-grow max-h-[35px] w-full">
							<TextInput
								name="pageNumber"
								placeholder="Enter Page Number"
							/>
						</div>
						<button type="submit">
							<div className="flex items-center justify-center px-2 py-1 cursor-pointer ">
								<BiSearchAlt
									size={25}
									className="text-black hover:drop-shadow-xl"
								/>
							</div>
						</button>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default Pagination;
