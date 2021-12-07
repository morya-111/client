import React, { useMemo, useState } from "react";
import Checkbox from "components/Inputs/Checkbox";
import { stringify, parse } from "query-string";

import GENRES from "./genres";
import "./Sidebar.css";
import { useLocation, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import api from "api";
import Loader from "components/Loader";

function toggleValueInArray<T>(arr: T[] | T, value: T) {
	if (!Array.isArray(arr)) {
		if (arr === value) return [];
		else return [arr, value];
	} else {
		const idx = arr.findIndex((e) => e === value);
		if (idx === -1) return [...arr, value];
		else return arr.filter((item) => item !== value);
	}
}

const Sidebar: React.FC = () => {
	const { search } = useLocation();
	const history = useHistory();

	const [expanded, setExpanded] = useState(false);

	const MIN_LANGUAGE_ITEMS = 3;

	const searchTerm = useMemo(() => {
		const parsed = parse(search);
		if (Array.isArray(parsed["s"]) || parsed["s"] === null) return "";

		return parsed["s"] || "";
	}, [search]);

	const selectedGenre = useMemo(() => {
		const parsed = parse(search, { arrayFormat: "comma" });
		return parsed["genre"] || [];
	}, [search]);

	const page = useMemo(() => {
		const parsed = parse(search, { arrayFormat: "comma" });
		if (Array.isArray(parsed["page"]) || parsed["page"] === null) return 1;

		return parseInt(parsed["page"]) || 1;
	}, [search]);

	const selectedLanguages = useMemo(() => {
		const parsed = parse(search, { arrayFormat: "comma" });
		return parsed["language"] || [];
	}, [search]);

	const { data, isLoading, isSuccess } = useQuery(
		["languages"],
		() => api.get("/languages", { params: { order: "-priority" } }),
		{
			select: (data) => data.data.data,
			refetchOnWindowFocus: false,
		}
	);

	return (
		<div className="flex flex-col ">
			<div className="sidebar-element">
				<Checkbox label="For Sale" />
			</div>
			<div className="sidebar-element">
				<Checkbox label="For Rent" />
			</div>
			<span className="title">Language</span>
			{isLoading && !isSuccess ? (
				<Loader size="sm" />
			) : (
				<>
					{(data.languages as Array<any>)
						.slice(0, expanded ? undefined : MIN_LANGUAGE_ITEMS)
						.map((language, idx) => (
							<div className="sidebar-element" key={idx}>
								<Checkbox
									label={language.name}
									checked={selectedLanguages.includes(
										language.id.toString()
									)}
									onChange={() => {
										const newSelectedLanguage =
											toggleValueInArray<string>(
												selectedLanguages,
												language.id.toString()
											);
										const queryParam = stringify(
											{
												language: newSelectedLanguage,
												page,
												genre: selectedGenre,
												s: searchTerm,
											},
											{ arrayFormat: "comma" }
										);
										history.push({
											pathname: `/catalogue`,
											search: `?${queryParam}`,
										});
									}}
								/>
							</div>
						))}
					<div
						className="text-sm cursor-pointer text-dark hover:text-semiDark"
						onClick={() => setExpanded(!expanded)}
					>
						{expanded ? "Show Less" : "Show More"}
					</div>
				</>
			)}
			<span className="title">Genre</span>
			{GENRES.map((genre, idx) => (
				<div className="sidebar-element" key={idx}>
					<Checkbox
						label={genre}
						checked={selectedGenre.includes(genre)}
						onChange={() => {
							const newSelectedGenre = toggleValueInArray<string>(
								selectedGenre,
								genre
							);
							const queryParam = stringify(
								{
									genre: newSelectedGenre,
									page,
									language: selectedLanguages,
									s: searchTerm,
								},
								{ arrayFormat: "comma" }
							);
							history.push({
								pathname: `/catalogue`,
								search: `?${queryParam}`,
							});
						}}
					/>
				</div>
			))}
		</div>
	);
};

export default Sidebar;
