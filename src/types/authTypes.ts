export type AuthDataActions = {
	payload: Object | AuthDataType;
	type: AuthDataActionsTypeEnum;
};

export const initialAuthData: AuthDataType = {
	email: "",
	first_name: "",
	last_name: "",
	role: "",
	id: -1,
};

export type AuthDataType = {
	email: string;
	first_name: string;
	id: number;
	last_name: string;
	role: string;
};

// TODO: this can eventually be made a lot clearer
export enum AuthDataActionsTypeEnum {
	LOGIN_SUCCESS = "LOGIN_SUCCESS",
	ALREADY_LOGGED_IN = "ALREADY_LOGGED_IN",
}

export type AuthDataContextType = {
	authData: AuthDataType;
	authDataDispatch: React.Dispatch<AuthDataActions>;
};