import api from "api";
import { io } from "socket.io-client";

export const ChatSocketService = {};

export const clientSocket = io("http://localhost:4000", { autoConnect: false });

export const getChatHistory = (userId: number, pageParam: number) => {
	return api.get<any>(`/chats/${userId}`, {
		params: { page: pageParam },
	});
};
