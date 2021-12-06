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
		"p-1 pl-2 m-2 border-2 rounded-md border-semiLight hover:bg-semiDark hover:border-dark hover:text-white";
	return (
		<div
			className={`${className} bg-semiLight h-auto w-48 rounded-md rounded-tr-none rounded-bl-none flex flex-col shadow-xl `}
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
			<div className="p-1 pl-2 m-2 border-2 rounded-md border-semiLight hover:bg-red-500 hover:opacity-100 hover:border-dark hover:text-white">
				<LogOutButton extraCleanUp={closerFunc} />
			</div>
		</div>
	);
};

export default ProfilePopUp;
