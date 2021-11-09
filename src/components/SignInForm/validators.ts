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
