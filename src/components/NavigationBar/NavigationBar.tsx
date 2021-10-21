import React from "react";
import { ReactComponent as LogoDark } from "assets/common/logo-main-dark.svg";
import SignUp from "components/GoToButtons/SignUp";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
	return (
		<div className="relative py-2 w-screen mx-auto  sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
			<div className="block mx-auto h-24 sm:mx-0 sm:flex-shrink-0 ">
				<LogoDark />
			</div>
			<div className="absolute right-10 bottom-1/2 text-dark flex flex-row  space-x-10 items-center sm:mx-0 sm:flex-shrink-0 ">
				<NavLink className="motion-safe:hover:scale-110" to="/about">
					About
				</NavLink>
				<NavLink
					className="motion-safe:hover:scale-110"
					to="/catalogue"
				>
					Catalogue
				</NavLink>
				<NavLink className="motion-safe:hover:scale-110" to="/contact">
					Contact
				</NavLink>
				<SignUp />
			</div>
		</div>
	);
};
export default NavigationBar;
//
//
