import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

import "components/SignUpForm/SignUpForm.css";
import axiosClient from "utils/axiosClient";

const OAuthLinks: React.FC = () => {
	return (
		<div className="m-50">
			<div className="flex justify-center m-auto text-xl font-bold ">
				Sign In To BookEx
			</div>
			<div className="flex justify-center">
				<a
					className="std-icon-wrapper"
					href="http://localhost:4000/v1/auth/google"
				>
					<FcGoogle className="w-12 h-12 cursor-pointer" />
				</a>
				<a
					className="std-icon-wrapper"
					href="http://localhost:4000/v1/auth/facebook"
				>
					<AiFillFacebook className="w-12 h-12 " />
				</a>
			</div>
			<div className="flex justify-center my-2">
				<div className="">
					<span className="line-span">xxxxxxxxxxx</span>
					<span className="">or do it via E-mail</span>
					<span className="line-span">xxxxxxxxxxx</span>
				</div>
			</div>
		</div>
	);
};

export default OAuthLinks;