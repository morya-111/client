import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as LogoDark } from "assets/common/logo-main-dark.svg";
import { ReactComponent as MenuIcon } from "assets/common/menu-icon.svg";
import SignUp from "components/GoToButtons/SignUp";
import { NavLink } from "react-router-dom";
import useCachedLoginStatus from "hooks/useCachedLoginStatus";
import Dropdown from "./Dropdown";

import MyProfile from "./MyProfile";
import LogOutButton from "components/LogOutButton";
import { ListFormat } from "typescript";

const NavigationBar: React.FC = () => {
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
	const togglePopUp = () => {
		setIsPopUpOpen(!isPopUpOpen);
	};

	useEffect(() => {
		const hideMenu = () => {
			if (window.innerWidth < 768 && isOpen) {
				setIsOpen(false);
			}
		};

		window.addEventListener("resize", () => {
			closePopUp();
			hideMenu();
		});
		window.addEventListener("scroll", () => {
			closePopUp();
		});
		return () => {
			window.removeEventListener("resize", () => {
				closePopUp();
				hideMenu();
			});
			window.removeEventListener("scroll", () => {
				closePopUp();
			});
		};
	});

	return (
		<>
			<div className="relative flex items-center justify-between h-24 md:pl-14 lg:pr-14 md:pr-5 bg-light">
				<NavLink to="/">
					<LogoDark className="w-auto h-24 p-2" />
				</NavLink>
				<div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
					<MenuIcon />
				</div>
				<div className="hidden pr-8 md:block">
					{isLoggedIn ? (
						<>
							<>
								<NavLink
									to="/catalogue"
									className="p-4 motion-safe:hover:scale-110 "
								>
									Catalogue
								</NavLink>
								<NavLink
									to="/mybooks"
									className="p-4 mr-2 motion-safe:hover:scale-110 "
								>
									My Books
								</NavLink>

								<MyProfile onClick={openPopUp} />
								<LogOutButton />
							</>
						</>
					) : (
						<>
							<NavLink
								to="/about"
								className="p-4 motion-safe:hover:scale-110"
							>
								About
							</NavLink>
							<NavLink
								to="/catalogue"
								className="p-4 motion-safe:hover:scale-110 "
							>
								Catalogue
							</NavLink>
							<NavLink
								to="/contact"
								className="p-4 motion-safe:hover:scale-110"
							>
								Contact
							</NavLink>
							<SignUp />
						</>
					)}
				</div>
			</div>
			{isPopUpOpen ? (
				<ProfilePopUp
					className="fixed z-50 mr-16 top-8 lg:right-12 md:right-3 sm:hidden md:flex lg:flex"
					closerFunc={closePopUp}
				/>
			) : null}
			{isOpen ? <Dropdown /> : null}
		</>
	);
};

const ProfilePopUp: React.FC<
	React.ComponentPropsWithoutRef<"div"> & { closerFunc: Function }
> = ({ className, closerFunc }) => {
	const selfRef = useRef(null);
	useOutsideAlerter(selfRef, closerFunc);
	return (
		<div
			className={`${className} bg-semiLight h-auto w-48 rounded-md rounded-tr-none rounded-bl-none flex flex-col`}
			ref={selfRef}
		>
			<NavLink to="/catalogue" className="p-4 hover:text-greyText ">
				Catalogue
			</NavLink>
			<NavLink to="/mybooks" className="p-4 mr-2 ">
				My Books
			</NavLink>

			<LogOutButton />
		</div>
	);
};

function useOutsideAlerter(ref: any, effectFunction: Function) {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target)) {
				effectFunction();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});
}
export default NavigationBar;
