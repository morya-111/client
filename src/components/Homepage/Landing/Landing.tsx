import React, { useState, useEffect } from "react";
import NavigationBar from "components/NavigationBar/NavigationBar";
import Dropdown from "components/NavigationBar/Dropdown";
import { ReactComponent as HeroImg } from "assets/homepage/homepage-img.svg";
import { ReactComponent as First } from "assets/homepage/WCIDH-1.svg";
import { ReactComponent as Second } from "assets/homepage/WCIDH-2.svg";
import { ReactComponent as Third } from "assets/homepage/WCIDH-3.svg";
import Footer from "components/Footer";
import InfoText from "../InfoText";
import { NavLink } from "react-router-dom";

const Landing = () => {
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

			<div className="relative w-auto h-screen bg-light">
				<div className="absolute top-0 ml-5 md:mt-24 md:flex flex-nowrap">
					<div>
						<InfoText
							title="Trying To Find Your Favorite book?"
							subTitle="Browse large catalogue of books to rent or buy from people close to you!"
						/>
						<div className="grid grid-rows-2 gap-2 mt-5 place-content-start">
							<button className="px-4 py-1 rounded bg-semiLight text-light">
								<NavLink to="/goToCatalogue">
									Go To Catalogue
								</NavLink>
							</button>
							<button className="px-4 py-1 rounded text-light bg-semiLight">
								<NavLink to="/signUp">Sign Up</NavLink>
							</button>
						</div>
					</div>
					<div className="md:flex-shrink-0">
						<HeroImg className="w-auto h-48 md:h-72 xl:w-auto xl:h-full lg:h-96 lg:w-auto md:w-auto" />
					</div>
				</div>
			</div>
			<div className="relative w-auto h-screen bg-clip-padding bg-semiDark">
				<div className="flex justify-center">
					<div className="absolute w-screen top-1/4">
						<h1 className="text-5xl text-center text-light ">
							What Can I Do Here?
						</h1>
						<div className="justify-around md:flex md:flex-wrap mt-9">
							<div>
								<First className="h-auto w-72" />
								<div>
									<InfoText
										title="Books Catalogue"
										subTitle="Explore huge catalogue of new and used books you can rent or buy from locals near you!"
									/>
								</div>
							</div>
							<div>
								<Second className="h-auto w-72" />
								<div>
									<InfoText
										title="Books Catalogue"
										subTitle="Explore huge catalogue of new and used books you can rent or buy from locals near you!"
									/>
								</div>
							</div>
							<div>
								<Third className="h-auto w-72" />
								<div>
									<InfoText
										title="Books Catalogue"
										subTitle="Explore huge catalogue of new and used books you can rent or buy from locals near you!"
									/>
								</div>
							</div>
						</div>
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
