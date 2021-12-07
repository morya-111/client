import React, { useState, useEffect, useRef } from "react";

import { ReactComponent as LogoDark } from "assets/common/logo-main-dark.svg";
import { ReactComponent as MenuIcon } from "assets/common/menu-icon.svg";
import SignUp from "components/GoToButtons/SignUp";
import { NavLink } from "react-router-dom";

import useCachedLoginStatus from "hooks/useCachedLoginStatus";
import Dropdown from "./Dropdown";

import MyProfile from "./MyProfile";
import ProfilePopUp from "./ProfilePopUp";
const NavigationBar: React.FC = () => {
	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, []);
	const isLoggedIn = useCachedLoginStatus();
	const [isOpen, setIsOpen] = useState(false);
	const [isPopUpOpen, setIsPopUpOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
	};

	const openPopUp = () => {
		setIsPopUpOpen(true);
	};
	const closePopUp = () => {
		setIsPopUpOpen(false);
	};
	// const togglePopUp = () => {
	// 	setIsPopUpOpen(!isPopUpOpen);
	// };

	useEffect(() => {
		const hideMenu = () => {
			if (window.innerWidth < 768 && isOpen) {
				setIsOpen(false);
			}
		};
		const closePopUpAndHideMenu = () => {
			closePopUp();
			hideMenu();
		};

		window.addEventListener("resize", closePopUpAndHideMenu);
		window.addEventListener("scroll", closePopUp);
		return () => {
			window.removeEventListener("resize", closePopUpAndHideMenu);
			window.removeEventListener("scroll", closePopUp);
		};
	});

	return (
		<>
			<div
				className={
					isOpen
						? "relative flex items-center justify-between h-24 md:pl-14 lg:pr-14 md:pr-5 duration-[0ms] bg-semiLight"
						: "relative flex items-center justify-between h-24 md:pl-14 lg:pr-14 md:pr-5 bg-light"
				}
			>
				<NavLink to="/">
					<LogoDark className="w-auto h-24 p-2" />
				</NavLink>
				{!isLoggedIn && (
					<div
						className="absolute right-0 px-4 cursor-pointer md:hidden"
						onClick={toggle}
					>
						<MenuIcon />
					</div>
				)}

				<div className="pr-8">
					{isLoggedIn ? (
						<>
							<>
								<div className="flex flex-row">
									<NavLink
										to="/catalogue"
										className="hidden p-4 motion-safe:hover:scale-110 md:block"
										style={(isActive) => ({
											textDecoration: isActive
												? "underline"
												: "none",
										})}
									>
										Catalogue
									</NavLink>
									<NavLink
										to="/mybooks"
										className="hidden p-4 mr-2 md:block motion-safe:hover:scale-110 "
										style={(isActive) => ({
											textDecoration: isActive
												? "underline"
												: "none",
										})}
									>
										My Books
									</NavLink>

									<MyProfile onClick={openPopUp} />
								</div>
							</>
						</>
					) : (
						<>
							<div className="hidden md:block">
								<NavLink
									to="/about"
									className="p-4 motion-safe:hover:scale-110"
									style={(isActive) => ({
										textDecoration: isActive
											? "underline"
											: "none",
									})}
								>
									About
								</NavLink>
								<NavLink
									to="/catalogue"
									className="p-4 motion-safe:hover:scale-110 "
									style={(isActive) => ({
										textDecoration: isActive
											? "underline"
											: "none",
									})}
								>
									Catalogue
								</NavLink>
								<NavLink
									to="/contact"
									className="p-4 motion-safe:hover:scale-110"
									style={(isActive) => ({
										textDecoration: isActive
											? "underline"
											: "none",
									})}
								>
									Contact
								</NavLink>
								<NavLink
									to="/signin"
									className="p-4 motion-safe:hover:scale-110"
									style={(isActive) => ({
										textDecoration: isActive
											? "underline"
											: "none",
									})}
								>
									Sign In
								</NavLink>
								<SignUp />
							</div>
						</>
					)}
				</div>
			</div>
			{isPopUpOpen ? (
				<ProfilePopUp
					// NOTE: Popup position adjustments
					className="fixed z-50 mr-16 top-12 lg:right-12 md:right-3 sm:hidden md:flex lg:flex"
					closerFunc={closePopUp}
				/>
			) : null}

			{isOpen && <Dropdown />}
		</>
	);
};

export default NavigationBar;
