import React from "react";
// import { ReactComponent as LogoLight } from "assets/common/logo-main-light.svg";
import { NavLink } from "react-router-dom";

const Footer = () => {
	return (
		<div
			className="relative flex items-center w-full px-4 py-2 mx-auto space-y-0 sm:py-4 sm:space-x-6 bg-bgGrey100"
			style={{ boxShadow: "0px 4px 54px rgba(0, 0, 0, 0.25)" }}
		>
			{/* <LogoLight className="w-auto h-16" /> */}
			<NavLink
				to="/"
				className="font-imFell font-[400] text-[32px] leading-[38px] text-black"
			>
				BookEx
			</NavLink>
			<div className="absolute flex flex-row items-center space-x-5 right-4 sm:right-9 md:right-32 md:bottom-50 text-light sm:space-x-14 sm:mx-0 sm:flex-shrink-0 ">
				<NavLink
					className="text-sm text-black motion-safe:hover:scale-110 sm:text-base font-imFell"
					to="/about"
				>
					About
				</NavLink>
				<NavLink
					className="text-sm text-black motion-safe:hover:scale-110 sm:text-base font-imFell "
					to="/privacypolicy"
				>
					Privacy Policy
				</NavLink>
				<NavLink
					className="text-sm text-black motion-safe:hover:scale-110 sm:text-base font-imFell"
					to="/contact"
				>
					Contact
				</NavLink>
			</div>
		</div>
	);
};
export default Footer;
