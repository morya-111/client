import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "components/Catalogue/Sidebar";
import Search from "components/Catalogue/Search";
import Card from "components/Catalogue/Card";
import Pagination from "components/Pagination";
import { useHistory, useLocation } from "react-router";
import { parse, stringify } from "query-string";
import { useQuery, useQueryClient } from "react-query";
import api from "api";
import Loader from "components/Loader";
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import { ReactComponent as FilterIcon } from "assets/2.0/filtericon.svg";
import { ReactComponent as SearchIcon } from "assets/2.0/searchicon.svg";
import { ReactComponent as CloseIcon } from "assets/2.0/closeicon.svg";
import Badge from "components/Badge";

type ImageResponseType = {
	id: number;
	url: string;
	label: string | null;
};
type BookType = {
	id: number;
	name: string;
	description: string | null;
	genre: string;
	author: string;
	publisher: string;
	language: {
		id: number;
		name: string;
		priority: number;
	};
	image: ImageResponseType;
};
type BookResponseType = {
	data: {
		books: BookType[];
		pagination: any;
	};
};

const Catalogue: React.FC = () => {
	const { search } = useLocation();

	const history = useHistory();

	const queryClient = useQueryClient();

	const setPage = (page: number) => {
		const queryParam = stringify(
			{
				page,
				s: searchTerm,
				genre: selectedGenre,
				language: selectedLanguages,
			},
			{ arrayFormat: "comma" }
		);
		history.push({
			pathname: `/catalogue`,
			search: `?${queryParam}`,
		});
	};

	const searchTerm = useMemo(() => {
		const parsed = parse(search);
		if (Array.isArray(parsed["s"]) || parsed["s"] === null) return null;

		return parsed["s"] || null;
	}, [search]);

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
	const { data, isLoading, isPreviousData, isFetching, isRefetching } =
		useQuery(
			[
				"books",
				selectedGenre.join(","),
				page,

				searchTerm,
				selectedLanguages.join(","),
			],
			() =>
				api.get<BookResponseType>("/books", {
					params: {
						genre__in: selectedGenre.join(",") || undefined,
						page,
						limit: 40,
						language__in: selectedLanguages.join(",") || undefined,
						s: searchTerm || undefined,
					},
				}),
			{
				keepPreviousData: true,
				refetchOnWindowFocus: false,
				staleTime: 30000,
				onSuccess: (data) => {
					data.data.data.books.map((book) => {
						queryClient.setQueryData(["book", book.id], book);
					});
				},
			}
		);

	const [openSidebar, setOpenSidebar] = useState(false);
	const [openSearchBar, setOpenSearchBar] = useState(false);

	const [scrollPosition, setScrollPosition] = useState(0);

	const [stopOpen, setStopOpen] = useState(false);

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	var t: any;

	const [filterCount, setFilterCount] = useState<number>(0);

	return (
		<>
			<div className="overflow-y-hidden ">
				<div className="">
					<div className="">
						<NavigationBar />

						<div className="relative w-full min-h-screen bg-bgGrey45">
							<div
								className={
									scrollPosition > 70
										? "fixed top-0 z-50  "
										: " "
								}
							>
								{" "}
								<div className="h-[40px] bg-[#bababa] sticky top-0 w-screen flex justify-center items-center z-50">
									<button
										className="absolute left-0 mainbutton"
										onClick={() => {
											setOpenSidebar(!openSidebar);
										}}
									>
										<h2 className="flex items-center h-full text-lg ml-14 font-imFell">
											Filter
											<div className="ml-2 mr-2 hover:animate-scale-reveal">
												<FilterIcon />
											</div>
											<div className="hover:animate-scale-reveal">
												<Badge
													bgColor="#000"
													label={filterCount}
												/>
											</div>
										</h2>
									</button>
									<button className="h-full px-3 ">
										{" "}
										{openSearchBar ? (
											<div
												className="flex items-center justify-center h-full px-2 "
												onClick={() => {
													setOpenSearchBar(false);
													setStopOpen(true);
												}}
											>
												<CloseIcon />
											</div>
										) : (
											<div
												className="flex items-center justify-center h-full px-2 "
												onMouseMove={() => {
													!stopOpen &&
														setOpenSearchBar(true);
												}}
												onMouseLeave={() => {
													setStopOpen(false);
												}}
												onClick={() => {
													!openSearchBar &&
														setOpenSearchBar(true);
												}}
											>
												<SearchIcon />
											</div>
										)}
									</button>
								</div>
								<div
									className={
										openSearchBar
											? "w-screen h-[30px] absolute top-[40px] flex justify-center"
											: " w-screen h-[30px] absolute top-0  flex justify-center"
									}
								>
									<svg
										style={{
											filter: "drop-shadow(0px 4px 15px #A8A8A8)",
										}}
										width="981"
										height="35"
										viewBox="0 0 981 44"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M0 0H981L963.831 14.2539C940.675 33.4775 911.527 44 881.431 44H100.805C72.0915 44 44.1987 34.4202 21.5444 16.7779L0 0Z"
											fill="white"
										/>
									</svg>
									<div
										onClick={() => {
											clearTimeout(t);
											console.log(t);
											setOpenSearchBar(true);
										}}
										className="absolute h-full w-[42%]"
									>
										<Search />
									</div>
								</div>
								<div
									className={
										openSidebar
											? "absolute h-screen"
											: "absolute"
									}
								>
									<div
										className={
											openSidebar
												? scrollPosition > 70
													? "bg-[#bababa] h-[100%] w-[256px] absolute left-0 top-0 z-[999] overflow-scroll"
													: "bg-[#bababa] h-[calc(100%-110px)] w-[256px] absolute left-0 top-0 z-50 overflow-scroll"
												: "h-0 w-64 sticky top-0 left-0 "
										}
									>
										<div
											className={
												openSidebar ? "" : "hidden"
											}
										>
											<Sidebar
												filterCount={filterCount}
												setFilterCount={setFilterCount}
											/>
										</div>
									</div>
								</div>
								<div
									onClick={() => {
										setOpenSidebar(!openSidebar);
									}}
									className={
										openSidebar
											? "bg-bgScreen w-[calc(100%-256px)] h-screen absolute right-0 top-0 z-50"
											: " w-[calc(100%-256px)] sticky right-0 top-0"
									}
								></div>
							</div>

							{/* <div
					style={{ borderRightWidth: "1px" }}
					className="hidden col-span-2 md:block xl:col-span-1 border-opacity-20 border-r-dark mt-[40px]"
				>
					<Sidebar />
				</div> */}
							<div className="flex flex-col col-span-full col-start-1 mt-[40px] px-2 md:px-14 noneed">
								{/* <Search /> */}
								{isLoading || isFetching || isRefetching ? (
									<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 noneed">
										<Loader />
									</div>
								) : (
									<>
										<div className="grid mx-8 my-4 gap-x-10 gap-y-12 sm:m-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 noneed ">
											{(
												data?.data.data
													.books as Array<any>
											).map((book, idx) => (
												<Card
													onClick={() =>
														history.push(
															`/books/${book.id}`
														)
													}
													key={idx}
													title={book.name}
													description={
														book.description
													}
													genre={book.genre}
													imgUrl={book.image.url}
													borrow={
														book.rentListing !==
														null
													}
													sell={
														book.sellListing !==
														null
													}
												/>
											))}
										</div>
										{data?.data.data.pagination.pages >
											1 && (
											<div className="flex justify-center mt-10 md:justify-end mb-9">
												<Pagination
													count={
														data?.data.data
															.pagination.pages
													}
													page={page}
													onPageChange={(page) => {
														window.scrollTo(0, 0);
														setPage(page);
													}}
													previousDisabled={
														!data?.data.data
															.pagination
															.isPrevious
													}
													nextDisabled={
														!data?.data.data
															.pagination
															.isNext ||
														isPreviousData
													}
												/>
											</div>
										)}
									</>
								)}
							</div>
						</div>
						<div className="z-40">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Catalogue;
