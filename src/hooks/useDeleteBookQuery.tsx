import api from "api";
import { useMutation } from "react-query";
type props = {
	bookId: number;
	onSuccess?: Function;
	onError?: Function;
};
const useDeleteBookQuery = ({
	bookId,
	onSuccess = () => {},
	onError = () => {},
}: props) => {
	const queryFunc = (bookId: number) => {
		return api.delete(`/books/${bookId}`);
	};

	const { isSuccess, data, isError, error, status, mutate, reset } =
		useMutation(
			() => {
				return queryFunc(bookId);
			},
			{
				mutationKey: "delBook",
				onSuccess: () => {
					onSuccess();
					reset();
				},
				onError: (err) => {
					console.log("error occurred in Delete Book Query");
					onError();
				},
			}
		);

	const triggerDelQuery = () => {
		mutate();
	};
	return {
		triggerDelQuery,
		isSuccess,
		data,
		isError,
		error,
		status,
		mutate,
		reset,
	};
};

export default useDeleteBookQuery;
