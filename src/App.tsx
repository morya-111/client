import Navigation from "Navigation";
import React, { useReducer } from "react";
import authDataReducer from "reducers/authDataReducer";
import { initialAuthData } from "types/authTypes";

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

export default App;
