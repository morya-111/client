import React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Homepage, Authpage } from "pages";

const Navigation = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/auth" exact component={Authpage} />
			</Switch>
		</BrowserRouter>
	);
};

export default Navigation;
