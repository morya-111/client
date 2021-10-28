import Drawer from "components/Drawer";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Sidebar from "../Sidebar";

const Search: React.FC = () => {
	const [isDrawerOpen, setDrawerOpen] = useState(true);

	return (
		<div className="flex w-full">
			<div className="mr-3 md:hidden">
				<FaFilter
					size={30}
					className="text-dark"
					onClick={() => setDrawerOpen(true)}
				/>
			</div>
			<div className="flex-grow text-lg text-center bg-gray-400">
				Search Goes here
			</div>
			<Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
				<div className="h-full px-8 py-4 rounded-r-lg bg-light">
					<Sidebar />
				</div>
			</Drawer>
		</div>
	);
};

export default Search;
