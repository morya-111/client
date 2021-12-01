import React from "react";
import logo from "../../assets/common/homer-simpson-never-try.gif";

const NotFound: React.FC = () => {
	return (
		<>
			<div className="flex flex-row justify-center w-full h-full ">
				<div>
					<img src={logo} alt="" />
				</div>
			</div>
			<div className="flex justify-center w-full mt-5 text-5xl align-middle">
				<div className="w-2/3 text-center">
					Where You Wandering? Next time use our UI only and don't try
					to mess with that URL bar.
				</div>
			</div>
		</>
	);
};

export default NotFound;
