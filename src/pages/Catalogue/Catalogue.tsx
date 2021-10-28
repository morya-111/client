import React from "react";
import Sidebar from "components/Catalogue/Sidebar";
import Search from "components/Catalogue/Search";

const Catalogue: React.FC = () => {
	return (
		<div className="grid w-full h-screen grid-cols-12 gap-2 px-2 md:px-12 bg-light">
			<div
				style={{ borderRightWidth: "1px" }}
				className="hidden col-span-2 md:block xl:col-span-1 border-opacity-20 border-r-dark"
			>
				<Sidebar />
			</div>
			<div className="flex flex-col col-span-full md:col-start-3 md:col-end-13 xl:col-start-2">
				<Search />
			</div>
		</div>
	);
};

export default Catalogue;
