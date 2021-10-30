export enum formMsgsTypeEnum {
	None = "",
	Success = "formMsgs-success",
	Fail = "formMsgs-fail",
}
export type FormMessageType = {
	msg: string;
	type: formMsgsTypeEnum;
};

export type SignUpFormData = {
	firstName: string;
	lastName: string;
	emailId: string;
	password: string;
	confirmPassword: string;
};
