import InfoText from "components/Homepage/InfoText";
import Landing from "components/Homepage/Landing";
import React from "react";

const Homepage: React.FC = () => {
	return (
		<div className="relative bg-light bg-clip-padding">
			<Landing />
			<div className="absolute top-48  left-20 ">
				<InfoText
					title="Trying To Find Your Favorite book?"
					subTitle="Browse large catalogue of books to rent or buy from people close to you!"
				/>
			</div>
		</div>
	);
};

export default Homepage;
