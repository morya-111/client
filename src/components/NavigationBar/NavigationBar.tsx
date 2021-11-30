import React, { useState, useEffect } from "react";
import { ReactComponent as LogoDark } from "assets/common/logo-main-dark.svg";
import { ReactComponent as MenuIcon } from "assets/common/menu-icon.svg";
import SignUp from "components/GoToButtons/SignUp";
import { NavLink } from "react-router-dom";
import useCachedLoginStatus from "hooks/useCachedLoginStatus";
import Dropdown from "./Dropdown";

import MyProfile from "./MyProfile";
import LogOutButton from "components/LogOutButton";

const NavigationBar: React.FC = () => {
	const isLoggedIn = useCachedLoginStatus();
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

								<MyProfile />
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
			{isOpen ? <Dropdown /> : null}
		</>
	);
};

export default NavigationBar;
