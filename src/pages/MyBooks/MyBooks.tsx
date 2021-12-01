import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import MyBookCard from "components/MyBooks/MyBookCard";
import React from "react";
import { NavLink } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import api from "api";

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
			onSuccess: (data) => {
				console.log("succesddd");
				console.log(data);
			},
			onError: () => {
				console.log("ERRROER");
			},
		}
	);
	console.log(isLoading);
	return (
		<div>
			<NavigationBar />
			<section className=" bg-light">
				<div className="flex min-w-full min-h-screen">
					<div className="container flex flex-col max-w-max">
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

					<div className="left-0 w-full mb-10 mr-12 border-l-2 border-gray-400">
						<div className="flex justify-center w-full">
							<button className="px-3 text-lg font-semibold text-center rounded-lg shadow bg-semiLight hover:drop-shadow-xl">
								<NavLink to="/addBook">+ Add A Book</NavLink>
							</button>
						</div>
						<div className="m-10 mt-4 mb-4">
							{data!.data.data.books.map((book, idx) => (
								<MyBookCard
									key={idx}
									title={book.name}
									description={book.description}
									genre={book.genre}
									imgUrl={book.images[0].url}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};
export default MyBooks;
// src="https://via.placeholder.com/200x200"
