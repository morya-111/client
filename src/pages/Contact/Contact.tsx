import React from "react";
import ContactForm from "components/Contact/ContactForm";

const Contact = () => {
	return (
		<section className="relative w-full min-h-screen text-dark bg-light">
			<div className="container px-5 py-24 mx-auto ">
				<div className="flex flex-col w-full mb-12 text-center">
					<h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
						Contact Us
					</h1>
					<p className="mx-auto text-base leading-relaxed lg:w-2/3">
						We accept all sorts of books and suggestions because
						they are good for our improvement.
					</p>
				</div>
				<ContactForm />
			</div>
		</section>
	);
};

export default Contact;
