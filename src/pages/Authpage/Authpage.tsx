import React from "react";
import LoginForm from "components/SingUpForm";
import "tailwindcss/tailwind.css";
const Authpage: React.FC = () => {
	return (
		<div className="flex content-center ">
			<LoginForm />
		</div>
	);
};

export default Authpage;
