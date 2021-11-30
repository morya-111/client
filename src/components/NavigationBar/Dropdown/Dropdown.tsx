import useCachedLoginStatus from "hooks/useCachedLoginStatus";
import React from "react";
import { NavLink } from "react-router-dom";
import MyProfile from "../MyProfile";

const Dropdown = () => {
	const isLoggedIn = useCachedLoginStatus();

	return (
		<>
			{isLoggedIn ? (
				<>
					<div className="grid grid-rows-3 text-center bg-semiDark ">
						<NavLink
							to="/catalogue"
							className="p-4 font-semibold text-light"
						>
							Catalogue
						</NavLink>
						<NavLink
							to="/catalogue"
							className="p-4 font-semibold text-light"
						>
							My Books
						</NavLink>
						<NavLink
							to="/catalogue"
							className="p-4 font-semibold text-light"
						>
							My Profile
						</NavLink>
					</div>
				</>
			) : (
				<>
					<div className="grid grid-rows-4 text-center bg-semiDark ">
						<NavLink
							to="/catalogue"
							className="p-4 font-semibold text-light"
						>
							Catalogue
						</NavLink>

						<NavLink
							to="/about"
							className="p-4 font-semibold text-light"
						>
							About
						</NavLink>
						<NavLink
							to="/contact"
							className="p-4 font-semibold text-light"
						>
							Contact
						</NavLink>
						<NavLink
							to="/signUp"
							className="p-4 font-semibold text-light"
						>
							Sign Up
						</NavLink>
					</div>
				</>
			)}
		</>
	);
};

const MyProfileInline: React.FC = () => {
	return <div>My Profile</div>;
};
export default Dropdown;
