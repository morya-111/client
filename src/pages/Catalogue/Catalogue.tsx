import React from "react";
import Sidebar from "components/Catalogue/Sidebar";
import Search from "components/Catalogue/Search";
import Card from "components/Catalogue/Card";

const Catalogue: React.FC = () => {
	return (
		<div
			style={{ minHeight: "100vh" }}
			className="grid w-full grid-cols-12 gap-2 px-2 md:px-12 bg-light"
		>
			<div
				style={{ borderRightWidth: "1px" }}
				className="hidden col-span-2 md:block xl:col-span-1 border-opacity-20 border-r-dark"
			>
				<Sidebar />
			</div>
			<div className="flex flex-col col-span-full md:col-start-3 md:col-end-13 xl:col-start-2">
				<Search />
				<div className="grid gap-5 mx-8 my-4 sm:m-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
					<Card />
				</div>
			</div>
		</div>
	);
};

export default Catalogue;
