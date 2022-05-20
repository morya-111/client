import React, { useEffect, useState } from "react";
import useAuthData from "hooks/useAuthData";
import manyQuotes from "utils/quotes";
import { render } from "@testing-library/react";

type Props = {
	showEmail?: boolean;
	page?: string;
};
const ProfileSideBar: React.FC<Props> = ({ showEmail = true, page }) => {
	const { avatarUrl, first_name, email } = useAuthData();
	const singleQuote =
		manyQuotes[Math.floor(Math.random() * manyQuotes.length)];
	const [newSingleQuote, setNewSingleQuote] = useState(singleQuote);

	useEffect(() => {
		setNewSingleQuote(singleQuote);
	}, [singleQuote]);

	return (
		<div className="container mx-10 md:flex max-w-max">
			<div className="text-center ">
				<div className="inline-flex items-center justify-center rounded-full w-60 h-60">
					<img
						style={{
							filter: "drop-shadow(0px 7px 17px rgba(0, 0, 0, 0.31))",
						}}
						src={avatarUrl}
						className="rounded-full"
						alt="<Avatar Pic>"
					/>
				</div>
				<div className="text-center">
					<h1 className="text-2xl font-bold font-martel">
						{first_name}'{first_name?.slice(-1) !== "s" && "s"}{" "}
						{page}
					</h1>
					{showEmail && (
						<h3 className="text-sm text-gray-500 font-martel">
							{email}
						</h3>
					)}
				</div>
				<div className="flex-col items-center hidden w-64 px-5 pt-3 mt-5 text-xl italic font-bold border-t border-gray-500 md:flex lg:w-80 font-imFell">
					<div className="text-center">"{newSingleQuote?.text}"</div>
					<div className="mt-1 text-sm font-semibold text-right text-opacity-70 text-dark font-martel">
						-{newSingleQuote?.author}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSideBar;
