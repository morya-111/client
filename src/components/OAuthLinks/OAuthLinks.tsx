import React from "react";
import { useQuery } from "react-query";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import api from "api";

import "components/SignUpForm/SignUpForm.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "";

type OAuthLinksPropsType = {
	titleText: string;
};
const OAuthLinks: React.FC<OAuthLinksPropsType> = ({ titleText }) => {
	// only show providers the server has credentials for
	const { data } = useQuery(
		"authProviders",
		() =>
			api.get<{ data: { google: boolean; facebook: boolean } }>(
				"/auth/providers"
			),
		{ staleTime: Infinity, retry: false }
	);
	const providers = data?.data.data;
	const hasOAuth = !!(providers?.google || providers?.facebook);

	return (
		<div className="m-50">
			<div className="flex justify-center m-auto mt-3 text-xl font-bold font-imFell">
				{titleText || "Title Text"}
			</div>
			{hasOAuth && (
				<div className="flex justify-center">
					{providers?.google && (
						<a
							className="std-icon-wrapper"
							href={`${backendUrl}/v1/auth/google`}
						>
							<FcGoogle className="w-12 h-12 cursor-pointer" />
						</a>
					)}
					{providers?.facebook && (
						<a
							className="std-icon-wrapper"
							href={`${backendUrl}/v1/auth/facebook`}
						>
							<AiFillFacebook className="w-12 h-12 " />
						</a>
					)}
				</div>
			)}
			<div className={hasOAuth ? "flex justify-center my-2" : "hidden"}>
				<div className="">
					{
						//NOTE: xxxxxxxxxxx are css hacks for horizontal lines
					}
					<span className="line-span text-bgGrey50">xxxxxxxxxxx</span>
					<span className="italic font-imFell">
						or do it via E-mail
					</span>
					<span className="line-span text-bgGrey50">xxxxxxxxxxx</span>
				</div>
			</div>
		</div>
	);
};

export default OAuthLinks;
