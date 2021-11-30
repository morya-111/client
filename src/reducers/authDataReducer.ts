import {
	AuthDataType,
	AuthDataActions,
	AuthDataActionsTypeEnum,
	initialAuthData,
} from "types/authTypes";

const authDataReducer = (
	state: AuthDataType,
	action: AuthDataActions
): AuthDataType => {
	console.log("Auth Data Reducer Called !");

	switch (action.type) {
		case AuthDataActionsTypeEnum.LOGIN_SUCCESS:
			return action.payload as AuthDataType;

		case AuthDataActionsTypeEnum.ALREADY_LOGGED_IN:
			return action.payload as AuthDataType;

		case AuthDataActionsTypeEnum.LOGOUT_SUCCESS:
			return { ...initialAuthData } as AuthDataType;
		default:
			return state;
	}
};

export default authDataReducer;
