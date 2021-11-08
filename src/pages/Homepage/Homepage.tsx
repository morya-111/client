import React from "react";
import { Link } from "react-router-dom";
const Homepage: React.FC = () => {
	return (
		<div>
			<Link to="/signup">Sign Up</Link>
			<br />
			<Link to="/signin">Sign In</Link>
		</div>
	);
};

export default Homepage;
