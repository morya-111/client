import React from "react";
import { NavLink } from "react-router-dom";

const Dropdown = ({ isOpen }: { isOpen: boolean }) => {
	return (
		<div
			className={
				isOpen ? "grid grid-rows-4 text-center bg-semiDark " : "hidden"
			}
		>
			<NavLink to="/about" className="p-4">
				About
			</NavLink>
			<NavLink to="/catalogue" className="p-4">
				Catalogue
			</NavLink>
			<NavLink to="/contact" className="p-4">
				Contact
			</NavLink>
			<NavLink to="/signUp" className="p-4">
				Sign Up
			</NavLink>
		</div>
	);
};

export default Dropdown;
