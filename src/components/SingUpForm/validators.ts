import { SignUpFormData } from "./types";
export const validateSignUpForm = (values: SignUpFormData) => {
	let errors: any = {};
	if (values.password !== values.confirmPassword) {
		errors.confirmPassword = "Not Matching";
		console.log("6");
		return errors;
	}
	console.log("7");
	return errors;
};

export const validateFirstName = (value: string) => {
	let error: string = "";
	if (!value) {
		error = "First Name is mandatory";
	}
	return error;
};
export const validateLastName = (value: string) => {
	let error: string = "";
	if (!value) {
		error = "Last Name is mandatory";
	}
	return error;
};
export const validateEmailId = (value: string) => {
	let error: string = "";
	if (!value) {
		error = "Email is mandatory";
	}
	return error;
};

export const validatePassword = (value: string) => {
	let error: string = "";

	if (value.length < 8) {
		error = "Password Must Be 8 Characters or longer";
	}
	return error;
};
