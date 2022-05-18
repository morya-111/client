import React, { useEffect, useRef, useState } from "react";

import { ReactComponent as ChatIconDown } from "assets/2.0/common/chat_icon_down.svg";
import { ReactComponent as ChatIconUp } from "assets/2.0/common/upwardFinger.svg";
import { ChatMessageType, useChatBox } from "hooks/useChatBox";
import ChatMessage from "./ChatMessage";
import TextInput from "components/Inputs/TextInput";
import Button from "components/Buttons/Button";

type ChatBoxProps = {};

const textsOfThisPage = {
	Messages: "Messages",
};

const ChatTab: React.FC<ChatBoxProps> = () => {
	const [isChatOpen, setIsChatOpen] = useState(true); // UI

	return (
		<div className="fixed bottom-0 right-0 z-50 mr-0.5 rounded-t-lg shadow-lg border-2 border-black border-b-0 bg-white 	">
			<div className="flex justify-between align-center min-w-[400px] rounded-t-lg ">
				<div className="flex pt-1 pl-3 font-medium text-center align-middle">
					{textsOfThisPage.Messages}
				</div>
				<div
					className="hover:cursor-pointer"
					onClick={() => {
						setIsChatOpen(!isChatOpen);
					}}
				>
					{isChatOpen ? <ChatIconDown /> : <ChatIconUp />}
				</div>
			</div>
			{isChatOpen ? <ChatBox isChatOpen={isChatOpen}></ChatBox> : null}
		</div>
	);
};

const ChatBox = ({ isChatOpen }: { isChatOpen: Boolean }) => {
	const { chatArr, setChatArr } = useChatBox();
	const [inputMsg, setinputMsg] = useState("");
	const sendMsgRef = useRef<HTMLInputElement>(null);
	const chatBoxParentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		console.log("ChatBox | Mounted");

		return () => {
			console.log("ChatBox | UnMounted");
		};
	}, []);

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

export default ChatTab;
