import React, { useState, useEffect } from "react";
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";
import { ReactComponent as LogoLight } from "assets/common/logo-main-light.svg";
import { NavLink } from "react-router-dom";
import ShelfBG from "assets/about/shelf_bg.png";
import Shelf1 from "assets/about/shelf_1.png";
import Shelf2 from "assets/about/shelf_2.png";
import Shelf3 from "assets/about/shelf_3.png";
import Shelf4 from "assets/about/shelf_4.png";
import Shelf5 from "assets/about/shelf_5.png";
import jarrod from "assets/about/jarrod.png";
import dinesh from "assets/about/dinesh.png";
import gilfoyle from "assets/about/gilfoyle.png";
import athhb from "assets/about/athhb.png";
import SbG from "assets/about/SbG.png";
import PdS from "assets/about/PdS.png";
import instaIcon from "assets/common/insta-icon.png";
import twitterIcon from "assets/common/twitter-icon.png";
import githubIcon from "assets/common/github-icon.png";
import linkedinIcon from "assets/common/linkedin-icon.png";
import useCachedLoginStatus from "hooks/useCachedLoginStatus";

const About = () => {
	const isLoggedIn = useCachedLoginStatus();
	const [inHover, setHover] = useState(false);
	return (
		<div className="">
			<div
				onMouseEnter={() => setHover(false)}
				onMouseLeave={() => setHover(true)}
				className="min-h-screen overflow-x-hidden bg-light"
			>
				<div className="relative w-full h-[600px] 2xl:h-screen ">
					<div className="absolute bg-dark w-[140px] h-[500px] ml-3 md:ml-14 z-50">
						<NavLink to="/">
							<LogoLight className="w-auto h-24 p-2" />
						</NavLink>
						<div className="absolute bottom-0 bg-light w-[140px] h-[40px]">
							<div className="absolute bottom-0 left-0 w-[71px] h-[140px] bg-dark -skew-y-12 rounded-bl-sm "></div>
							<div className="absolute bottom-0 right-0 w-[71px] h-[140px] bg-dark skew-y-12 rounded-br-sm"></div>
						</div>
					</div>

					<div>
						<NavigationBar />
					</div>

					<div className="absolute w-full ml-48 sm:ml-52 ">
						<div className="flex flex-col mx-auto">
							<section>
								<div className="container absolute left-auto w-1/2 sm:left-8 md:left-24 lg:left-32 top-6">
									<div className="justify-center text-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											className="inline-block w-8 h-8 mb-8 text-semiDark opacity-60"
											viewBox="0 0 975.036 975.036"
										>
											<path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
										</svg>
										<p className="text-lg font-bold leading-relaxed lg:text-2xl md:text-xl">
											With reading, you have this
											opportunity to learn whatever you
											want from the greatest people who
											ever lived along the dimension.
										</p>
										<span className="inline-block w-10 h-1 mt-8 mb-6 rounded bg-semiDark"></span>
										<h2 className="text-xs font-medium tracking-wider md:text-sm text-dark title-font">
											JORDAN B. PETERSON
										</h2>
										<p className="text-xs italic text-dark opacity-40 md:text-base">
											Psychologist
										</p>
										<p className="hidden mt-10 overflow-hidden text-base font-semibold text-left sm:block md:text-xl text-dark">
											<b className="text-semiDark">
												BookEx
											</b>{" "}
											is a community made to connect
											readers and encourage them to
											<br />{" "}
											<b className="opacity-75 text-semiDark">
												Read Everyday
											</b>{" "}
											without any limitations of finding
											books.
											<br />
											{!isLoggedIn && (
												<b className="">
													Join this Awesome Community
													by{" "}
													<a
														href="/signup"
														className="underline hover:text-semiDark"
													>
														Signing Up
													</a>{" "}
													now
												</b>
											)}
										</p>
									</div>
								</div>
							</section>
						</div>
					</div>

					<div className="flex justify-center">
						<div className="text-[13px] sm:hidden m-1 mt-96 pt-10 text-left">
							<b className="text-semiDark">BookEx</b> is a
							community made to connect readers and encourage them
							to
							<br />{" "}
							<b className="opacity-75 text-semiDark">
								Read Everyday
							</b>{" "}
							without any limitations of finding books.
						</div>
					</div>
				</div>
			</div>
			<div className="h-4 bg-dark"></div>
			<div className="">
				<div className="container relative overflow-hidden">
					<div className="h-[800px] bg-shelf-bg">
						<div className="absolute flex flex-row justify-center w-full h-[800px] text-white z-50">
							<div
								className={
									inHover
										? "opacity-100 transform duration-1000"
										: "opacity-0 transform duration-1000"
								}
							>
								<div className="flex flex-col mt-32">
									<div className="text-center ">
										<h1 className="mb-4 text-2xl font-bold text-semiLight">
											Execution & Concept By:
										</h1>
									</div>
									<div className="flex flex-col items-center mt-5 space-y-10 md:items-start md:space-y-0 md:justify-around md:flex-row ">
										<div className="flex flex-col items-center w-72 divide-solid">
											<img
												src={PdS}
												className="inline-block object-cover object-center w-40 h-40 mb-2 bg-gray-100 border-2 border-gray-200 rounded-full"
											></img>
											<h1 className="text-lg font-semibold text-semiLight">
												Prathamesh Sujgure
											</h1>
											<p className="text-center text-gray-300 opacity-75">
												"If you are going to get
												anywhere in life you have to
												read a lot of books."
											</p>
											<img
												src={jarrod}
												className="h-64 mt-7 drop-shadow-3xl"
											></img>
											<div className="z-50 flex flex-row items-center mt-3 space-x-3 ">
												<a
													href="https://github.com/PrathameshSujgure-git"
													target="_blank"
													rel="noopner noreferrer"
												>
													<img src={githubIcon}></img>
												</a>
												<a
													href="https://www.linkedin.com/in/prathamesh-sujgure-02827220a/"
													target="_blank"
													rel="noopner noreferrer"
												>
													<img
														src={linkedinIcon}
													></img>
												</a>
												<a
													href="https://twitter.com/invinci_111"
													target="_blank"
													rel="noopner noreferrer"
												>
													<img
														src={twitterIcon}
													></img>
												</a>
												<a
													href="https://www.instagram.com/invincible.111/"
													target="_blank"
													rel="noopner noreferrer"
												>
													<img src={instaIcon}></img>
												</a>
											</div>
										</div>
										<div className="flex flex-col items-center w-72 ">
											<img
												className="inline-block object-cover object-center w-40 h-40 mb-2 bg-gray-100 border-2 border-gray-200 rounded-full"
												src={athhb}
											></img>
											<h1 className="text-lg font-semibold text-semiLight">
												Atharva Bhange
											</h1>
											<p className="text-center text-gray-300 opacity-75">
												"All the secrets of the world
												are contained in books."
											</p>
											<img
												src={dinesh}
												className="h-64 mt-7 drop-shadow-3xl"
											></img>
											<div className="z-50 flex flex-row items-center mt-3 space-x-3 ">
												<a
													href="https://github.com/atharva-bhange"
													target="_blank"
													rel="noopner noreferrer"
												>
													<img src={githubIcon}></img>
												</a>
												<a
													href="https://www.linkedin.com/in/atharva-bhange/"
													target="_blank"
													rel="noopner noreferrer"
												>
													<img
														src={linkedinIcon}
													></img>
												</a>
												<a
													href="https://twitter.com/atharvabhange"
													target="_blank"
													rel="noopner noreferrer"
												>
													<img
														src={twitterIcon}
													></img>
												</a>
												<a
													href="https://www.instagram.com/atharva__bhange/"
													target="_blank"
													rel="noopner noreferrer"
												>
													<img src={instaIcon}></img>
												</a>
											</div>
										</div>
										<div className="flex flex-col items-center w-72">
											<img
												className="inline-block object-cover object-center w-40 h-40 mb-2 bg-gray-100 border-2 border-gray-200 rounded-full"
												src={SbG}
											></img>
											<h1 className="text-lg font-semibold text-semiLight">
												Shreyas Gangurde
											</h1>
											<p className="text-center text-gray-300 opacity-75">
												"An hour spent reading is one
												stolen from paradise."
											</p>
											<img
												src={gilfoyle}
												className="h-64 mt-7 drop-shadow-3xl"
											></img>
											<div className="z-50 flex flex-row items-center mt-3 space-x-3 ">
												<a
													href="https://github.com/shreyasg-git"
													target="_blank"
													rel="noopner noreferrer"
												>
													<img src={githubIcon}></img>
												</a>
												<a
													href="https://www.linkedin.com/in/shreyas-gangurde-1438981a1/"
													target="_blank"
													rel="noopner noreferrer"
												>
													<img
														src={linkedinIcon}
													></img>
												</a>
												<a
													href="https://twitter.com/shreyasbg28"
													target="_blank"
													rel="noopner noreferrer"
												>
													<img
														src={twitterIcon}
													></img>
												</a>
												<a
													href="https://www.instagram.com/_shreyas_gangurde/"
													target="_blank"
													rel="noopner noreferrer"
												>
													<img src={instaIcon}></img>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="z-0">
							<img
								id="1"
								src={Shelf1}
								alt="1"
								className={
									inHover
										? "absolute duration-500 ease-linear transform -translate-x-16 -left-16 z-20 blur-[6px]"
										: "absolute duration-500 ease-linear transform translate-x-16 -left-16 z-20"
								}
							></img>
							<img
								id="2"
								src={Shelf2}
								alt="2"
								className={
									inHover
										? "absolute duration-1000 ease-linear transform -translate-x-36 -left-36 z-10 blur-[4px]"
										: "absolute duration-1000 ease-linear transform translate-x-36 -left-36 z-10"
								}
							></img>
							<img
								id="3"
								src={Shelf3}
								alt="3"
								className={
									inHover
										? "absolute z-30 transform blur-[3px] ease-in-out opacity-0 duration-1000 "
										: "absolute transform duration-[1.5s] z-30 opacity-100"
								}
							></img>
							<img
								id="4"
								src={Shelf4}
								alt="4"
								className={
									inHover
										? "absolute duration-1000 ease-linear transform translate-x-44 -right-44 z-10 blur-[4px]"
										: "absolute duration-1000 ease-linear transform -translate-x-44 -right-44 z-10 "
								}
							></img>
							<img
								id="5"
								src={Shelf5}
								alt="5"
								className={
									inHover
										? "absolute duration-500 ease-linear transform translate-x-16 -right-16 z-20 blur-[6px]"
										: "absolute duration-500 ease-linear transform -translate-x-16 -right-16 z-20"
								}
							></img>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;

// "absolute duration-100 ease-linear hover:transform cursor-help hover:translate-x-9 -left-7"

{
	/* <div className="text-center ">
						<h1 className="mb-4 text-2xl font-bold text-dark">
							Execution & Concept By:
						</h1>
					</div>
					<div className="flex flex-col items-center mt-5 space-y-10 md:items-start md:space-y-0 md:justify-around md:flex-row ">
						<div className="flex flex-col items-center w-72 divide-solid">
							<img className="inline-block object-cover object-center w-40 h-40 mb-2 bg-gray-100 border-2 border-gray-200 rounded-full"></img>
							<h1 className="text-lg font-semibold text-dark">
								Atharva Bhange
							</h1>
							<p className="text-center opacity-75 text-semiDark">
								"If you are going to get anywhere in life you
								have to read a lot of books."
							</p>
						</div>
						<div className="flex flex-col items-center w-72 ">
							<img className="inline-block object-cover object-center w-40 h-40 mb-2 bg-gray-100 border-2 border-gray-200 rounded-full"></img>
							<h1 className="text-lg font-semibold text-dark">
								Shreyas Gangurde
							</h1>
							<p className="text-center opacity-75 text-semiDark">
								"All the secrets of the world are contained in
								books."
							</p>
						</div>
						<div className="flex flex-col items-center w-72">
							<img className="inline-block object-cover object-center w-40 h-40 mb-2 bg-gray-100 border-2 border-gray-200 rounded-full"></img>
							<h1 className="text-lg font-semibold text-dark">
								Prathamesh Sujgure
							</h1>
							<p className="text-center opacity-75 text-semiDark">
								"An hour spent reading is one stolen from
								paradise."
							</p>
						</div>
						<div className="flex flex-col items-center w-72 ">
							<img className="inline-block object-cover object-center w-40 h-40 mb-2 bg-gray-100 border-2 border-gray-200 rounded-full"></img>
							<h1 className="text-lg font-semibold text-dark">
								Gaurav Tajanpure
							</h1>
							<p className="text-center opacity-75 text-semiDark">
								"Reading is a discount ticket to everywhere."
							</p>
						</div>
					</div> */
}
{
	/* <div className="flex flex-col items-center w-72 ">
										<img className="inline-block object-cover object-center w-40 h-40 mb-2 bg-gray-100 border-2 border-gray-200 rounded-full"></img>
										<h1 className="text-lg font-semibold text-dark">
											Gaurav Tajanpure
										</h1>
										<p className="text-center opacity-75 text-semiDark">
											"Reading is a discount ticket to
											everywhere."
										</p>
									</div> */
}
