import React from "react";
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import { NavLink } from "react-router-dom";

const Contact = () => {
	return (
		<>
			<div className="h-screen bg-light">
				<NavigationBar />
				<div className="relative mt-10 text-gray-600 h-max body-font">
					<div className="container px-5 mx-auto ">
						<div className="flex flex-col w-full mb-12 text-center">
							<h1 className="mb-1 text-2xl font-bold text-gray-900 sm:text-4xl title-font">
								Contact Us
							</h1>
							<p className="mx-auto text-base leading-relaxed lg:w-2/3">
								We accept all types of books and suggestions.
							</p>
						</div>
						<div className="mx-auto lg:w-1/2 md:w-2/3">
							<div className="flex flex-wrap -m-2">
								<div className="w-1/2 p-2">
									<div className="relative">
										<label className="text-sm leading-7 text-gray-600">
											Name
										</label>
										<input
											type="text"
											id="name"
											name="name"
											className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-semiDark focus:bg-white focus:ring-2 drop-shadow-lg"
										/>
									</div>
								</div>
								<div className="w-1/2 p-2">
									<div className="relative">
										<label className="text-sm leading-7 text-gray-600">
											Email
										</label>
										<input
											type="email"
											id="email"
											name="email"
											className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:border-semiDark focus:bg-white focus:ring-2 drop-shadow-lg"
										/>
									</div>
								</div>
								<div className="w-full p-2">
									<div className="relative">
										<label className="text-sm leading-7 text-gray-600">
											Message
										</label>
										<textarea
											id="message"
											name="message"
											className="w-full h-32 px-3 py-1 text-base leading-6 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none resize-none focus:border-semiDark focus:bg-white focus:ring-2 drop-shadow-lg"
										></textarea>
									</div>
								</div>
								<div className="w-full p-2">
									<div className="flex flex-row justify-center md:mr-6 md:justify-end">
										<NavLink to="/">
											<button className="flex px-8 py-2 mx-auto mb-10 text-lg text-white border-0 rounded bg-semiDark focus:outline-none hover:bg-semiLight drop-shadow-lg">
												Submit
											</button>
										</NavLink>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Contact;
