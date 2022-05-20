import React from "react";
import SignInForm from "components/SignInForm";
import { NavLink } from "react-router-dom";
import { ReactComponent as LogoDark } from "assets/common/logo-main-dark.svg";
const SignInPage: React.FC = () => {
	return (
		<>
			<div className="min-h-screen bg-bgGrey45">
				<div className="pt-5 ">
					<div className="flex justify-center mt-6">
						<NavLink
							to="/"
							className="font-imFell font-[400] text-[32px] leading-[38px] text-black ml-4 md:ml-0"
						>
							BookEx
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
