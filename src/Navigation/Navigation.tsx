import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import {
	Homepage,
	SignInpage,
	SignUppage,
	Catalogue,
	BookDisplay,
	CreateBook,
} from "pages";
import AuthDataContext from "contexts/AuthDataContext";
import axiosClient from "utils/axiosClient";
import { IsLoggedInResType } from "types/resTypes";
import { useQuery } from "react-query";
import { AuthDataActionsTypeEnum } from "types/authTypes";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";
import ServerDown from "./ServerDown";

import Loader from "components/Loader";

const Navigation = () => {
	const { authDataDispatch } = React.useContext(AuthDataContext);
	// const [isServerDown, setIsServerDown] = React.useState(false);
	const fetchIfLoggedIn = () =>
		axiosClient.get<IsLoggedInResType>("/user/isloggedin");

	const { isLoading, error, isError } = useQuery(
		"isLoggedIn",
		fetchIfLoggedIn,
		{
			retry: false,
			refetchOnWindowFocus: false,
			onSuccess: (data) => {
				authDataDispatch({
					type: AuthDataActionsTypeEnum.ALREADY_LOGGED_IN,
					payload: data.data.data.user,
				});
			},
			onError: (error: any) => {
				// NOTE: keeping this logic here for future reference
				// if (error.message === "Network Error") {
				// 	setIsServerDown(true);
				// }
			},
		}
	);

	if (isLoading) {
		return (
			<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
				<Loader />
			</div>
		);
	}

	if (isError) {
		if (error.message === "Network Error") return <ServerDown />;
	}

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/signup" exact component={SignUppage} />
				<Route path="/signin" exact component={SignInpage} />
				<Route path="/catalogue" exact component={Catalogue} />

				<ProtectedRoute
					path="/book/create"
					exact
					component={CreateBook}
				/>

				<Route path="/books/:id" exact component={BookDisplay} />
				<ProtectedRoute
					path="/protroute"
					component={ProtectedComponent}
				/>
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter>
	);
};

// TODO: move this or delete this ... this is temporary
const ProtectedComponent: React.FC = () => {
	return (
		<div>
			THIS COMPONENT IS PROTECTED, IF YOU ARE SEEING THIS, YOU ARE LOGGED
			IN. ENJOYY !!!
		</div>
	);
};

export default Navigation;
