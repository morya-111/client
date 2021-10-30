import React from "react";
import { Link } from "react-router-dom";
const Homepage: React.FC = () => {
	return (
		<div>
			<Link to="/auth">Auth Page</Link>
		</div>
	);
};

export default Homepage;
