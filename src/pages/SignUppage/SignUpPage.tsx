import React from "react";
import SignUpForm from "components/SignUpForm";
import "tailwindcss/tailwind.css";
const Authpage: React.FC = () => {
	return (
		<div className="flex content-center mt-12">
			<SignUpForm />
		</div>
	);
};

export default Authpage;
