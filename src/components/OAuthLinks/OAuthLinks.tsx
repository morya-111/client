import React from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

import "components/SignUpForm/SignUpForm.css";

const {
	backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000",
} = process.env;

type OAuthLinksPropsType = {
	titleText: string;
};
const OAuthLinks: React.FC<OAuthLinksPropsType> = ({ titleText }) => {
	return (
		<div className="m-50">
			<div className="flex justify-center m-auto mt-3 text-xl font-bold">
				{titleText || "Title Text"}
			</div>
			<div className="flex justify-center">
				<a
					className="std-icon-wrapper"
					href={`${backendUrl}/v1/auth/google`}
				>
					<FcGoogle className="w-12 h-12 cursor-pointer" />
				</a>
				<a
					className="std-icon-wrapper"
					href={`${backendUrl}/v1/auth/facebook`}
				>
					<AiFillFacebook className="w-12 h-12 " />
				</a>
			</div>
			<div className="flex justify-center my-2">
				<div className="">
					{
						//NOTE: xxxxxxxxxxx are css hacks for horizontal lines
					}
					<span className="line-span">xxxxxxxxxxx</span>
					<span className="">or do it via E-mail</span>
					<span className="line-span">xxxxxxxxxxx</span>
				</div>
			</div>
		</div>
	);
};

export default OAuthLinks;
