import React from "react";
import { ReactComponent as LogoLight } from "assets/common/logo-main-light.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
	return (
		<div className="relative w-full px-4 py-2 mx-auto sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 bg-dark">
			<LogoLight className="w-auto h-16" />
			<div className="absolute flex flex-row items-center right-32 bottom-50 text-light space-x-14 sm:mx-0 sm:flex-shrink-0 ">
				<NavLink className="motion-safe:hover:scale-110 " to="/about">
					About
				</NavLink>
				<NavLink
					className="motion-safe:hover:scale-110 "
					to="/privacyPolicy"
				>
					Privacy Policy
				</NavLink>
				<NavLink className="motion-safe:hover:scale-110 " to="/contact">
					Contact
				</NavLink>
			</div>
		</div>
	);
};
export default Footer;
