import React, { useMemo, useState } from "react";
import NavigationBar from "components/NavigationBar/NavigationBar";
import Footer from "components/Footer";
import { NavLink, Link } from "react-router-dom";
import useCachedLoginStatus from "hooks/useCachedLoginStatus";
import Typewriter from "typewriter-effect";
import Slider from "components/Slider";
import { useQuery, useQueryClient } from "react-query";
import { useHistory, useLocation } from "react-router";
import { parse, stringify } from "query-string";
import api from "api";
import Loader from "components/Loader";
import { BsArrowDown } from "react-icons/bs";

//new
import NewHeroImg from "assets/2.0/landinghero.png";
import NewHeroImgBook1 from "assets/2.0/landingherobook1.png";
import NewHeroImgBook2 from "assets/2.0/landingherobook2.png";
import NewHeroImgGirl from "assets/2.0/landingherogirl.png";
import BooksCatalogue from "assets/2.0/bookscatalogue.png";
import BooksListing from "assets/2.0/bookslisting.png";
import BooksListingSignUp from "assets/2.0/bookslisitingsignup.png";
import JoinCommunity from "assets/2.0/joincommunity.png";

const SliderProps = {
	zoomFactor: 5, // How much the image should zoom on hover in percent
	slideMargin: 10, // Margin on each side of slides
	maxVisibleSlides: 5,
	pageTransition: 500, // Transition when flipping pages
};

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

const Landing = () => {
	const isLoggedIn = useCachedLoginStatus();
	const [inHover, setHover] = useState(false);
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

	const [limit, setLimit] = useState(54);
	const { data, isLoading, isPreviousData, isFetching, isRefetching } =
		useQuery(
			[
				"all_books",
				limit,
				// selectedGenre.join(","),
				// page,
				// searchTerm,
				// selectedLanguages.join(","),
			],
			() =>
				api.get<BookResponseType>("/books", {
					params: {
						limit: limit,
						// genre__in: selectedGenre.join(",") || undefined,
						// page,
						// language__in: selectedLanguages.join(",") || undefined,
						// s: searchTerm || undefined,
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
	return (
		<div>
			{/* LandingPart1 */}
			<div className="flex justify-center h-screen min-w-full -ml-4 overflow-hidden md:ml-0 bg-bgGrey100">
				<div className="absolute top-0 right-0 min-w-full">
					<NavigationBar />
				</div>
				<div className="flex mdsemi:justify-around justify-center pt-0 mb-5 md:flex flex-nowrap mt-[70px] h-full w-full">
					<div className="relative hidden h-full mdsemi:block">
						<img
							src={NewHeroImgGirl}
							alt="LandingHero"
							className="flex flex-none flex-shrink-0 h-[calc(100%-70px)] "
						/>
						<img
							src={NewHeroImgBook1}
							alt="LandingHero"
							className="absolute top-0 flex flex-none flex-shrink-0 h-[calc(100%-70px)] animate-float"
						/>
						<img
							src={NewHeroImgBook2}
							alt="LandingHero"
							className="absolute top-0 flex flex-none flex-shrink-0 h-[calc(100%-70px)] animate-float2"
						/>
					</div>
					<div className="min-w-[37ch] md:w-[49ch] lg:w-[60ch] xl:w-[75ch] h-[calc(100%-70px)] flex flex-col md:justify-between justify-between">
						<div>
							<h1
								className="text-3xl font-black text-black md:text-4xl lg:text-5xl xl:text-6xl font-martel mt-[15%] text-center mdsemi:text-left"
								style={{
									textShadow:
										"0px 4px 4px rgba(0, 0, 0, 0.25)",
									lineHeight: "136.9%",
								}}
							>
								Trying To Find Your
								<br /> Favorite book?
							</h1>
							<h2
								className="flex justify-center mt-2 text-base font-bold text-right mdsemi:justify-end md:text-xl lg:text-2xl xl:text-3xl text-dark font-martel"
								style={{ lineHeight: "136.9%" }}
							>
								At one place&nbsp;
								<Typewriter
									options={{
										strings: [
											"Buy",
											"Sell",
											"Rent",
											"Borrow",
										],
										autoStart: true,
										loop: true,
										cursor: "|",
									}}
								/>
								used Books...
							</h2>

							<div className="grid grid-rows-2 gap-2 mt-5 place-content-center mdsemi:place-content-end">
								{/* <button className="px-4 py-1 rounded bg-semiLight text-light hover:drop-shadow-md">
								<NavLink to="/catalogue">
									Go To Catalogue
								</NavLink>
							</button> */}
								{isLoggedIn ? (
									<button
										className="items-center px-8 py-2 text-center text-white bg-black rounded-[6px] font-imFell hover:scale-[102%] "
										style={{
											boxShadow:
												"0px 4px 4px rgba(0, 0, 0, 0.25)",
										}}
									>
										<NavLink to="/book/create">
											Add A Book
										</NavLink>
									</button>
								) : (
									<NavLink to="/signup">
										<button
											className="items-center px-8 py-2 text-center text-white bg-black rounded-[6px] font-imFell hover:scale-[102%] text-sm md:text-base lg:text-lg xl:text-xl"
											style={{
												boxShadow:
													"0px 4px 4px rgba(0, 0, 0, 0.25)",
											}}
										>
											Sign Up
										</button>
									</NavLink>
								)}
							</div>
						</div>
						<div className="relative flex justify-center h-full mdsemi:hidden">
							<img
								src={NewHeroImgGirl}
								alt="LandingHero"
								className="flex flex-none flex-shrink-0 h-[calc(100%-70px)] "
							/>
							<img
								src={NewHeroImgBook1}
								alt="LandingHero"
								className="absolute top-0 flex flex-none flex-shrink-0 h-[calc(100%-70px)] animate-float"
							/>
							<img
								src={NewHeroImgBook2}
								alt="LandingHero"
								className="absolute top-0 flex flex-none flex-shrink-0 h-[calc(100%-70px)] animate-float2"
							/>
							<div className="absolute bottom-0 mdsemi:hidden">
								<h1
									onClick={() => {
										setLimit(limit + 54);
									}}
									className="text-sm italic text-center font-imFell "
								>
									“Wear the old coat and buy the new book.”
								</h1>
							</div>
						</div>
						<div className="relative items-center justify-center hidden mdsemi:flex">
							<h1
								onClick={() => {
									setLimit(limit + 54);
								}}
								className="text-2xl italic text-center font-imFell "
							>
								“Wear the old coat and buy the new book.”
							</h1>
							<div className="absolute right-0 animate-float3">
								<BsArrowDown size={30} />
							</div>
						</div>
					</div>

					{/* <div>
						<HeroImg className="flex flex-none flex-shrink-0 " />
					</div> */}
					{/* <img
						src={Hero}
						className="flex flex-none flex-shrink-0 "
					></img> */}
				</div>
			</div>

			{/* LandingPart2 */}
			<div
				className="w-auto h-[282px] bg-bgGrey45 flex justify-center items-center"
				style={{
					boxShadow: "0px 4px 100px rgba(0, 0, 0, 0.25)",
				}}
			>
				{isLoading || isFetching || isRefetching ? (
					<div className="">
						<Loader />
					</div>
				) : (
					<Slider {...SliderProps}>
						{(data?.data.data.books as Array<any>).map(
							(book, idx) => (
								<div className="w-44 max-h-52" key={idx}>
									<img
										src={book.image.url}
										alt={book.name}
										className="h-full"
										onClick={() =>
											history.push(`/books/${book.id}`)
										}
									/>
								</div>
							)
						)}
					</Slider>
				)}
			</div>

			{/* LandingPart3 */}
			<div className="w-auto min-h-screen bg-clip-padding bg-bgGrey45">
				<div className="flex justify-center">
					<div className="w-screen mt-10 md:mt-24">
						<h1 className="text-5xl font-bold text-center text-black font-imFell">
							Check What You Can Do Here...
						</h1>

						<div className="grid justify-center mt-16 md:justify-around lg:flex md:flex-wrap">
							<div className="flex flex-col items-center h-auto w-[216px] mt-9">
								{/* <img
									src={First}
									alt="1"
									className="h-auto w-72"
								/> */}
								<Link className="w-full" to="/catalogue">
									<div className="bg-[#C4C4C4] w-full h-[253px] rounded-[12px] relative">
										<img
											className="absolute bottom-0 hover:scale-[102%] hover:transition-none transition ease-out"
											src={BooksCatalogue}
											alt="BooksCatImg"
										/>
									</div>
								</Link>

								{/* <First className="h-auto w-72" /> */}
								<div className="flex flex-col items-center justify-center mt-3 w-96">
									<Link
										className="text-lg font-bold text-center text-black hover:underline w-max font-imFell"
										to="/catalogue"
									>
										Books Catalogue
									</Link>

									<h2 className="text-sm font-normal text-center text-black font-martel">
										Explore huge catalogue of new and used
										books you can rent or buy from locals
										near you!
									</h2>
								</div>
							</div>
							<div
								className="flex flex-col items-center h-auto w-[216px] mt-24 lg:mt-9"
								onMouseEnter={() => setHover(true)}
								onMouseLeave={() => setHover(false)}
							>
								{/* <img
									src={Second}
									alt="2"
									className="h-auto w-72"
								/> */}
								<Link
									className="w-full"
									to={isLoggedIn ? "/mybooks" : "/signup"}
								>
									<div className="bg-[#C4C4C4] w-full h-[253px] rounded-[12px] relative">
										<img
											className="absolute bottom-0 hover:scale-[102%] hover:transition-none transition ease-out"
											src={
												!isLoggedIn && inHover
													? BooksListingSignUp
													: BooksListing
											}
											alt="BooksLisImg"
										/>
									</div>
								</Link>

								{/* <Second className="h-auto w-72" /> */}
								<div className="flex flex-col items-center justify-center mt-3 w-96">
									<Link
										// onMouseEnter={() => setHover(true)}
										// onMouseLeave={() => setHover(false)}
										to={isLoggedIn ? "/mybooks" : "/signup"}
										className="text-lg font-bold text-black transition ease-in-out font-imFell hover:underline w-max"
									>
										Books Listing
										{/* {!isLoggedIn && inHover && (
											<div
												className={
													"relative inline-flex items-center px-2 ml-2 text-xs font-normal rounded-sm bg-semiLight md:text-sm text-black "
												}
											>
												<div className="absolute left-0 bottom-0 h-[53%] w-[10px] skew-x-[50deg] bg-semiLight rounded-sm"></div>
												<div className="absolute left-0 top-0 h-1/2 w-[10px] skew-x-[-50deg]  bg-semiLight rounded-sm"></div>
												<h1>
													<Link
														to="/signup"
														className="underline hover:text-dark"
													>
														Sign Up
													</Link>
													&nbsp;to continue.
												</h1>
											</div>
										)} */}
									</Link>
									<h2 className="text-sm font-normal text-center text-black font-martel">
										Are you a huge book worm? You can sell
										or rent your books on our book listing.
									</h2>
								</div>
							</div>
							<div className="flex flex-col items-center h-auto w-[216px] mt-24 lg:mt-9">
								{/* <img
									src={First}
									alt="1"
									className="h-auto w-72"
								/> */}
								<Link to="/about" className="w-full">
									<div className="bg-[#C4C4C4] w-full h-[253px] rounded-[12px] relative">
										<img
											className="absolute bottom-0 hover:scale-[102%] hover:transition-none transition ease-out"
											src={JoinCommunity}
											alt="BooksCatImg"
										/>
									</div>
								</Link>

								{/* <First className="h-auto w-72" /> */}
								<div className="flex flex-col items-center justify-center mt-3 mb-24 w-96">
									<Link
										className="text-lg font-bold text-center text-black hover:underline w-max font-imFell"
										to="/about"
									>
										Join Community
									</Link>

									<h2 className="text-sm font-normal text-center text-black font-martel">
										Join huge community of book geeks
										sharing books and experience with other.
									</h2>
								</div>
							</div>
						</div>
						<h6 className="text-sm italic text-center md:text-2xl font-imFell">
							“Books are a uniquely portable magic.”
						</h6>
					</div>
				</div>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};
export default Landing;
