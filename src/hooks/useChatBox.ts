import React, { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { io } from "socket.io-client";
import { clientSocket, getChatHistory } from "utils/ChatSocketService";
import useAuthData from "./useAuthData";
export type ChatMessageType = {
	msg: string;
	timestamp: Date;
	fromSelf: boolean;
	type: "NORMAL" | "EMBEDDED";
	bookId?: number;
};

export const useChatBox = (
	{
		chatWith,
		bookId = -1,
	}: {
		chatWith: number;
		bookId?: number;
	},
	root: "BOOKPAGE" | "INBOX"
) => {
	const { id } = useAuthData();
	const [chatArr, setChatArr] = useState<ChatMessageType[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);

	// const { data, fetchNextPage, fetchPreviousPage } = useInfiniteQuery(
	// 	"getChatHistory",
	// 	({ pageParam }) => {
	// 		const orderBy = "+createdDate";
	// 		return getChatHistory(chatWith, 0, orderBy);
	// 	},
	// 	{
	// 		refetchOnWindowFocus: false,
	// 		retry: false,
	// 		onSuccess: (data) => {
	// 			console.log("CHAT HISTORY DATA: ", data);
	// 			const history = transformPayloadToMesssage(
	// 				data.pages[0].data.data.chats
	// 			);
	// 			setChatArr([...history]);
	// 			// setLastPageIndex(data.pages[0].data.data.pagination.pages);
	// 		},
	// 		onError: (error) => {
	// 			console.log("FETCH CHAT HISTORY ERROR");
	// 		},
	// 	}
	// );
	const { data, isLoading } = useQuery(
		["getChatHistory", id, chatWith, root],
		() => {
			const orderBy = "+createdDate";
			return getChatHistory(chatWith, orderBy);
		},
		{
			refetchOnWindowFocus: true,
			retry: false,
			onSuccess: (data) => {
				console.log("CHAT HISTORY DATA: ", data);
				const history = transformPayloadToMesssage(
					data.data.data.chats
				);
				setChatArr([...history]);
				// setLastPageIndex(data.pages[0].data.data.pagination.pages);
			},
			onError: (error) => {
				console.log("FETCH CHAT HISTORY ERROR");
			},
			refetchOnMount: "always",
		}
	);

	const connectTheSocket = useCallback(() => {
		console.log("connectTheSocket | useChatBox :", id);
		clientSocket.auth = { userId: id };
		clientSocket.connect();
	}, [id]);

	const disConnectTheSocket = useCallback(() => {
		console.log("DISconnectTheSocket | useChatBox :", id);
		clientSocket.disconnect();
	}, [id]);

	const sendMessage = (msgBody: string) => {
		if (msgBody.length === 0) {
			return;
		}
		console.log("sendMessage | useChatBox :", chatWith, msgBody);
		clientSocket.emit("message:send", {
			to: chatWith,
			message: msgBody,
			bookId: bookId === -1 ? undefined : bookId,
			// bookId: 617,
		});
	};

	const transformPayloadToMesssage = useCallback(
		(payload: any) => {
			let result: ChatMessageType[] = [];
			payload.forEach((msg: any) => {
				console.log("sender returned is ", msg.sender.id, id);

				result.push({
					msg: msg.message,
					timestamp: msg.createdDate,
					fromSelf: msg.sender.id === id,
					type: msg.type,
					bookId: msg.book ? msg.book.id : null,
				});
			});
			return result;
		},
		[id]
	);

	useEffect(() => {
		const onReceiveMessage = (payload: any) => {
			console.log("onReceiveMessage | useChatBox :", payload);
			// console.count();
			const newMsg = transformPayloadToMesssage(payload);
			setChatArr([...chatArr, ...newMsg]);
		};
		clientSocket.on("message:receive", onReceiveMessage);

		return () => {
			clientSocket.removeAllListeners();
		};
	}, [chatArr, id, transformPayloadToMesssage, root]);

	return {
		chatArr,
		setChatArr,
		connectTheSocket,
		disConnectTheSocket,
		sendMessage,
		isLoading,
	};
};
