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
		<div
			className={
				isChatOpen
					? "z-50 mr-0.5 rounded-t-lg shadow-lg border-2 border-black border-b-0 bg-white h-[474px] max-w-[400px]"
					: "z-50 mr-0.5 rounded-t-lg shadow-lg border-2 border-black border-b-0 bg-white h-[40px] max-w-[400px]"
			}
		>
			<div
				className="flex justify-between align-center min-w-[400px] rounded-t-lg hover:cursor-pointer"
				onClick={() => {
					setIsChatOpen(!isChatOpen);
				}}
			>
				<div className="flex pt-1 pl-3 text-lg font-medium text-center align-middle font-imFell">
					{`${user.first_name} ${user.last_name}`}
				</div>
				<div>
					<ChatIconUp
						className={
							isChatOpen
								? "rotate-180 h-full mr-2"
								: "rotate-0 h-full mr-2"
						}
					/>
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
