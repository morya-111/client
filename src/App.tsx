import Navigation from "Navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { useReducer } from "react";
import authDataReducer from "reducers/authDataReducer";
import { initialAuthData } from "types/authTypes";

// import { Circle } from "react-preloaders";
import AuthDataContext from "contexts/AuthDataContext";

const queryClient = new QueryClient();
function App() {
	const [authData, authDataDispatch] = useReducer(
		authDataReducer,
		initialAuthData
	);

	return (
		<QueryClientProvider client={queryClient}>
			<AuthDataContext.Provider value={{ authData, authDataDispatch }}>
				<Navigation />
			</AuthDataContext.Provider>
		</QueryClientProvider>
	);
}

export default App;
