import React from "react";
import { ReactComponent as LogoDark } from "assets/common/logo-main-dark.svg";
import About from "components/GoToButtons/About";
import Catalogue from "components/GoToButtons/Catalogue";
import Contact from "components/GoToButtons/Contact";
import SignUp from "components/GoToButtons/SignUp";

const NavigationBar = () => {
	return (
		<div className="fixed top-0 z-50 flex justify-between md:justify-evenly px-4 py-2 xl:px-3">
			<div className=" transform scale-75">
				<LogoDark />
			</div>
			<div className=" object-none object-right-top flex flex-row content-evenly space-x-4 container px-4 py-2 ">
				<About />
				<Catalogue />
				<Contact />
				<SignUp />
			</div>
		</div>
	);
};
export default NavigationBar;
