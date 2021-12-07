import LogOutButton from "components/LogOutButton";
import useCachedLoginStatus from "hooks/useCachedLoginStatus";
import React from "react";
import { NavLink } from "react-router-dom";

const Dropdown = () => {
	const isLoggedIn = useCachedLoginStatus();
	const buttonClassnames =
		"p-1 pl-2 m-2 duration-[400ms] ease-linear transform border-2 rounded-md border-semiLight hover:bg-semiDark hover:border-dark hover:text-white";

	return (
		<>
			{isLoggedIn ? (
				<></>
			) : (
				<>
					<div className="grid grid-rows-4 text-center bg-semiLight ">
						<NavLink to="/catalogue" className={buttonClassnames}>
							Catalogue
						</NavLink>

						<NavLink to="/about" className={buttonClassnames}>
							About
						</NavLink>
						<NavLink to="/contact" className={buttonClassnames}>
							Contact
						</NavLink>
						<NavLink to="/signUp" className={buttonClassnames}>
							Sign Up
						</NavLink>
					</div>
				</>
			)}
		</>
	);
};

export default Dropdown;
