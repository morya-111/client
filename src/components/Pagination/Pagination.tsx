import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Pagination.css";

const Pagination: React.FC = () => {
	return (
		<div className="flex items-center text-dark">
			<FaChevronLeft className="btn" size={20} />
			<span className="active-page page">1</span>
			<span className="inactive-page page">2</span>
			<span className="inactive-page page">3</span>

			<FaChevronRight className="btn" size={20} />
		</div>
	);
};

export default Pagination;
