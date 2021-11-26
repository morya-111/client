import React, { useState, useEffect } from "react";
import NavigationBar from "components/NavigationBar";
import Dropdown from "components/NavigationBar/Dropdown";
import Footer from "components/Footer";
import { NavLink } from "react-router-dom";

const BookDisplay: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const hideMenu = () => {
			if (window.innerWidth < 768 && isOpen) {
				setIsOpen(false);
			}
		};
		window.addEventListener("resize", hideMenu);
		return () => {
			window.removeEventListener("resize", hideMenu);
		};
	});
	return (
		<div>
			<NavigationBar toggle={toggle} />
			<Dropdown isOpen={isOpen} />
			<section className="overflow-hidden text-gray-600 body-font">
				<div className="container min-w-full min-h-screen px-5 mx-auto bg-light">
					<div className="flex flex-wrap mx-auto lg:w-4/5">
						<div className="w-full mb-6 lg:w-1/2 lg:pr-10 lg:py-6 lg:mb-0">
							<h1 className="relative text-3xl font-bold text-dark">
								Book Title
								<h2 className="absolute right-0 inline-block px-2 text-sm rounded-full bottom-1/4 bg-semiLight text-light">
									Comic/Manga
								</h2>
							</h1>
							<h2 className="text-sm font-semibold text-dark">
								Uploaded by --Username--
							</h2>
							<div className="flex mt-4">
								<h1 className="flex-grow text-lg underline text-semiDark">
									Description:
								</h1>
							</div>
							<p className="mb-4 leading-relaxed">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in ...
							</p>
							<div className="mb-4">
								<div className="flex py-2 border-t border-gray-400">
									<span className="text-gray-500">
										Language
									</span>
									<span className="ml-auto text-dark">
										languageName
									</span>
								</div>
								<div className="flex py-2 border-t border-gray-400">
									<span className="text-gray-500">
										Author
									</span>
									<span className="ml-auto text-dark">
										authorName
									</span>
								</div>
								<div className="flex py-2 border-t border-gray-400">
									<span className="text-gray-500">
										Publisher
									</span>
									<span className="ml-auto text-dark">
										publisherName
									</span>
								</div>
								<div className="flex py-2 border-t border-gray-400">
									<span className="text-gray-500">
										For Sell
									</span>
									<span className="ml-auto text-dark">
										(Amount)/Not Available
									</span>
								</div>
								<div className="flex py-2 border-t border-gray-400">
									<span className="text-gray-500">
										For Rent
									</span>
									<span className="ml-auto text-dark">
										(Amount)/Not Available
									</span>
								</div>
								<div className="flex py-2 border-t border-b border-gray-400">
									<span className="text-gray-500">
										Deposit
									</span>
									<span className="ml-auto text-dark">
										depositAmount
									</span>
								</div>
							</div>
						</div>
						<img
							alt="ecommerce"
							className="object-cover object-center w-1/2 h-64 rounded lg:w-1/4 lg:h-1/4"
							src="https://via.placeholder.com/400x513"
						/>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default BookDisplay;
