import { useContext } from "react";
import authService from "utils/AuthService";
import AuthDataContext from "contexts/AuthDataContext";

const useAuthData = () => {
	const { authData } = useContext(AuthDataContext);

	// let avatarUrl = "https://i.ibb.co/rt9TSY7/8740db0e7e05.png";
	let avatarUrl = "NOT_LOGGED_IN";
	let first_name,
		last_name,
		email = "NOT_LOGGED_IN";

	if (authService.checkIfLoggedIn(authData)) {
		if (authData.avatarUrl) {
			avatarUrl = authData.avatarUrl;
		}
		first_name = authData.first_name;
		last_name = authData.last_name;
		email = authData.email;
	}

	return { first_name, last_name, email, avatarUrl };
};

// Usage Example -
// const isLoggedIn = useAuthData();

export default useAuthData;
