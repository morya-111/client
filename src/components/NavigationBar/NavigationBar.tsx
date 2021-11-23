import React, { FC, Props } from "react";
import { ReactComponent as LogoDark } from "assets/common/logo-main-dark.svg";
import { ReactComponent as MenuIcon } from "assets/common/menu-icon.svg";
import SignUp from "components/GoToButtons/SignUp";
import { NavLink } from "react-router-dom";

const NavigationBar = (
	{ toggle }: { toggle: any },
	{ isOpen }: { isOpen: boolean }
) => {
	return (
		<nav className="relative flex items-center justify-between h-24 md:pl-14 lg:pr-14 md:pr-5 bg-light">
			<LogoDark className="w-auto h-24 p-3" />
			<div className="px-4 cursor-pointer md:hidden" onClick={toggle}>
				<MenuIcon />
			</div>
			<div className="hidden pr-8 md:block">
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
			</div>
		</nav>
	);
};
export default NavigationBar;
