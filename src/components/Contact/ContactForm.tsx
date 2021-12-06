import React from "react";

const ContactForm = () => {
	return (
		<div className="w-1/2 mx-auto">
			<div className="flex flex-col">
				<div className="flex flex-row justify-between ">
					<div>Name</div>
					<div>Email</div>
				</div>
				<div>Message</div>
			</div>
			<div className="mx-auto w-max">Submit Button</div>
		</div>
	);
};
export default ContactForm;
