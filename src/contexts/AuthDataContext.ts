import React from "react";
import { AuthDataContextType, initialAuthData } from "types/authTypes";

const AuthDataContext = React.createContext<AuthDataContextType>({
	authData: {
		...initialAuthData,
	},
	authDataDispatch: () => {
		console.log(
			"guess u just called default authDataDispatch which does absolutely nothing"
		);
	},
});

export default AuthDataContext;
