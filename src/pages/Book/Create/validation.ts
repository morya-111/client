import * as Yup from "yup";

const createBookValidation = Yup.object().shape({
	name: Yup.string().max(300).required("Name is required."),
	author: Yup.string().max(100).required("Author is required."),
	publisher: Yup.string().max(100).required("Publisher is required."),
	description: Yup.string().max(1000),
	genre: Yup.string().max(50).required(),
	sell: Yup.boolean(),
	rent: Yup.boolean(),
	image: Yup.string().required("Image is required."),
	price: Yup.number().when("sell", {
		is: true,
		then: Yup.number()
			.positive("Price must be positive number.")
			.required("Price is required."),
	}),
	deposit: Yup.number().when("rent", {
		is: true,
		then: Yup.number()
			.positive("Deposit must be positive number.")
			.required("Deposit is required."),
	}),
	fees: Yup.number().when("rent", {
		is: true,
		then: Yup.number()
			.positive("Fees must be positive number.")
			.required("Fees is required."),
	}),
	duration: Yup.number().when("rent", {
		is: true,
		then: Yup.number()
			.positive("Duration must be positive number.")
			.required("Duration is required."),
	}),
	durationUnit: Yup.string().when("rent", {
		is: true,
		then: Yup.string().required("Duration Unit is required."),
	}),
});

export default createBookValidation;

// email: Yup.string()
// .email("Please give a valid email.")
// .required("Email is required."),
// password: Yup.string()
// .min(8, "Password should be more than 8 characters long.")
// .required("Password is required."),
// confirm_password: Yup.string()
// .min(8, "Password should be more than 8 characters long.")
// .required("Password is required.")
// .oneOf([Yup.ref("password")], "Passwords do not match"),
// first_name: Yup.string().required("First Name is required."),
// last_name: Yup.string().required("Last Name is required."),

// rentDeposit: "0",
// rentDuration: "0",
// rentDurationUnit: "",
// rentFees: "0",
