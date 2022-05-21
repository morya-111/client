import { useContext } from "react";
import authService from "utils/AuthService";
import { useMutation } from "react-query";
import AuthDataContext from "contexts/AuthDataContext";
import { AuthDataActionsTypeEnum } from "types/authTypes";
import Button from "components/Buttons/Button";
import Loader from "components/Loader";

const DeleteAccountBtn: React.FC = () => {
	const { authDataDispatch } = useContext(AuthDataContext);
	const delAccMutation = useMutation(
		() => {
			return authService.delAccount();
		},
		{
			onSuccess: () => {
				authDataDispatch({
					type: AuthDataActionsTypeEnum.ACC_DELETED,
					payload: {},
				});
			},
			onError: () => {
				console.log("error occurred in Delete Query");
			},
		}
	);
	const handleClick = () => {
		delAccMutation.mutate();
	};

	return (
		<div>
			<Button
				value="Delete Account"
				color="error-black"
				onClick={handleClick}
				right={
					delAccMutation.isLoading ? (
						<div className="ml-2">
							<Loader size="xs" />
						</div>
					) : null
				}
			></Button>
		</div>
	);
};

export default DeleteAccountBtn;
