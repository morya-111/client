import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Catalogue, Homepage } from "pages";
import BookDisplay from "pages/BookDisplay";

const Navigation = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/catalogue" exact component={Catalogue} />
				<Route path="/bookDisplay" exact component={BookDisplay} />
			</Switch>
		</BrowserRouter>
	);
};

export default Navigation;
