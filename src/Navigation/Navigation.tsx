import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Catalogue, CreateBook, Homepage } from "pages";

const Navigation = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/catalogue" exact component={Catalogue} />
				<Route path="/book/create" exact component={CreateBook} />
			</Switch>
		</BrowserRouter>
	);
};

export default Navigation;
