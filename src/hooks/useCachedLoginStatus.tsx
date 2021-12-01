import { useContext } from "react";
import authService from "utils/AuthService";
import AuthDataContext from "contexts/AuthDataContext";

const useCachedLoginStatus = () => {
	const { authData } = useContext(AuthDataContext);
	if (authService.checkIfLoggedIn(authData)) {
		return true;
	}
	return false;
};

// Usage Example -
// const isLoggedIn = useCachedLoginStatus();

export default useCachedLoginStatus;
