export enum formMsgsTypeEnum {
	None = "",
	Success = "formMsgs-success font-martel",
	Fail = "formMsgs-fail font-martel font-xs font-semibold",
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

export type SignInFormData = {
	emailId: string;
	password: string;
};
