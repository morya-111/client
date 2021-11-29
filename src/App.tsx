import Navigation from "Navigation";
import React, { useReducer, useEffect, useState } from "react";
import authDataReducer from "reducers/authDataReducer";
import { AuthDataActionsTypeEnum, initialAuthData } from "types/authTypes";

import { IsLoggedInResType } from "types/resTypes";
// import { Circle } from "react-preloaders";
import AuthDataContext from "contexts/AuthDataContext";
import { useQuery } from "react-query";
import axiosClient from "utils/axiosClient";

function App() {
	const [shouldAuthDataFetch, setShouldAuthDataFetch] =
		useState<Boolean>(true);
	const [authData, authDataDispatch] = useReducer(
		authDataReducer,
		initialAuthData
	);

	const checkIfLoggedIn = () =>
		axiosClient.get<IsLoggedInResType>("/user/isloggedin");

	const isLoggedInQuery = useQuery("isLoggedIn", checkIfLoggedIn, {
		enabled: false,
	});

	useEffect(() => {
		// console.log(authData);
		// TODO: this should be done in NavBar, because if it is done here, then that is going to trigger a lot of re-renders and effectively reduce the efficiency
		if (!authData.email && shouldAuthDataFetch) {
			isLoggedInQuery.refetch();

			switch (isLoggedInQuery.status) {
				case "loading":
					console.log("Checking If User Is Logged In...");
					break;
				case "success":
					setShouldAuthDataFetch(false);
					console.log("User Is Logged In...");
					const userData = { ...isLoggedInQuery.data.data.data.user };
					authDataDispatch({
						type: AuthDataActionsTypeEnum.ALREADY_LOGGED_IN,
						payload: userData,
					});
					break;
				default:
					setShouldAuthDataFetch(false);
					console.log(
						"unhandled response returned from isloggedin query"
					);
					break;
			}
		}
	}, [shouldAuthDataFetch, authData, isLoggedInQuery]);

	return (
		<AuthDataContext.Provider value={{ authData, authDataDispatch }}>
			<Navigation />
		</AuthDataContext.Provider>
	);
}

export default App;
