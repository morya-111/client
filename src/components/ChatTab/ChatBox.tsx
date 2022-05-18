import Button from "components/Buttons/Button";
import { useChatBox, ChatMessageType } from "hooks/useChatBox";
import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

const ChatBox = ({ isChatOpen }: { isChatOpen: Boolean }) => {
	const { chatArr, setChatArr, connectTheSocket } = useChatBox();
	const [inputMsg, setinputMsg] = useState("");
	const sendMsgRef = useRef<HTMLInputElement>(null);
	const chatBoxParentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log("ChatBox | Mounted");
		connectTheSocket();
		return () => {
			console.log("ChatBox | UnMounted");
		};
	}, [connectTheSocket]);

	useEffect(() => {
		console.log("chatBoxParentRef | useEffect | Scrolled to Bottom");

		chatBoxParentRef.current?.scrollTo(
			0,
			chatBoxParentRef.current.scrollHeight
		);
	});

	const renderChats = (chatArr: ChatMessageType[]) => {
		return chatArr.map((msg: ChatMessageType) => {
			return (
				<ChatMessage
					msg={msg.msg}
					fromSelf={msg.fromSelf}
					date={msg.timestamp}
				/>
			);
		});
	};

	return (
		<div>
			<div
				ref={chatBoxParentRef}
				className={`${
					isChatOpen ? "h-[500px] bg-gray-400" : "hidden"
				} transition flex flex-col overflow-scroll overflow-x-hidden`}
			>
				{renderChats(chatArr)}
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
					<input
						autoComplete="none"
						ref={sendMsgRef}
						name="msgInput"
						type="text"
						value={inputMsg}
						onChange={(e) => {
							setinputMsg(e.currentTarget.value);
						}}
						className="p-1 m-1 w-80"
						onKeyDown={(event) => {
							console.log(event.key, event.code);
							if (event.key === "Enter") {
								event.preventDefault();
								if (inputMsg && inputMsg.length) {
									setChatArr([
										...chatArr,
										{
											msg: inputMsg,
											timestamp: new Date(),
											fromSelf: true,
										},
									]);
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
					<Button
						value={"Send"}
						onClick={() => {
							console.log("Button Kicked");
							setChatArr([
								...chatArr,
								{
									msg: sendMsgRef.current?.value || "",
									timestamp: new Date(),
									fromSelf: true,
								},
							]);
						}}
					/>
				</div>
			</form>
		</div>
	);
};
export default ChatBox;
