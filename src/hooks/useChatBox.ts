import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { clientSocket } from "utils/ChatSocketService";
import useAuthData from "./useAuthData";
export type ChatMessageType = {
	msg: string;
	timestamp: Date;
	fromSelf: boolean;
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

	const connectTheSocket = () => {
		console.log("connectTheSocket | useChatBox :", id);
		clientSocket.auth = { userId: id };
		clientSocket.connect();
	};

	const sendMessage = (msgBody: string) => {
		console.log("sendMessage | useChatBox :", chatWith, msgBody);
		clientSocket.emit("message:send", {
			to: chatWith === id ? 23 : 22,
			message: msgBody,
			bookId: bookId,
		});
	};

	useEffect(() => {
		const transformPayloadToMesssage = (payload: any) => {
			let result: ChatMessageType[] = [];
			payload.forEach((msg: any) => {
				result.push({
					msg: msg.message,
					timestamp: msg.createdDate,
					fromSelf: msg.sender.id === id,
				});
			});
			return result;
		};
		const onReceiveMessage = (payload: any) => {
			console.log("onReceiveMessage | useChatBox :", payload);
			console.count();
			const newMsg = transformPayloadToMesssage(payload);
			setChatArr([...chatArr, ...newMsg]);
		};
		clientSocket.on("message:receive", onReceiveMessage);

		return () => {
			clientSocket.removeAllListeners();
		};
	}, [chatArr, id]);

	return { chatArr, setChatArr, connectTheSocket, sendMessage };
};
