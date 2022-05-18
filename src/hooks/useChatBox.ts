import React, { useState } from "react";
import { io } from "socket.io-client";
import { clientSocket } from "utils/ChatSocketService";
import useAuthData from "./useAuthData";
export type ChatMessageType = {
	msg: string;
	timestamp: Date;
	fromSelf: boolean;
};

export const useChatBox = () => {
	const { id } = useAuthData();
	const timestamp = new Date();

	const connectTheSocket = () => {
		console.log("connectTheSocket | useChatBox :", id);
		clientSocket.auth = { userId: id };
		clientSocket.connect();
	};

	const [chatArr, setChatArr] = useState<ChatMessageType[]>([
		{ msg: "Hey There 0", timestamp: timestamp, fromSelf: true },
		{ msg: "Hey There 5", timestamp: timestamp, fromSelf: false },
		{ msg: "Hey There6", timestamp: timestamp, fromSelf: true },
		{ msg: "Heasdasdy There", timestamp: timestamp, fromSelf: true },
		{ msg: "Hey There", timestamp: timestamp, fromSelf: false },
		{ msg: "Hey There", timestamp: timestamp, fromSelf: true },
		{ msg: "Hey There", timestamp: timestamp, fromSelf: false },
		{ msg: "Hey Theradsasde", timestamp: timestamp, fromSelf: true },
		{ msg: "Hey There", timestamp: timestamp, fromSelf: false },
		{ msg: "Hey There", timestamp: timestamp, fromSelf: false },
		{ msg: "Hey Therasdasde", timestamp: timestamp, fromSelf: true },
	]);

	return { chatArr, setChatArr, connectTheSocket };
};
