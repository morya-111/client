import React, { useEffect, useRef, useState } from "react";

import { ReactComponent as ChatIconDown } from "assets/2.0/common/chat_icon_down.svg";
import { ReactComponent as ChatIconUp } from "assets/2.0/common/upwardFinger.svg";
import ChatBox from "./ChatBox";

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

export default ChatTab;
