import api from "api";
import { io } from "socket.io-client";

export const ChatSocketService = {};

export const clientSocket = io(
	process.env.REACT_APP_BACKEND_URL || "http://localhost:4000",
	{ autoConnect: false }
);

export const getChatHistory = (
	userId: number,
	// pageParam: number,
	orderBy: string
) => {
	return api.get<any>(`/chats/${userId}`, {
		// params: { page: pageParam, order: orderBy },
		params: { pagination: false, order: orderBy },
	});
};

export const getChatUsers = () => {
	return api.get<any>("/chats/users");
};
