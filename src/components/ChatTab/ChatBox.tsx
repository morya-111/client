import { useChatBox, ChatMessageType } from "hooks/useChatBox";
import { UserType } from "pages/Chat/Chat";
import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { IoSend } from "react-icons/io5";

const ChatBox = ({
	isChatOpen,
	bookData,
	root,
	user,
}: {
	isChatOpen: Boolean;
	bookData: any;
	user: UserType;
	root: "BOOKPAGE" | "INBOX";
}) => {
	const { chatArr, connectTheSocket, disConnectTheSocket, sendMessage } =
		useChatBox(
			{
				chatWith: bookData.bookUserId,
				bookId: bookData.bookId,
			},
			root
		);
	const [inputMsg, setinputMsg] = useState("");
	const sendMsgRef = useRef<HTMLInputElement>(null);
	const chatBoxParentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log("ChatBox | Mounted");
		connectTheSocket();
		return () => {
			console.log("ChatBox | UnMounted");
			disConnectTheSocket();
		};
	}, [connectTheSocket, disConnectTheSocket]);

	useEffect(() => {
		console.log("chatBoxParentRef | useEffect | Scrolled to Bottom");
		chatBoxParentRef.current?.scrollTo(
			0,
			chatBoxParentRef.current.scrollHeight
		);
	}, [chatArr]);

	const renderChats = (chatArr: ChatMessageType[]) => {
		console.log("render chats called");
		return chatArr.map((msg: ChatMessageType, index: number) => {
			return (
				<ChatMessage
					key={index}
					msg={msg.msg}
					fromSelf={msg.fromSelf}
					date={msg.timestamp as unknown as string}
					type={msg.type}
					user={user}
					bookId={msg.bookId!}
					bookName={msg.bookName!}
				/>
			);
		});
	};
	useEffect(() => {
		document.getElementById("chatbox")?.scrollTo({ top: 10000000 });
	});

	return (
		<div>
			<div
				ref={chatBoxParentRef}
				className={`${
					isChatOpen ? "h-[400px] max-w-full" : "hidden"
				} transition flex flex-col justify-end overflow-scroll overflow-x-hidden border-t-2 border-b-2 border-black `}
				style={{ backgroundColor: "#E6E6E6" }}
			>
				<div
					className="flex flex-col px-2 my-2 overflow-auto"
					id="chatbox"
				>
					{" "}
					{renderChats(chatArr)}
				</div>
			</div>
			<form
				action="none"
				autoComplete="none"
				onSubmit={(e) => {
					e.preventDefault();
					console.log("FORM SUBMIT");
				}}
			>
				<div className="flex">
					<div style={{ flex: 90 }}>
						<input
							autoComplete="none"
							ref={sendMsgRef}
							name="msgInput"
							type="text"
							value={inputMsg}
							onChange={(e) => {
								setinputMsg(e.currentTarget.value);
							}}
							className="p-1 m-1 rounded-lg"
							style={{ width: "98%", backgroundColor: "#A8A8A8" }}
							onKeyDown={(event) => {
								// console.log(event.key, event.code);
								if (event.key === "Enter") {
									event.preventDefault();
									if (inputMsg && inputMsg.length) {
										sendMessage(inputMsg);
										setinputMsg("");
									} else {
										console.log(
											"Invalid Input Message | Cant Be Empty"
										);
									}
								}
							}}
							onSubmit={(event) => {
								event.preventDefault();
								console.log("SUBMIT");
							}}
						/>
					</div>
					<div
						onClick={() => {
							console.log("Button Kicked");
							sendMessage(inputMsg);
							setinputMsg("");
						}}
						className="flex justify-center w-20 align-middle cursor-pointer"
						style={{ flex: 10 }}
					>
						<IoSend className="self-center" size={30} />
					</div>
				</div>
			</form>
		</div>
	);
};
export default ChatBox;
