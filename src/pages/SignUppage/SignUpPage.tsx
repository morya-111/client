import React from "react";
import SignUpForm from "components/SignUpForm";
import "tailwindcss/tailwind.css";
import { ReactComponent as LogoDark } from "assets/common/logo-main-dark.svg";
import { NavLink } from "react-router-dom";

const Authpage: React.FC = () => {
	return (
		<>
			<div className="min-h-screen bg-light">
				<div className="pt-3">
					<div className="flex justify-center">
						<NavLink to="/">
							<LogoDark className="w-28" />
						</NavLink>
					</div>
					<div className="flex content-center">
						<SignUpForm />
					</div>
				</div>
			</div>
		</>
	);
};

export default Authpage;
