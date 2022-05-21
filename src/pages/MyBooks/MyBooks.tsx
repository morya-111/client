import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import MyBookCard from "components/MyBooks/MyBookCard";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import api from "api";
import Loader from "components/Loader";
import singleQuote from "utils/quotes";
import useAuthData from "hooks/useAuthData";
import ProfileSideBar from "components/UserProfile/ProfileSideBar";
import EmptyShelf from "assets/2.0/emptyshelf.png";

type ParamType = {
	id: string;
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

type BookResponseType = {
	data: {
		books: BookType[];
	};
};
// console.log(singleQuote.text);
const MyBooks = () => {
	const { first_name, avatarUrl } = useAuthData();
	const history = useHistory();
	const params = useParams<ParamType>();
	const { data, isLoading, isSuccess, status } = useQuery(
		"fetchMyBooks",
		() => api.get<BookResponseType>(`/books/mybooks`),

		{
			retry: false,
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
				console.log(data);
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);
	console.log(isLoading);
	const userName = "ok";
	console.log(userName);
	useEffect(() => {
		console.log(data?.data.data.books);
	});
	return (
		<>
			<NavigationBar />
			<div className="min-w-full min-h-screen bg-bgGrey45 noneed">
				{isLoading ? (
					<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 noneed">
						<Loader />
					</div>
				) : (
					<>
						<div className="flex flex-row pt-5 noneed">
							<div className="hidden md:flex ">
								<ProfileSideBar
									showEmail={false}
									page="Books"
								/>
							</div>
							<div className="relative flex flex-col w-full lg:mr-10 lg:w-4/5 ">
								<div className="left-0 min-h-screen mb-10 border-l-2 border-gray-400 lg:w-full lg:mr-12">
									<div className="flex justify-center w-full">
										<button
											style={{
												boxShadow:
													"0px 3px 0px rgba(0, 0, 0, 0.25)",
											}}
											className="px-5 py-2 text-lg font-semibold text-center text-white duration-700 ease-out bg-black rounded-lg shadow hover:drop-shadow-xl hover:scale-110 hover:bg-opacity-80 font-imFell"
										>
											<NavLink to="/book/create">
												+ Add A Book
											</NavLink>
										</button>
									</div>
									{data?.data.data.books === undefined && (
										<div className="flex flex-col items-center justify-center w-full h-[calc(100vh-200px)]">
											<img
												alt="emptyshelf"
												src={EmptyShelf}
												className="opacity-90 animate-scale-reveal"
											/>
											<h2 className="mt-4 text-xl text-center font-martel text-greyText">
												Your empty shelf is not looking
												good. <br />
												Add books now and fill it!!!
											</h2>
										</div>
									)}

									<div className="m-10 mt-4 mb-4 space-y-10 ">
										{data?.data.data.books.map(
											(book, idx) => (
												<div className="cursor-pointer">
													<MyBookCard
														onClick={() => {
															history.push(
																`/books/${book.id}`
															);
														}}
														key={idx}
														title={book.name}
														bookId={book.id}
														description={
															book.description
														}
														genre={book.genre}
														imgUrl={book.image.url}
														sell={
															book.sellListing !==
															null
														}
														price={
															book.sellListing
																?.price
														}
														borrow={
															book.rentListing !==
															null
														}
														fees={
															book.rentListing
																?.fees
														}
														duration={
															book.rentListing
																?.duration
														}
														durationUnit={
															book.rentListing
																?.durationUnit
														}
														deposit={
															book.rentListing
																?.deposit
														}

														// userName={book.user.first_name}
													/>
												</div>
											)
										)}
									</div>
									<div>
										<div className="flex flex-col items-center pt-2 mx-5 mt-5 mb-4 font-bold text-center border-t md:hidden border-opacity-40 border-dark">
											{/* <div>"{newSingleQuote?.text}"</div>
											<div className="text-sm font-semibold text-opacity-70 text-dark">
												-{newSingleQuote?.author}
											</div> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			<Footer />
		</>
	);
};
export default MyBooks;
// src="https://via.placeholder.com/200x200"

{
	/* <div className="container flex-col hidden w-[500px] lg:flex ">
								<div className="mx-10 mt-10">
									<div className="text-center">
										<div className="inline-flex items-center justify-center rounded-full w-60 h-60">
											<img
												src={avatarUrl}
												className="rounded-full"
											/>
										</div>
										<div className="text-center">
											<h1 className="text-2xl font-bold">
												{first_name}'s Books
											</h1>
										</div>
									</div>
								</div>
								<div className="flex flex-col items-center px-5 mt-5 font-bold text-center ">
									<div>"{singleQuote.text}"</div>
									<div className="text-sm font-semibold text-opacity-70 text-dark">
										-{singleQuote.author}
									</div>
								</div>
							</div> */
}
