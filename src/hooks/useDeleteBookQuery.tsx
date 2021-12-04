import api from "api";
import { useMutation } from "react-query";
import { useState } from "react";
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
	const [isWaitingForConfirmation, setIsWaitingForConfirmation] =
		useState(true);
	const queryFunc = (bookId: number) => {
		return api.delete(`/books/${bookId}`);
	};
	const { isSuccess, data, isError, error, status, mutate } = useMutation(
		() => {
			return queryFunc(bookId);
		},
		{
			onSuccess: () => {
				onSuccess();
			},
			onError: (err) => {
				console.log("error occurred in Delete Book Query");
				onError();
			},
		}
	);
	const resolveConfirmation = (isOk: boolean) => {
		if (!isWaitingForConfirmation) {
			if (isOk) {
				triggerDelQuery();
			} else {
				console.log("Delete Cancelled");
			}
		}
	};
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
		resolveConfirmation,
	};
};

export default useDeleteBookQuery;
