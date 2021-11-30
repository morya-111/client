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
			<NavLink to="/catalogue" className="p-4 hover:text-greyText ">
				Catalogue
			</NavLink>
			<NavLink to="/mybooks" className="p-4 mr-2 ">
				My Books
			</NavLink>

			<LogOutButton />
		</div>
	);
};

export default ProfilePopUp;
