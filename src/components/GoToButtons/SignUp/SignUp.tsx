import React from "react";
import { NavLink } from "react-router-dom";
const SignUp = () => {
	return (
		<button className="flex bg-semiLight text-light text-center rounded-tr-full rounded-bl-full  items-center px-8 py-2 hover:text-dark hover:bg-light  hover:border-2 hover:border-dark ">
			<NavLink to="/sign-up">Sign Up</NavLink>
		</button>
	);
};
export default SignUp;
// flex  items-center bg-semiLight container  w-full h-auto rounded-lg px-8 py-2 align-text-top
