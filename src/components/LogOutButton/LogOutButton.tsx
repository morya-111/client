import Loader from "components/Loader";
import AuthDataContext from "contexts/AuthDataContext";
import useCachedLoginStatus from "hooks/useCachedLoginStatus";
import ServerDown from "Navigation/ServerDown";
import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router";
import { AuthDataActionsTypeEnum } from "types/authTypes";
import authService from "utils/AuthService";

const LogOutButton: React.FC = () => {
	const { authDataDispatch } = useContext(AuthDataContext);
	const history = useHistory();
	const { status, isLoading, isError, mutate } = useMutation(
		"logoutUser",
		authService.logout,
		{
			onSuccess: () => {
				authDataDispatch({
					type: AuthDataActionsTypeEnum.LOGOUT_SUCCESS,
					payload: {},
				});
				history.push("/");
			},
			onError: () => {
				console.log("Error Occured While Logging Out...");
			},
		}
	);
	const queryFetch = () => {
		mutate();
	};

	if (isLoading) {
		return <Loader />;
	}

	return <div onClick={queryFetch}>Logout</div>;
};

export default LogOutButton;
