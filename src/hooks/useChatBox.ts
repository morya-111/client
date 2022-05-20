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
};

export const useChatBox = ({
	chatWith,
	bookId = -1,
}: {
	chatWith: number;
	bookId?: number;
}) => {
	const { id } = useAuthData();
	const timestamp = new Date();
	const [chatArr, setChatArr] = useState<ChatMessageType[]>([]);
	const [lastPageIndex, setLastPageIndex] = useState(8);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const { data, fetchNextPage, fetchPreviousPage } = useInfiniteQuery(
		"getChatHistory",
		({ pageParam }) => {
			const orderBy = "+createdDate";
			return getChatHistory(24, currentPage, orderBy);
		},
		{
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: (data) => {
				console.log("CHAT HISTORY DATA: ", data);
				const history = transformPayloadToMesssage(
					data.pages[0].data.data.chats
				);
				setChatArr([...history]);
				// setLastPageIndex(data.pages[0].data.data.pagination.pages);
			},
		}
	);

	const connectTheSocket = () => {
		console.log("connectTheSocket | useChatBox :", id);
		clientSocket.auth = { userId: id };
		clientSocket.connect();
	};
	const disConnectTheSocket = () => {
		console.log("DISconnectTheSocket | useChatBox :");
		clientSocket.disconnect();
	};

	const sendMessage = (msgBody: string) => {
		console.log("sendMessage | useChatBox :", chatWith, msgBody);
		clientSocket.emit("message:send", {
			to: chatWith === id ? 24 : 22,
			message: msgBody,
			bookId: bookId,
		});
	};

	const transformPayloadToMesssage = useCallback(
		(payload: any) => {
			let result: ChatMessageType[] = [];
			payload.forEach((msg: any) => {
				result.push({
					msg: msg.message,
					timestamp: msg.createdDate,
					fromSelf: msg.sender.id === id,
					type: msg.type,
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
	}, [chatArr, id, transformPayloadToMesssage]);

	return {
		chatArr,
		setChatArr,
		connectTheSocket,
		disConnectTheSocket,
		sendMessage,
	};
};
