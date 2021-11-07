import React, { useMemo } from "react";
import Sidebar from "components/Catalogue/Sidebar";
import Search from "components/Catalogue/Search";
import Card from "components/Catalogue/Card";
import Pagination from "components/Pagination";
import { useLocation } from "react-router";
import { parse } from "query-string";
import { useQuery } from "react-query";
import api from "api";
import Loader from "components/Loader";

const Catalogue: React.FC = () => {
	const { search } = useLocation();

	const selectedGenre = useMemo(() => {
		const parsed = parse(search, { arrayFormat: "comma" });
		if (typeof parsed["genre"] === "string") return [parsed["genre"]];
		return parsed["genre"] || [];
	}, [search]);

	const { data, isLoading } = useQuery(
		["books", selectedGenre.join(",")],
		() =>
			api.get("/books", {
				params: { genre__in: selectedGenre.join(",") || undefined },
			}),
		{
			select: (data) => data.data.data,
		}
	);

	return (
		<div
			style={{ minHeight: "100vh" }}
			className="grid w-full grid-cols-12 gap-2 px-2 md:px-12 bg-light"
		>
			{isLoading ? (
				<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
					<Loader />
				</div>
			) : (
				<>
					<div
						style={{ borderRightWidth: "1px" }}
						className="hidden col-span-2 md:block xl:col-span-1 border-opacity-20 border-r-dark"
					>
						<Sidebar />
					</div>
					<div className="flex flex-col col-span-full md:col-start-3 md:col-end-13 xl:col-start-2">
						<Search />
						<div className="grid gap-5 mx-8 my-4 sm:m-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
							{(data.books as Array<any>).map((book, idx) => (
								<Card
									key={idx}
									title={book.name}
									description={book.description}
									genre={book.genre}
									imgUrl={book.images[0].url}
								/>
							))}
						</div>
						<div className="flex justify-center md:justify-end">
							<Pagination />
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Catalogue;
