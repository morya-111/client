import React, { useRef } from "react";
import useClickedOutsideEffect from "hooks/useClickedOutsideEffect";
import { NavLink } from "react-router-dom";
import LogOutButton from "components/LogOutButton";

const ProfilePopUp: React.FC<
	React.ComponentPropsWithoutRef<"div"> & { closerFunc: Function }
> = ({ className, closerFunc }) => {
	const selfRef = useRef(null);
	useClickedOutsideEffect(selfRef, closerFunc);
	return (
		<div
			className={`${className} bg-semiLight h-auto w-48 rounded-md rounded-tr-none rounded-bl-none flex flex-col`}
			ref={selfRef}
		>
			<div className="p-1 pl-2 m-2 rounded-md hover:bg-semiDark ">
				<NavLink to="/catalogue">Catalogue</NavLink>
			</div>
			<div className="p-1 pl-2 m-2 rounded-md hover:bg-semiDark ">
				<NavLink to="/mybooks">My Books</NavLink>
			</div>
			<div className="p-1 pl-2 m-2 rounded-md hover:bg-semiDark ">
				<NavLink to="/myprofile">My Profile</NavLink>
			</div>
			<div className="p-1 pl-2 m-2 rounded-md hover:bg-semiDark ">
				<LogOutButton extraCleanUp={closerFunc} />
			</div>
		</div>
	);
};

export default ProfilePopUp;
