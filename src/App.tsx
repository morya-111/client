import Navigation from "Navigation";
import React, { useReducer } from "react";
import { QueryClient } from "react-query";
import {
	AuthDataType,
	initialAuthData,
	AuthDataActions,
	AuthDataActionsTypeEnum,
} from "types/authTypes";

import AuthDataContext from "contexts/AuthDataContext";

function App() {
	const [authData, authDataDispatch] = useReducer(
		authDataReducer,
		initialAuthData
	);

	return (
		<AuthDataContext.Provider value={{ authData, authDataDispatch }}>
			<Navigation />;
		</AuthDataContext.Provider>
	);
}

const authDataReducer = (
	state: AuthDataType,
	action: AuthDataActions
): AuthDataType => {
	switch (action.type) {
		case AuthDataActionsTypeEnum.LOGIN_SUCCESS:
			return action.payload as AuthDataType;

		default:
			return state;
	}
};

export default App;
