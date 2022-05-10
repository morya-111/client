import React from "react";
import { NavLink } from "react-router-dom";
const SignUp = () => {
	return (
		<NavLink to="/signup">
			<button
				className="items-center px-8 py-2 text-center text-white bg-black rounded-[6px] font-imFell hover:scale-[102%]"
				style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
			>
				Sign Up
			</button>
		</NavLink>
	);
};
export default SignUp;
