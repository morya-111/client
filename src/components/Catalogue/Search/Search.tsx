import Drawer from "components/Drawer";
import TextInput from "components/Inputs/TextInput";
import React, { useMemo, useState } from "react";
import { FaFilter } from "react-icons/fa";
import Sidebar from "../Sidebar";
import { Form, Formik } from "formik";
import { BiSearchAlt } from "react-icons/bi";
import { parse, stringify } from "query-string";
import { useHistory, useLocation } from "react-router";

const Search: React.FC = () => {
	const [isDrawerOpen, setDrawerOpen] = useState(false);

	const history = useHistory();

	const { search } = useLocation();

	const selectedGenre = useMemo(() => {
		const parsed = parse(search, { arrayFormat: "comma" });
		if (typeof parsed["genre"] === "string") return [parsed["genre"]];
		return parsed["genre"] || [];
	}, [search]);

	const selectedLanguages = useMemo(() => {
		const parsed = parse(search, { arrayFormat: "comma" });
		if (typeof parsed["language"] === "string") return [parsed["language"]];
		return parsed["language"] || [];
	}, [search]);

	const page = useMemo(() => {
		const parsed = parse(search, { arrayFormat: "comma" });
		if (Array.isArray(parsed["page"]) || parsed["page"] === null) return 1;

		return parseInt(parsed["page"]) || 1;
	}, [search]);

	const setSearchTerm = (term: string) => {
		const queryParam = stringify(
			{
				page,
				genre: selectedGenre,
				language: selectedLanguages,
				s: term,
			},
			{ arrayFormat: "comma" }
		);
		history.push({
			pathname: `/catalogue`,
			search: `?${queryParam}`,
		});
	};

	return (
		<div className="flex w-full h-[35px] ">
			<div className="mr-3 md:hidden">
				<FaFilter
					size={30}
					className="hidden cursor-pointer text-dark"
					onClick={() => setDrawerOpen(true)}
				/>
			</div>
			<Formik
				initialValues={{ search: "" }}
				onSubmit={(formData) => {
					setSearchTerm(formData.search);
				}}
			>
				<Form className="flex flex-grow w-full max-h-full bg-white rounded-lg md:mx-4 hover:shadow-xl">
					<div className="flex-grow max-h-[35px] w-full">
						<TextInput name="search" placeholder="Search Book" />
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
			<Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
				<div className="h-full px-8 py-4 overflow-auto rounded-r-lg bg-light">
					<Sidebar />
				</div>
			</Drawer>
		</div>
	);
};

export default Search;
