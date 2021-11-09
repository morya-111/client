import { SignUpFormData } from "types/formTypes";
export const validateSignUpForm = (values: SignUpFormData) => {
	let errors: any = {};
	if (values.password !== values.confirmPassword) {
		errors.confirmPassword = "Not Matching";
		return errors;
	}

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
	// credit - https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
	const emailRegEx =
		//eslint-disable-next-line
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (!value.match(emailRegEx)) {
		error = "Please enter a valid Email id";
		return error;
	}
	if (!value) {
		error = "Email is mandatory";
	}
	return error;
};

// checks if password is longer than 8 characters
export const validatePassword = (value: string) => {
	let error: string = "";

	if (value.length < 8) {
		error = "Password Must Be 8 Characters or longer";
	}
	return error;
};

// checks if password field is empty
export const validatePassword2 = (value: string) => {
	let error: string = "";

	if (value.length < 1) {
		error = "Password field can't be empty";
	}
	return error;
};
