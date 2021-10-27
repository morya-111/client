import React from "react";
import { FaFilter } from "react-icons/fa";

const Search: React.FC = () => {
	return (
		<div className="flex w-full">
			<div className="mr-3 md:hidden">
				<FaFilter size={30} className="text-dark" />
			</div>
			<div className="flex-grow text-lg text-center bg-gray-400">
				Search Goes here
			</div>
		</div>
	);
};

export default Search;
