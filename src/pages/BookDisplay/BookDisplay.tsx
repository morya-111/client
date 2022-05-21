import React, { useState } from "react";
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import { useQuery } from "react-query";
import Loader from "components/Loader";
import api from "api";
import { useParams, useHistory } from "react-router-dom";
import { ReactComponent as InfoIcon } from "assets/common/info-icon.svg";
import useCachedLoginStatus from "hooks/useCachedLoginStatus";
import ChatTab from "components/ChatTab";
import useAuthData from "hooks/useAuthData";

type ParamType = {
	id: string;
};
type ImageResponseType = {
	id: number;
	url: string;
	label: string | null;
};
type BookResponseType = {
	data: {
		book: {
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
			images: ImageResponseType[];
			image: { url: string };

			sellListing: {
				id: string;
				price: number;
				createdAt: string;
			} | null;
			rentListing: {
				fees: number;
				deposit: number;
				duration: number;
				durationUnit: "string";
			};
			user: {
				id: number;
				first_name: string;
				last_name: string;
				email: string;
			};
		};
	};
};

const BookDisplay: React.FC = () => {
	const history = useHistory();
	const params = useParams<ParamType>();
	const { email } = useAuthData();
	const { data, isLoading, status } = useQuery(
		"fetchABook",
		() => api.get<BookResponseType>(`/books/${params.id}`),
		{
			retry: false,
			refetchOnWindowFocus: false,

			onSuccess: (data) => {
				console.log(data);
			},
		}
	);
	const switchJSX = (status: string) => {
		switch (status) {
			case "success":
				return (
					<h1 className="w-5/6 text-3xl font-bold text-dark font-imFell">
						{data?.data.data.book.name}
					</h1>
				);
			case "error":
				history.push("/notfound");
				break;

			default:
				break;
		}
	};
	const [inHover, setHover] = useState(false);
	const isLoggedIn = useCachedLoginStatus();

	const sell = data?.data.data.book.sellListing !== null;
	const borrow = data?.data.data.book.rentListing !== null;
	const price = data?.data.data.book.sellListing?.price;
	const fees = data?.data.data.book.rentListing?.fees;
	const duration = data?.data.data.book.rentListing?.duration;
	const durationUnit = data?.data.data.book.rentListing?.durationUnit;
	const deposit = data?.data.data.book.rentListing?.deposit;
	const description =
		data?.data.data.book.description === ""
			? "Description Not Available 🧐"
			: data?.data.data.book.description;
	const userName = data?.data.data.book.user.first_name;
	const bookUserEmail = data?.data.data.book.user.email;

	const bookDataForChat = {
		bookId: data?.data.data.book.id,
		bookUserId: data?.data.data.book.user.id,
	};

	console.log(">>>>>>>>>>>>>>>>>>>>>>", bookDataForChat.bookId);

	return (
		<>
			<div className="relative bg-dark">
				<div className="flex flex-col min-h-screen bg-white">
					<NavigationBar />
					{isLoading ? (
						<div className="container h-screen min-w-screen ">
							<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
								<Loader />
							</div>
						</div>
					) : (
						<>
							<section className="bigMonitor:h-[90vh] bg-white body-font h-screen">
								<div className="container h-[90%] pb-10 align-middle min-w-full bg-bgGrey45">
									<div className="flex flex-wrap px-0 py-3 md:ml-14 md:min-w-screen">
										<div className="w-full px-2 mb-6 md:w-4/6 md:pr-10 md:py-6 md:mb-0">
											<div className="relative ">
												{switchJSX(status)}
											</div>
											<div className="relative">
												<h2
													className="px-4 py-[0.2rem] flex items-center text-xs text-center bg-black rounded-xl text-white capitalize font-martel absolute right-0"
													style={{
														boxShadow:
															"0px 3px 0px rgba(0, 0, 0, 0.25)",
													}}
												>
													{data?.data.data.book.genre}
												</h2>
												<h2
													onMouseEnter={() =>
														setHover(true)
													}
													onMouseLeave={() =>
														setHover(false)
													}
													className="inline-flex items-center text-sm font-semibold text-dark font-martel"
												>
													Uploaded by {userName}{" "}
													<InfoIcon className="inline-flex ml-2 hover:animate-pulse" />
													{inHover && (
														<div className="relative inline-flex items-center px-2 ml-2 text-xs font-normal bg-black rounded-sm md:text-sm text-light ">
															<div className="absolute left-0 bottom-0 h-[53%] w-[10px] skew-x-[50deg] bg-black rounded-sm"></div>
															<div className="absolute left-0 top-0 h-1/2 w-[10px] skew-x-[-50deg]  bg-black rounded-sm"></div>

															<h1
																className={
																	isLoggedIn
																		? "select-all"
																		: ""
																}
															>
																{isLoggedIn ? (
																	data?.data
																		.data
																		.book
																		.user
																		.email
																) : (
																	<h1>
																		<a
																			href="/signup"
																			className="underline hover:text-dark"
																		>
																			Sign
																			Up
																		</a>
																		&nbsp;to
																		access
																		Contact
																		Information
																	</h1>
																)}
															</h1>
														</div>
													)}
												</h2>
											</div>
											<img
												alt="ecommerce"
												className="w-1/2 h-auto mx-auto my-10 shadow-md md:hidden md:w-1/3 md:h-auto"
												src={
													data?.data.data.book.image
														.url
												}
											/>
											<div className="flex mt-4">
												<h1 className="flex-grow text-lg text-black underline font-martel">
													Description:
												</h1>
											</div>

											<p className="mb-4 leading-relaxed font-martel">
												{description}
											</p>

											<div className="mb-4 font-martel">
												<div className="flex px-2 py-2 border-t border-gray-400 md:px-1">
													<span className="text-gray-500">
														Language
													</span>
													<span className="ml-auto capitalize text-dark">
														{
															data?.data.data.book
																.language.name
														}
													</span>
												</div>
												<div className="flex px-2 py-2 border-t border-gray-400 md:px-1">
													<span className="text-gray-500">
														Author
													</span>
													<span className="ml-auto capitalize text-dark">
														{
															data?.data.data.book
																.author
														}
													</span>
												</div>
												<div className="flex px-2 py-2 border-t border-b border-gray-400 md:px-1">
													<span className="text-gray-500">
														Publisher
													</span>
													<span className="ml-auto capitalize text-dark">
														{
															data?.data.data.book
																.publisher
														}
													</span>
												</div>
												<div
													className={
														sell
															? "block"
															: "hidden"
													}
												>
													<div className="flex px-2 py-2 border-b border-gray-400 md:px-1">
														<span className="text-gray-500">
															For Sell{" "}
														</span>
														<span className="ml-auto text-dark">
															&#8377;{price}
														</span>
													</div>
												</div>
												<div
													className={
														borrow
															? "visible"
															: "invisible"
													}
												>
													<div className="flex px-2 py-2 border-b border-gray-400 md:px-1">
														<span className="text-gray-500">
															For Rent{" "}
														</span>
														<span className="ml-auto text-dark">
															&#8377;{fees} /{" "}
															{durationUnit?.slice(
																0,
																durationUnit.length -
																	1
															)}
														</span>
													</div>
													<div className="flex px-2 py-2 border-b border-gray-400 md:px-1">
														<span className="text-gray-500">
															Available For{" "}
														</span>
														<span className="ml-auto text-dark">
															{duration}{" "}
															{durationUnit}
														</span>
													</div>
													<div className="flex px-2 py-2 border-b border-gray-400 md:px-1">
														<span className="text-gray-500">
															Deposit{" "}
														</span>
														<span className="ml-auto text-dark">
															&#8377;{deposit}
														</span>
													</div>
												</div>
											</div>
										</div>
										<img
											alt="ecommerce"
											className="hidden object-cover object-center mx-auto mt-4 rounded md:inline-flex md:w-1/5 md:h-1/4"
											src={data?.data.data.book.image.url}
										/>
										<div className="absolute bottom-[67px] right-3 ">
											{isLoggedIn &&
											email !== bookUserEmail ? (
												<ChatTab 
													bookData={bookDataForChat}
													user={
														data?.data.data.book
															.user!
													}
												/>
											) : null}{" "}
										</div>
									</div>
								</div>
								<div className="">
									<Footer />
								</div>
							</section>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default BookDisplay;
