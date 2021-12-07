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
	};
};

export default useDeleteBookQuery;
