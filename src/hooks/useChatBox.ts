import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import {
	getChatHistory,
	openChatChannel,
	sendChatMessage,
} from "utils/ChatSocketService";
import { RealtimeChannel } from "utils/RealtimeChannel";
import useAuthData from "./useAuthData";
export type ChatMessageType = {
	msg: string;
	timestamp: Date;
	fromSelf: boolean;
	type: "NORMAL" | "EMBEDDED";
	bookId?: number;
	bookName?: string;
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
	const { isLoading } = useQuery(
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

	const channelRef = useRef<RealtimeChannel | null>(null);
	// identifies the latest connect call, so a late-resolving one is dropped
	const connectToken = useRef<object | null>(null);
	const [channel, setChannel] = useState<RealtimeChannel | null>(null);

	const connectTheSocket = useCallback(() => {
		console.log("connectTheSocket | useChatBox :", id);
		const token = {};
		connectToken.current = token;
		openChatChannel()
			.then((ch) => {
				if (connectToken.current !== token) return ch.disconnect();
				channelRef.current = ch;
				setChannel(ch);
			})
			.catch((err) => console.log("CHAT CHANNEL ERROR", err));
	}, [id]);

	const disConnectTheSocket = useCallback(() => {
		console.log("DISconnectTheSocket | useChatBox :", id);
		connectToken.current = null;
		channelRef.current?.disconnect();
		channelRef.current = null;
		setChannel(null);
	}, [id]);

	const appendMessages = useCallback(
		(payload: any[]) => {
			// the user's topic carries every conversation; keep this one
			const relevant = payload.filter(
				(msg: any) => msg.sender.id === chatWith || msg.sender.id === id
			);
			if (relevant.length === 0) return;
			setChatArr((prev) => [
				...prev,
				...transformPayloadToMesssage(relevant),
			]);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[chatWith, id]
	);

	const sendMessage = (msgBody: string) => {
		if (msgBody.length === 0) {
			return;
		}
		console.log("sendMessage | useChatBox :", chatWith, msgBody);
		sendChatMessage({
			to: chatWith,
			message: msgBody,
			bookId: bookId === -1 ? undefined : bookId,
		})
			.then((res) => {
				// Show our own message from the response (Realtime echo to
				// the sender is skipped to avoid duplicates).
				appendMessages(res.data.data.chats);
			})
			.catch((err) => console.log("SEND MESSAGE ERROR", err));
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
					bookName: msg.book ? msg.book.name : null,
				});
			});
			return result;
		},
		[id]
	);

	useEffect(() => {
		if (!channel) return;
		const onReceiveMessage = (payload: { data: any[] }) => {
			console.log("onReceiveMessage | useChatBox :", payload);
			// our own sends are appended from the HTTP response
			appendMessages(payload.data.filter((msg) => msg.sender.id !== id));
		};
		channel.on("message:receive", onReceiveMessage);

		return () => {
			channel.off("message:receive", onReceiveMessage);
		};
	}, [channel, id, appendMessages]);

	return {
		chatArr,
		setChatArr,
		connectTheSocket,
		disConnectTheSocket,
		sendMessage,
		isLoading,
	};
};
