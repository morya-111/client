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
			<div className={popUpBtnClassName}>
				<NavLink to="/catalogue">Catalogue</NavLink>
			</div>
			<div className={popUpBtnClassName}>
				<NavLink to="/mybooks">My Books</NavLink>
			</div>
			<div className={popUpBtnClassName}>
				<NavLink to="/myprofile">My Profile</NavLink>
			</div>
			<div className={popUpBtnClassName}>
				<LogOutButton extraCleanUp={closerFunc} />
			</div>
		</div>
	);
};

export default ProfilePopUp;
