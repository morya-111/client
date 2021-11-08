import React, { useMemo } from "react";
import Checkbox from "components/Inputs/Checkbox";
import { stringify, parse } from "query-string";

import GENRES from "./genres";
import "./Sidebar.css";
import { useLocation, useHistory } from "react-router-dom";

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

	const selectedGenre = useMemo(() => {
		const parsed = parse(search, { arrayFormat: "comma" });
		return parsed["genre"] || [];
	}, [search]);

	const page = useMemo(() => {
		const parsed = parse(search, { arrayFormat: "comma" });
		if (Array.isArray(parsed["page"]) || parsed["page"] === null) return 1;

		return parseInt(parsed["page"]) || 1;
	}, [search]);

	return (
		<div className="flex flex-col ">
			<div className="sidebar-element">
				<Checkbox label="For Sale" />
			</div>
			<div className="sidebar-element">
				<Checkbox label="For Rent" />
			</div>
			<span className="title">Language</span>
			<div className="sidebar-element">
				<Checkbox label="English" />
			</div>
			<div className="sidebar-element">
				<Checkbox label="Hindi" />
			</div>
			<div className="sidebar-element">
				<Checkbox label="Marathi" />
			</div>
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
								{ genre: newSelectedGenre, page },
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
