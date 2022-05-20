import React, { useState, useEffect, useRef } from "react";

// import { ReactComponent as LogoDark } from "assets/common/logo-main-dark.svg";
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

	const menuBtn = useRef<HTMLDivElement>(null);

	const toggle = () => {
		setIsOpen(!isOpen);
		menuBtn.current?.classList.toggle("open");
		// console.log(menuBtn);
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
	const buttonClassnames =
		"p-1 pl-2 m-2 ml-0 font-imFell text-xl drop-shadow-md";
	return (
		<>
			<div
				style={{
					boxShadow: "0px 4px 54px rgba(0, 0, 0, 0.25)",
					overflow: "hidden",
				}}
				className={
					isOpen
						? "relative flex items-center justify-between h-screen  md:pl-14 lg:pr-14 md:pr-5 bg-bgGrey100 z-50 border-b-8 border-black"
						: "relative flex items-center justify-between h-[70px]  md:pl-14 lg:pr-14 md:pr-5 bg-bgGrey100"
				}
			>
				{/* <NavLink to="/">
					<LogoDark className="w-auto h-24 p-2" />
				</NavLink> */}
				<div className="absolute top-0 w-screen">
					<div className="h-[70px] flex items-center w-[fit-content]">
						<NavLink
							to="/"
							className="font-imFell font-[400] text-[32px] leading-[38px] text-black ml-4 md:ml-0"
						>
							BookEx
						</NavLink>
					</div>

					{!isLoggedIn && (
						<div
							className="absolute top-0 right-0 px-2 cursor-pointer md:hidden h-[70px]"
							onClick={toggle}
						>
							<div className="menu-btn" ref={menuBtn}>
								<div className="menu-btn__burger"></div>
							</div>
						</div>
					)}

					<div className="absolute top-0 right-0 pr-3 h-[70px] flex ">
						{isLoggedIn ? (
							<>
								<>
									<div className="flex flex-row items-center justify-center mr-20">
										<NavLink
											to="/catalogue"
											className="hidden p-4 motion-safe:hover:scale-105 md:block font-[400] font-imFell"
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
											className="hidden p-4 mr-2 md:block motion-safe:hover:scale-105 font-[400] font-imFell"
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
									<div className="mr-24 ml-7">
										<SignUp />
									</div>
								</div>
							</>
						)}
					</div>
					{isPopUpOpen ? (
						<ProfilePopUp
							// NOTE: Popup position adjustments
							className="fixed z-50 mr-16 top-12 lg:right-12 md:right-3 sm:hidden md:flex lg:flex"
							closerFunc={closePopUp}
						/>
					) : null}
				</div>
				{isOpen && (
					<>
						<div className="flex flex-col justify-start h-[calc(100%-120px)] ml-4 mt-9">
							<NavLink
								to="/catalogue"
								className={buttonClassnames}
								onClick={() => {
									setIsOpen(!isOpen);
								}}
							>
								Catalogue 📖
							</NavLink>

							<NavLink
								to="/about"
								className={buttonClassnames}
								onClick={() => {
									setIsOpen(!isOpen);
								}}
							>
								About 🫂
							</NavLink>
							<NavLink
								to="/contact"
								className={buttonClassnames}
								onClick={() => {
									setIsOpen(!isOpen);
								}}
							>
								Contact 📞
							</NavLink>
							<NavLink
								to="/signUp"
								className={buttonClassnames}
								onClick={() => {
									setIsOpen(!isOpen);
								}}
							>
								Sign Up ✔️
							</NavLink>
						</div>
					</>
				)}
			</div>

			{/* {isOpen && <Dropdown />} */}
		</>
	);
};

export default NavigationBar;
