import React from "react";
import NavigationBar from "components/NavigationBar/NavigationBar";
import { ReactComponent as HeroImg } from "assets/homepage/homepage-img.svg";
import Footer from "components/Footer";

const Landing = () => {
	return (
		<div>
			<div className="w-screen h-screen bg-clip-padding bg-light">
				<NavigationBar />
			</div>
			<div className="absolute right-0 top-32 bg-fixed">
				<HeroImg />
			</div>
			<div className="w-screen h-screen bg-clip-padding bg-semiDark"></div>
			<div className="w-screen h-20   bg-clip-padding bg-dark">
				<Footer />
			</div>
		</div>
	);
};
export default Landing;
