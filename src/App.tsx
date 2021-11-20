import Navigation from "Navigation";
import React, { useReducer, useEffect } from "react";
import authDataReducer from "reducers/authDataReducer";
import {
	AuthDataActionsTypeEnum,
	AuthDataType,
	initialAuthData,
} from "types/authTypes";
// import { Circle } from "react-preloaders";
import AuthDataContext from "contexts/AuthDataContext";
import { useQuery } from "react-query";
import axiosClient from "utils/axiosClient";

function App() {
	const [authData, authDataDispatch] = useReducer(
		authDataReducer,
		initialAuthData
	);

	const checkIfLoggedIn = () =>
		axiosClient.get<IsLoggedInResType>("/user/isloggedin");

	const isLoggedInQuery = useQuery("isLoggedIn", checkIfLoggedIn);

	useEffect(() => {
		// console.log(authData);
		// TODO: this should be done in NavBar, because if it is done here, then that is going to trigger a lot of re-renders and effectively reduce the efficiency
		// switch (isLoggedInQuery.status) {
		// 	case "loading":
		// 		console.log("Checking If User Is Logged In...");
		// 		break;
		// 	case "success":
		// 		console.log("User Is Logged In Already...");
		// 		const userData = { ...isLoggedInQuery.data.data.data.user };
		// 		// authDataDispatch({
		// 		// 	type: AuthDataActionsTypeEnum.ALREADY_LOGGED_IN,
		// 		// 	payload: userData,
		// 		// });
		// 		break;
		// 	default:
		// 		break;
		// }
	});

	return (
		<AuthDataContext.Provider value={{ authData, authDataDispatch }}>
			<Navigation />
		</AuthDataContext.Provider>
	);
}

type IsLoggedInFailResType = {
	status: string;
	message: string;
};

type IsLoggedInResType = {
	status: string;
	data: {
		user: {
			id: number;
			first_name: string;
			last_name: string;
			email: string;
			role: string;
		};
	};
};

export default App;
