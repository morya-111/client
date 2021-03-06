import React, { useState } from "react";
import NavigationBar from "components/NavigationBar/NavigationBar";
import { ReactComponent as HeroImg } from "assets/homepage/homepage-img.svg";
import Third from "assets/homepage/WCIDH-1.png";
import First from "assets/homepage/WCIDH-2.png";
import Second from "assets/homepage/WCIDH-3.png";
import Footer from "components/Footer";
import { NavLink, Link } from "react-router-dom";
import useCachedLoginStatus from "hooks/useCachedLoginStatus";

const Landing = () => {
	const isLoggedIn = useCachedLoginStatus();
	const [inHover, setHover] = useState(false);

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
							<button className="px-4 py-1 rounded bg-semiLight text-light hover:drop-shadow-md">
								<NavLink to="/catalogue">
									Go To Catalogue
								</NavLink>
							</button>
							{isLoggedIn ? (
								<button className="px-4 py-1 rounded text-light bg-semiLight hover:drop-shadow-md">
									<NavLink to="/book/create">
										Add A Book
									</NavLink>
								</button>
							) : (
								<button className="px-4 py-1 rounded text-light bg-semiLight hover:drop-shadow-md">
									<NavLink to="/signup">Sign Up</NavLink>
								</button>
							)}
						</div>
					</div>
					<div>
						<HeroImg className="flex flex-none flex-shrink-0 " />
					</div>
					{/* <img
						src={Hero}
						className="flex flex-none flex-shrink-0 "
					></img> */}
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
								<img
									src={First}
									alt="1"
									className="h-auto w-72"
								/>
								{/* <First className="h-auto w-72" /> */}
								<div className="mt-3">
									<Link
										className="text-lg font-bold text-light hover:underline w-max"
										to="/catalogue"
									>
										Books Catalogue
									</Link>

									<h2 className="text-base text-light">
										Explore huge catalogue of new and used
										books you can rent or buy from locals
										near you!
									</h2>
								</div>
							</div>
							<div className="h-auto mt-8 md:mt-0 w-72">
								<img
									src={Second}
									alt="2"
									className="h-auto w-72"
								/>
								{/* <Second className="h-auto w-72" /> */}
								<div className="mt-3">
									<Link
										onMouseEnter={() => setHover(true)}
										onMouseLeave={() => setHover(false)}
										to={isLoggedIn ? "/mybooks" : ""}
										className="text-lg font-bold text-light hover:underline w-max"
									>
										Books Listing
										{!isLoggedIn && inHover && (
											<div
												className={
													"relative inline-flex items-center px-2 ml-2 text-xs font-normal rounded-sm bg-semiLight md:text-sm text-light "
												}
											>
												<div className="absolute left-0 bottom-0 h-[53%] w-[10px] skew-x-[50deg] bg-semiLight rounded-sm"></div>
												<div className="absolute left-0 top-0 h-1/2 w-[10px] skew-x-[-50deg]  bg-semiLight rounded-sm"></div>
												<h1>
													<Link
														to="/signup"
														className="underline hover:text-dark"
													>
														Sign Up
													</Link>
													&nbsp;to continue.
												</h1>
											</div>
										)}
									</Link>
									<h2 className="text-base text-light">
										Are you a huge book worm? You can sell
										or rent your books on our book listing.
									</h2>
								</div>
							</div>
							<div className="h-auto mt-8 mb-8 md:mt-0 w-72">
								<img
									src={Third}
									alt="3"
									className="h-auto w-72"
								/>
								{/* <Third className="h-auto w-72" /> */}
								<div className="mt-3">
									<Link
										to="/about"
										className="text-lg font-bold text-light w-max hover:underline"
									>
										Join Community
									</Link>
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
