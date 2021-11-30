import Loader from "components/Loader";
import AuthDataContext from "contexts/AuthDataContext";
import useCachedLoginStatus from "hooks/useCachedLoginStatus";
import ServerDown from "Navigation/ServerDown";
import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router";
import { AuthDataActionsTypeEnum } from "types/authTypes";
import authService from "utils/AuthService";

type props = React.ComponentPropsWithoutRef<"div">;

const LogOutButton: React.FC<props> = ({
	className = "p-4 font-semibold cursor-pointer text-light",
}) => {
	const { authDataDispatch } = useContext(AuthDataContext);
	const history = useHistory();
	const { isLoading, mutate } = useMutation(
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
		return (
			<div className="flex justify-center align-middle bg-semiLight">
				<Loader size="sm" />
			</div>
		);
	}

	return (
		<div onClick={queryFetch} className={className}>
			Logout
		</div>
	);
};

export default LogOutButton;
