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
						? "relative flex items-center justify-between h-[79px] md:pl-14 lg:pr-14 md:pr-5 duration-[0ms] bg-bgGrey100"
						: "relative flex items-center justify-between h-[79px] md:pl-14 lg:pr-14 md:pr-5 bg-bgGrey100"
				}
			>
				{/* <NavLink to="/">
					<LogoDark className="w-auto h-24 p-2" />
				</NavLink> */}
				<NavLink
					to="/"
					className="font-imFell font-[400] text-[32px] leading-[41px] text-black"
				>
					BookEx
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
										className="hidden p-4 motion-safe:hover:scale-105 md:block font-imFell"
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
										className="hidden p-4 mr-2 md:block motion-safe:hover:scale-105 font-imFell"
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
							<div className="items-center hidden md:flex md:flex-row">
								<NavLink
									to="/about"
									className="block p-4 motion-safe:hover:scale-105 font-[400] font-imFell"
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
									className="block p-4 motion-safe:hover:scale-105  font-[400] font-imFell"
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
									className="block p-4 motion-safe:hover:scale-105 font-[400] font-imFell"
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
									className="block p-4 motion-safe:hover:scale-105 font-[400] font-imFell"
									style={(isActive) => ({
										textDecoration: isActive
											? "underline"
											: "none",
									})}
								>
									Sign In
								</NavLink>
								<div className="ml-7">
									<SignUp />
								</div>
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
