import React, { useRef } from "react";
import useClickedOutsideEffect from "hooks/useClickedOutsideEffect";
import { NavLink } from "react-router-dom";
import LogOutButton from "components/LogOutButton";

const ProfilePopUp: React.FC<
	React.ComponentPropsWithoutRef<"div"> & { closerFunc: Function }
> = ({ className, closerFunc }) => {
	const selfRef = useRef(null);
	useClickedOutsideEffect(selfRef, closerFunc);
	const popUpBtnClassName =
		"p-1 pl-2 m-2 border-2 rounded-md border-bgGrey100 hover:bg-bgGrey100 hover:border-bgGrey100 hover:font-bold font-martel text-white hover:text-black";
	return (
		<div
			className={`${className} bg-black h-auto w-48 rounded-lg rounded-tr-none  flex flex-col shadow-xl -right-2 `}
			ref={selfRef}
		>
			<NavLink to="/catalogue">
				<div className={popUpBtnClassName}>Catalogue</div>
			</NavLink>
			<NavLink to="/mybooks">
				<div className={popUpBtnClassName}>My Books</div>
			</NavLink>
			<NavLink to="/myprofile">
				<div className={popUpBtnClassName}>My Profile</div>
			</NavLink>
			<div className="p-1 pl-2 m-2 border-2 rounded-md border-bgGrey100 hover:bg-red-500 hover:opacity-100 hover:border-dark hover:text-white">
				<LogOutButton extraCleanUp={closerFunc} />
			</div>
		</div>
	);
};

export default ProfilePopUp;
