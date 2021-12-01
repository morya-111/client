import React from "react";
import { ReactComponent as LogoLight } from "assets/common/logo-main-light.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
	return (
		<div className="relative flex items-center w-full px-4 py-2 mx-auto space-y-0 sm:py-4 sm:space-x-6 bg-dark">
			<LogoLight className="w-auto h-16" />
			<div className="absolute flex flex-row items-center space-x-5 right-4 sm:right-9 md:right-32 md:bottom-50 text-light sm:space-x-14 sm:mx-0 sm:flex-shrink-0 ">
				<NavLink
					className="text-sm motion-safe:hover:scale-110 sm:text-base"
					to="/about"
				>
					About
				</NavLink>
				<NavLink
					className="text-sm motion-safe:hover:scale-110 sm:text-base "
					to="/privacypolicy"
				>
					Privacy Policy
				</NavLink>
				<NavLink
					className="text-sm motion-safe:hover:scale-110 sm:text-base"
					to="/contact"
				>
					Contact
				</NavLink>
			</div>
		</div>
	);
};
export default Footer;
