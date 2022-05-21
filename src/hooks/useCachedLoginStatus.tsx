import { useContext } from "react";
import authService from "utils/AuthService";
import AuthDataContext from "contexts/AuthDataContext";

/**
 * Returns a boolean indicating if the user is authenticated or not.
 * doesn't check deeply, just checks the `AuthDataContext`.
 * @returns {Boolean}
 * exap
 */
const useCachedLoginStatus = (): Boolean => {
	const { authData } = useContext(AuthDataContext);
	if (authService.checkIfLoggedIn(authData)) {
		return true;
	}
	return false;
};

export default useCachedLoginStatus;
