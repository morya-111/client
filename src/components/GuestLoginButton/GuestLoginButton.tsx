import React, { useContext } from "react";
import { useMutation } from "react-query";

import authService from "utils/AuthService";
import AuthDataContext from "contexts/AuthDataContext";
import { AuthDataActionsTypeEnum } from "types/authTypes";
import Loader from "components/Loader";

import "components/SignUpForm/SignUpForm.css";

// Signs in with a fresh throwaway guest account, for trying BookEx without
// registering.
const GuestLoginButton: React.FC = () => {
	const { authDataDispatch } = useContext(AuthDataContext);

	const guestMutation = useMutation(() => authService.guestLogin(), {
		onSuccess: (data) => {
			authDataDispatch({
				payload: data.data.data.user,
				type: AuthDataActionsTypeEnum.LOGIN_SUCCESS,
			});
		},
	});

	return (
		<div className="flex flex-col items-center mt-2">
			<span className="mb-2 text-sm italic font-imFell">or</span>
			{guestMutation.isLoading ? (
				<Loader size="sm" />
			) : (
				<button
					type="button"
					className="std-btn-outline"
					onClick={() => guestMutation.mutate()}
				>
					Continue as Guest
				</button>
			)}
			{guestMutation.isError && (
				<div className="mt-2 text-sm formMsgs-fail">
					Couldn't start a guest session. Please try again.
				</div>
			)}
		</div>
	);
};

export default GuestLoginButton;
