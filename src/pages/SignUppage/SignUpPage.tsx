import React from "react";
import SignUpForm from "components/SignUpForm";
import "tailwindcss/tailwind.css";
import { ReactComponent as LogoDark } from "assets/common/logo-main-dark.svg";
import { NavLink } from "react-router-dom";

const Authpage: React.FC = () => {
	return (
		<>
			<div className="min-h-screen bg-bgGrey45 ">
				<div className="pt-3">
					<div className="flex justify-center mt-6">
						{/* <NavLink to="/">
							<LogoDark className="w-28" />
						</NavLink> */}
						<NavLink
							to="/"
							className="font-imFell font-[400] text-[32px] leading-[38px] text-black ml-4 md:ml-0"
						>
							BookEx
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
