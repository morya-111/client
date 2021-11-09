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
		error = "Please Enter A Valid Password";
	}
	return error;
};
