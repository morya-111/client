import api from "api";
import { RealtimeChannel } from "./RealtimeChannel";

export const ChatSocketService = {};

type ChannelInfo = {
	topic: string;
	supabaseUrl: string;
	supabaseAnonKey: string;
};

// Opens a Realtime subscription to the logged-in user's private chat topic.
export const openChatChannel = async () => {
	const res = await api.get<{ data: ChannelInfo }>("/chats/channel");
	const { topic, supabaseUrl, supabaseAnonKey } = res.data.data;
	const channel = new RealtimeChannel(supabaseUrl, supabaseAnonKey, topic);
	channel.connect();
	return channel;
};

export const sendChatMessage = (payload: {
	to: number;
	message: string;
	bookId?: number;
}) => {
	return api.post<any>("/chats/send", payload);
};

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
