import React from "react";
import NavigationBar from "components/NavigationBar/NavigationBar";
import { ReactComponent as HeroImg } from "assets/homepage/homepage-img.svg";
import { ReactComponent as First } from "assets/homepage/WCIDH-1.svg";
import { ReactComponent as Second } from "assets/homepage/WCIDH-2.svg";
import { ReactComponent as Third } from "assets/homepage/WCIDH-3.svg";
import Footer from "components/Footer";
import { NavLink } from "react-router-dom";
import useCachedLoginStatus from "hooks/useCachedLoginStatus";

const Landing = () => {
	const isLoggedIn = useCachedLoginStatus();
	return (
		<div>
			<NavigationBar />

			<div className="flex min-w-full min-h-screen -ml-4 overflow-hidden md:ml-0 bg-light bigMonitor:items-center">
				<div className="flex content-center pt-10 mb-5 ml-7 md:ml-16 md:flex flex-nowrap">
					<div className="w-[23ch] md:w-[30ch] lg:w-full">
						<h1 className="text-3xl font-semibold md:text-4xl lg:text-6xl text-dark">
							Trying To Find Your Favorite book?
						</h1>
						<h2 className="mt-2 text-base md:text-xl lg:text-3xl text-dark">
							Browse large catalogue of books to rent or buy from
							people close to you!
						</h2>

						<div className="grid grid-rows-2 gap-2 mt-5 place-content-start">
							<button className="px-4 py-1 rounded bg-semiLight text-light">
								<NavLink to="/catalogue">
									Go To Catalogue
								</NavLink>
							</button>
							{isLoggedIn ? (
								<button className="px-4 py-1 rounded text-light bg-semiLight">
									<NavLink to="/book/create">
										Add A Book
									</NavLink>
								</button>
							) : (
								<button className="px-4 py-1 rounded text-light bg-semiLight">
									<NavLink to="/signup">Sign Up</NavLink>
								</button>
							)}
						</div>
					</div>
					<div>
						<HeroImg className="flex flex-none flex-shrink-0 " />
					</div>
				</div>
			</div>
			<div className="w-auto min-h-screen bg-clip-padding bg-semiDark">
				<div className="flex justify-center">
					<div className="w-screen mt-10 md:mt-36">
						<h1 className="text-5xl font-bold text-center text-light">
							What Can I Do Here?
						</h1>

						<div className="grid justify-center mt-16 md:justify-around md:flex md:flex-wrap">
							<div className="h-auto w-72">
								<First className="h-auto w-72" />
								<div className="mt-3">
									<h1 className="text-lg font-bold text-light">
										Books Catalogue
									</h1>
									<h2 className="text-base text-light">
										Explore huge catalogue of new and used
										books you can rent or buy from locals
										near you!
									</h2>
								</div>
							</div>
							<div className="h-auto mt-8 md:mt-0 w-72">
								<Second className="h-auto w-72" />
								<div className="mt-3">
									<h1 className="text-lg font-bold text-light">
										Books Listing
									</h1>
									<h2 className="text-base text-light">
										Are you a huge book worm? You can sell
										or rent your books on our book listing.
									</h2>
								</div>
							</div>
							<div className="h-auto mt-8 mb-8 md:mt-0 w-72">
								<Third className="h-auto w-72" />
								<div className="mt-3">
									<h1 className="text-lg font-bold text-light">
										Join Community
									</h1>
									<h2 className="text-base text-light">
										Join huge community of book geeks
										sharing books and experience with other.
									</h2>
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
