import useCachedLoginStatus from "hooks/useCachedLoginStatus";
import React from "react";
import { NavLink } from "react-router-dom";

const Dropdown = () => {
	const isLoggedIn = useCachedLoginStatus();

	return (
		<>
			<div className="grid grid-rows-4 text-center bg-semiDark ">
				<NavLink
					to="/catalogue"
					className="p-4 font-semibold text-light"
				>
					Catalogue
				</NavLink>

				<NavLink to="/about" className="p-4 font-semibold text-light">
					About
				</NavLink>
				<NavLink to="/contact" className="p-4 font-semibold text-light">
					Contact
				</NavLink>
				<NavLink to="/signUp" className="p-4 font-semibold text-light">
					Sign Up
				</NavLink>
			</div>
		</>
	);
};

export default Dropdown;
