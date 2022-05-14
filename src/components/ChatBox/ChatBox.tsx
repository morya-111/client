import React, { useState } from "react";

import { ReactComponent as ChatIconDown } from "assets/2.0/common/chat_icon_down.svg";
import { ReactComponent as ChatIconUp } from "assets/2.0/common/upwardFinger.svg";

type ChatBoxProps = {};

const textsOfThisPage = {
	Messages: "Messages",
};

const colorsOfThisPage = {
	stdMsgBG: "#C4C4C4",
	stdChatboxBG: "#E6E6E6",
};

const useChatBox = () => {};

const ChatBox: React.FC<ChatBoxProps> = ({}) => {
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
			<div
				className={`${
					isChatOpen ? "h-[500px] bg-gray-400" : "hidden"
				} transition flex flex-col flex-col overflow-scroll`}
			>
				<ChatMessage
					msg="hey there aisijdaisd asdjaijsdn aosdoasd oasdokasdsjndajsnidjna asjanijdnsaijnda oamksdm okmaosd okmoskdma okmoakmsd okmokamsodk okmokamsod okmaosdm "
					self
					date="14/05/2022"
				></ChatMessage>
				<ChatMessage msg="hey there" date="14/05/2022" self />
				<ChatMessage msg="hey there" date="14/05/2022" self />
				<ChatMessage msg="hey there" date="14/05/2022" />
				<ChatMessage msg="hey there" date="14/05/2022" self />
				<ChatMessage msg="hey there" date="14/05/2022" self />
				<ChatMessage msg="hey there" date="14/05/2022" />
				<ChatMessage msg="hey there" date="14/05/2022" self />
				<ChatMessage msg="hey there" date="14/05/2022" self />
				<ChatMessage date="14/05/2022" msg="hey there" />
				<ChatMessage msg="hey jjnsd" date="14/05/2022" self />
			</div>
		</div>
	);
};

type ChatMessageProps = {
	msg: string;
	self?: boolean;
	date?: string;
	time?: string;
};
const ChatMessage: React.FC<ChatMessageProps> = ({
	self = false,
	msg,
	date,
}) => {
	return (
		<div
			className={`flex  ${self ? "justify-end" : "justify-start"}`}
			style={{ backgroundColor: colorsOfThisPage.stdChatboxBG }}
		>
			<div>
				<div
					className={`flex p-2 w-80 m-1 rounded-lg rounded-br-none bg-gray-700 w-100 `}
					style={{ backgroundColor: colorsOfThisPage.stdMsgBG }}
				>
					{msg}
				</div>
				<div className="text-xs font-thin">{date}</div>
			</div>
		</div>
	);
};

export default ChatBox;
