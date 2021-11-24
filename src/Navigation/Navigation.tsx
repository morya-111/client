import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Catalogue, Homepage } from "pages";

const Navigation = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/catalogue" exact component={Catalogue} />
			</Switch>
		</BrowserRouter>
	);
};

export default Navigation;
