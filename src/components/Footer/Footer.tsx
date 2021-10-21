import React from "react";
import { ReactComponent as LogoLight } from "assets/common/logo-main-light.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
	return (
		<div className="relative py-2 px-4 w-full mx-auto sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 bg-dark">
			<LogoLight />
			<div className="absolute right-32 bottom-50 text-light flex flex-row  space-x-14  items-center sm:mx-0 sm:flex-shrink-0 ">
				<NavLink className="motion-safe:hover:scale-110 " to="/about">
					About
				</NavLink>
				<NavLink
					className="motion-safe:hover:scale-110 "
					to="/privacyPolicy"
				>
					Privacy Policy
				</NavLink>
				<NavLink
					className="motion-safe:hover:scale-110  "
					to="/contact"
				>
					Contact
				</NavLink>
			</div>
		</div>
	);
};
export default Footer;
