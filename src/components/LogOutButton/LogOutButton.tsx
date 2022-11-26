import Loader from "components/Loader";
import AuthDataContext from "contexts/AuthDataContext";

import { useContext } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { AuthDataActionsTypeEnum } from "types/authTypes";
import authService from "utils/AuthService";

type props = React.ComponentPropsWithoutRef<"div"> & {
	extraCleanUp?: Function;
};

const LogOutButton: React.FC<props> = ({ extraCleanUp = () => {} }) => {
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
		// NOTE: for now this has been kept here
		extraCleanUp();
	};

	if (isLoading) {
		return (
			<div className="flex justify-center mt-5 mb-4 align-middle bg-semiLight">
				<Loader size="sm" />
			</div>
		);
	}

	return (
		<div
			onClick={queryFetch}
			className="font-semibold text-white cursor-pointer "
		>
			Logout
		</div>
	);
};

export default LogOutButton;
