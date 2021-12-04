import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import MyBookCard from "components/MyBooks/MyBookCard";
import React from "react";
import { NavLink } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import api from "api";
import Loader from "components/Loader";

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
};
type BookResponseType = {
	data: {
		books: BookType[];
	};
};
const MyBooks = () => {
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
	return (
		<>
			<NavigationBar />
			<div className="min-w-full min-h-screen bg-light">
				{isLoading ? (
					<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
						<Loader />
					</div>
				) : (
					<>
						<div className="flex">
							<div className="container flex-col hidden lg:flex max-w-max">
								<div className="mx-10 mt-10">
									<div className="text-center">
										<div className="inline-flex items-center justify-center rounded-full w-60 h-60">
											<img
												src="https://via.placeholder.com/200x200"
												className="rounded-full"
											/>
										</div>
										<div className="text-center">
											<h1 className="text-2xl font-bold">
												Usernames' Books
											</h1>
										</div>
									</div>
								</div>
							</div>

							<div className="left-0 w-full min-h-screen mb-10 border-l-2 border-gray-400 lg:mr-12">
								<div className="flex justify-center w-full">
									<button className="px-3 text-lg font-semibold text-center rounded-lg shadow bg-semiLight hover:drop-shadow-xl">
										<NavLink to="/book/create">
											+ Add A Book
										</NavLink>
									</button>
								</div>
								<div className="m-10 mt-4 mb-4 space-y-10">
									{data?.data.data.books.map((book, idx) => (
										<MyBookCard
											key={idx}
											bookId={book.id}
											title={book.name}
											description={book.description}
											genre={book.genre}
											imgUrl={book.image.url}
										/>
									))}
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
