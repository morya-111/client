import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Catalogue, Homepage, BookDisplay } from "pages";

const Navigation = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/catalogue" exact component={Catalogue} />
				<Route path="/books/:id" exact component={BookDisplay} />
			</Switch>
		</BrowserRouter>
	);
};

export default Navigation;
