import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Homepage, SignInpage, SignUppage } from "pages";
import axiosClient from "utils/axiosClient";

const Navigation = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/signup" exact component={SignUppage} />
				<Route path="/signin" exact component={SignInpage} />
			</Switch>
			<div
				className="bg-red-500"
				onClick={() => {
					try {
						axiosClient.get("loginprotected/", {
							withCredentials: true,
						});
					} catch (error) {}
				}}
			>
				Access Protected Route
			</div>
		</BrowserRouter>
	);
};

export default Navigation;
