import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "utils/AuthService";
import AuthDataContext from "contexts/AuthDataContext";

type ProtectedRoutePropsType = React.ComponentProps<typeof Route> & {
	redirectComponent?: React.Component;
};

const ProtectedRoute: React.FC<ProtectedRoutePropsType> = (props) => {
	const { authData } = React.useContext(AuthDataContext);

	if (!authService.checkIfLoggedIn(authData)) {
		console.log(
			"not signed in detected, redirecting to signin",
			props.path
		);
	}
	return (
		<>
			{authService.checkIfLoggedIn(authData) ? (
				<Route {...props} />
			) : (
				<Redirect to="/signin" />
			)}
		</>
	);
};

export default ProtectedRoute;
