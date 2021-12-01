import React from "react";
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import { useQuery } from "react-query";
import Loader from "components/Loader";
import api from "api";
import { useParams, useHistory } from "react-router-dom";

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
		};
	};
};
const BookDisplay: React.FC = () => {
	const history = useHistory();
	const params = useParams<ParamType>();
	const { data, isLoading, isSuccess, status } = useQuery(
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
					<h1 className="w-5/6 text-3xl font-bold text-dark">
						{data?.data.data.book.name}
					</h1>
				);
			case "error":
				// TODO: make a Route named /notfound for SbG
				history.push("/notfound");
				break;

			default:
				break;
		}
	};

	return (
		<div>
			<NavigationBar />
			{isLoading ? (
				<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
					<Loader />
				</div>
			) : (
				<>
					<section className="bg-light body-font">
						<div className="container h-auto mx-auto min-w-screen bg-light">
							<div className="flex flex-wrap px-0 py-3 md:ml-14 md:min-w-screen">
								<div className="w-full px-2 mb-6 md:w-4/6 md:pr-10 md:py-6 md:mb-0">
									<div className="relative ">
										{switchJSX(status)}
									</div>
									<div className="relative">
										<h2 className="inline-block text-sm font-semibold text-dark">
											Uploaded by --Username--{" "}
											{/*TODO:dynamic username*/}
										</h2>
										<h2 className="absolute right-0 inline-block px-2 text-sm capitalize rounded-full bg-semiLight text-light">
											{data?.data.data.book.genre}
										</h2>
									</div>
									<img
										alt="ecommerce"
										className="w-1/2 h-auto mx-auto my-10 shadow-md md:hidden md:w-1/3 md:h-auto"
										src={data?.data.data.book.image.url}
									/>
									<div className="flex mt-4">
										<h1 className="flex-grow text-lg underline text-semiDark">
											Description:
										</h1>
									</div>
									<p className="mb-4 leading-relaxed">
										{data?.data.data.book.description}
									</p>
									<div className="mb-4 ">
										<div className="flex py-2 border-t border-gray-400">
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
										<div className="flex py-2 border-t border-gray-400">
											<span className="text-gray-500">
												Author
											</span>
											<span className="ml-auto capitalize text-dark">
												{data?.data.data.book.author}
											</span>
										</div>
										<div className="flex py-2 border-t border-gray-400">
											<span className="text-gray-500">
												Publisher
											</span>
											<span className="ml-auto capitalize text-dark">
												{data?.data.data.book.publisher}
											</span>
										</div>
										<div className="flex py-2 border-t border-gray-400">
											<span className="text-gray-500">
												For Sell{" "}
												{/*TODO:dynamic sellInfo*/}
											</span>
											<span className="ml-auto text-dark">
												(Amount)/Not Available
											</span>
										</div>
										<div className="flex py-2 border-t border-gray-400">
											<span className="text-gray-500">
												For Rent{" "}
												{/*TODO:dynamic rentInfo*/}
											</span>
											<span className="ml-auto text-dark">
												(Amount)/Not Available
											</span>
										</div>
										<div className="flex py-2 border-t border-b border-gray-400">
											<span className="text-gray-500">
												Deposit{" "}
												{/*TODO:dynamic depositInfo*/}
											</span>
											<span className="ml-auto text-dark">
												depositAmount
											</span>
										</div>
									</div>
								</div>
								<img
									alt="ecommerce"
									className="hidden object-cover object-center mx-auto mt-4 rounded md:inline-flex md:w-1/5 md:h-1/4"
									src={data?.data.data.book.images[0].url}
								/>
							</div>
						</div>
						<Footer />
					</section>
				</>
			)}
		</div>
	);
};

export default BookDisplay;
