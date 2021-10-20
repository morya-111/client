import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Homepage } from "pages";

const Navigation = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Homepage} />
			</Switch>
		</BrowserRouter>
	);
};

export default Navigation;
