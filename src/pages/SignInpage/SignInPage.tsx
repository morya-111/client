import React from "react";
import SignInForm from "components/SignInForm";
import { NavLink } from "react-router-dom";
import { ReactComponent as LogoDark } from "assets/common/logo-main-dark.svg";
const SignInPage: React.FC = () => {
	return (
		<>
			<div className="min-h-screen bg-light">
				<div className="pt-5">
					<div className="flex justify-center">
						<NavLink to="/">
							<LogoDark className="w-28" />
						</NavLink>
					</div>
					<div className="flex content-center">
						<SignInForm />
					</div>
				</div>
			</div>
		</>
	);
};

export default SignInPage;
