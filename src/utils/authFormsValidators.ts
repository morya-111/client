import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
	firstName: Yup.string().required("First Name is required !"),
	lastName: Yup.string().required("Last Name is required !"),
	emailId: Yup.string()
		.email("Invalid Email ID !")
		.required("Email ID is required !"),
	password: Yup.string()
		.min(8, "Password should atleast be longer than 8 characters")
		.required("Password is required !"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match !")
		.required("Confirm the Password !"),
});

export const SignInSchema = Yup.object().shape({
	emailId: Yup.string()
		.email("Invalid Email ID !")
		.required("Email ID is required !"),
	password: Yup.string()
		.min(8, "Password should atleast be longer than 8 characters")
		.required("Password is required !"),
});
