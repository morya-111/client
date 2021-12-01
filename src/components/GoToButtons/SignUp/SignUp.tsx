import React from "react";
import { NavLink } from "react-router-dom";
const SignUp = () => {
	return (
		<button className="items-center px-8 py-2 text-center border-2 rounded-full bg-semiLight text-light hover:text-dark hover:bg-light hover:border-2 hover:border-dark ">
			<NavLink to="/signup">Sign Up</NavLink>
		</button>
	);
};
export default SignUp;
