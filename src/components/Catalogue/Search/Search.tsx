import Drawer from "components/Drawer";
import TextInput from "components/Inputs/TextInput";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Sidebar from "../Sidebar";
import { Form, Formik } from "formik";
import { BiSearchAlt } from "react-icons/bi";

const Search: React.FC = () => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);

	return (
		<div className="flex w-full">
			<div className="mr-3 md:hidden">
				<FaFilter
					size={30}
					className="cursor-pointer text-dark"
					onClick={() => setDrawerOpen(true)}
				/>
			</div>
			<Formik initialValues={{ test: "" }} onSubmit={() => {}}>
				<Form className="flex flex-grow rounded-lg bg-semiLight hover:shadow-xl">
					<div className="flex-grow">
						<TextInput name="test" />
					</div>
					<div className="flex items-center justify-center px-2 py-1 cursor-pointer ">
						<BiSearchAlt
							size={35}
							className="text-light hover:drop-shadow-xl"
						/>
					</div>
				</Form>
			</Formik>
			<Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
				<div className="h-full px-8 py-4 overflow-auto rounded-r-lg bg-light">
					<Sidebar />
				</div>
			</Drawer>
		</div>
	);
};

export default Search;
