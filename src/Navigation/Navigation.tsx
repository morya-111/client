import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Homepage, SignInpage, SignUppage, Catalogue } from "pages";

const Navigation = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/signup" exact component={SignUppage} />
				<Route path="/signin" exact component={SignInpage} />
				<Route path="/catalogue" exact component={Catalogue} />
			</Switch>
		</BrowserRouter>
	);
};

export default Navigation;
