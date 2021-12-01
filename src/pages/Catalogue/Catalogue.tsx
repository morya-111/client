import React, { useMemo } from "react";
import Sidebar from "components/Catalogue/Sidebar";
import Search from "components/Catalogue/Search";
import Card from "components/Catalogue/Card";
import Pagination from "components/Pagination";
import { useHistory, useLocation } from "react-router";
import { parse, stringify } from "query-string";
import { useQuery } from "react-query";
import api from "api";
import Loader from "components/Loader";
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";

const Catalogue: React.FC = () => {
	const { search } = useLocation();

	const history = useHistory();

	const setPage = (page: number) => {
		const queryParam = stringify(
			{ page, genre: selectedGenre, language: selectedLanguages },
			{ arrayFormat: "comma" }
		);
		history.push({
			pathname: `/catalogue`,
			search: `?${queryParam}`,
		});
	};

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

	const { data, isLoading, isPreviousData } = useQuery(
		["books", selectedGenre.join(","), page, selectedLanguages.join(",")],
		() =>
			api.get("/books", {
				params: {
					genre__in: selectedGenre.join(",") || undefined,
					page,
					language__in: selectedLanguages.join(",") || undefined,
				},
			}),
		{
			select: (data) => data.data.data,
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	);

	return (
		<>
			<NavigationBar />
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
										onClick={() =>
											history.push(`/books/${book.id}`)
										}
										key={idx}
										title={book.name}
										description={book.description}
										genre={book.genre}
										imgUrl={book.images[0].url}
									/>
								))}
							</div>

							{data.pagination.pages > 1 && (
								<div className="flex justify-center md:justify-end mb-9">
									<Pagination
										count={data.pagination.pages}
										page={page}
										onPageChange={(page) => setPage(page)}
										previousDisabled={
											!data.pagination.isPrevious
										}
										nextDisabled={
											!data.pagination.isNext ||
											isPreviousData
										}
									/>
								</div>
							)}
						</div>
					</>
				)}
			</div>
			<Footer />
		</>
	);
};

export default Catalogue;
