import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import MyBookCard from "components/MyBooks/MyBookCard";
import React from "react";

const MyBooks = () => {
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
						<div className="m-10">
							<MyBookCard />
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
