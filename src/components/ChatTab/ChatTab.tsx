import React, { useEffect, useRef, useState } from "react";

import { ReactComponent as ChatIconDown } from "assets/2.0/common/chat_icon_down.svg";
import { ReactComponent as ChatIconUp } from "assets/2.0/common/upwardFinger.svg";
import ChatBox from "./ChatBox";
import useAuthData from "hooks/useAuthData";
import { UserType } from "pages/Chat/Chat";

type ChatBoxProps = {
	bookData: any;
	user: UserType;
};

const textsOfThisPage = {
	Messages: "Messages",
};

const ChatTab: React.FC<ChatBoxProps> = ({ bookData, user }) => {
	const [isChatOpen, setIsChatOpen] = useState(true); // UI
	const { id } = useAuthData();

	return (
		<div className="fixed bottom-0 right-0 z-50 mr-0.5 rounded-t-lg shadow-lg border-2 border-black border-b-0 bg-white 	">
			<div className="flex justify-between align-center min-w-[400px] rounded-t-lg ">
				<div className="flex pt-1 pl-3 font-medium text-center align-middle">
					{`${user.first_name} ${user.last_name}`}
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
			{isChatOpen ? (
				<ChatBox
					isChatOpen={isChatOpen}
					bookData={bookData}
					root={"BOOKPAGE"}
					user={user}
				></ChatBox>
			) : null}
		</div>
	);
};

export default ChatTab;
