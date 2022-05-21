import React, { useState } from "react";

import { ReactComponent as ChatIconDown } from "assets/2.0/common/chat_icon_down.svg";
import { ReactComponent as ChatIconUp } from "assets/2.0/common/upwardFinger.svg";
import ChatBox from "./ChatBox";
import { defaultNullUser, RecipientList } from "pages/Chat/Chat";
import { UserType } from "pages/Chat/Chat";
import { IoReturnDownBackSharp } from "react-icons/all"

type ChatBoxProps = {
	bookData: any;
	user: UserType;
};

const ChatTab: React.FC<ChatBoxProps> = ({ bookData, user }) => {
	const [isChatOpen, setIsChatOpen] = useState(false); // UI
	const [showAllUsers, setShowAllUsers] = useState(false);
	const [backClicked, setBackClicked] = useState(false);
	const [activeRecipient, setActiveRecipient] = React.useState<UserType>({...defaultNullUser});

	return (
		<div
			className={
				isChatOpen
					? "z-50 mr-0.5 rounded-t-lg shadow-lg border-2 border-black border-b-0 bg-white h-[486px] max-w-[400px]"
					: "z-50 mr-0.5 rounded-t-lg shadow-lg border-2 border-black border-b-0 bg-white h-[40px] max-w-[400px]"
			}
		>
			<div
				className="flex justify-between align-center min-w-[400px] rounded-t-lg hover:cursor-pointer border-b-2 border-gray-900"

			>
			
					<div className="hover:cursor-pointer"
						onClick={() => {setShowAllUsers(!showAllUsers); setBackClicked(true)}}
					>
						<IoReturnDownBackSharp className="ml-2" size={ isChatOpen && !showAllUsers   ? 30 : -10} />
					</div>
	<div className="flex justify-between items-center ml-2 w-full" onClick={() => {
					setIsChatOpen(!isChatOpen);
				}}>
					<div className="flex pt-1 pl-3 text-lg font-medium text-center align-middle font-imFell" >
						{showAllUsers ? "Messaging":`${activeRecipient.first_name ? activeRecipient.first_name:user.first_name} ${activeRecipient.last_name ? activeRecipient.last_name : user.last_name}`}
					</div><div>
					<ChatIconUp
						className={
							isChatOpen
								? "rotate-180 h-full mr-2 "
								: "rotate-0 h-full mr-2 "
						}
					/>
				</div>
				</div>

				
			</div>
			{isChatOpen && (showAllUsers ? (
				<div><div onClick={()=>{setShowAllUsers(false)}}><UserListWrapper setActiveRecipient={setActiveRecipient}/></div></div>
			) : <ChatBox
				isChatOpen={isChatOpen}
				bookData={bookData}
				root={"BOOKPAGE"}
				user={backClicked ? activeRecipient : user}
			></ChatBox>)}
		</div>
	);
};

const UserListWrapper = ({setActiveRecipient}:{setActiveRecipient: Function})=> {
	return <div><RecipientList setActiveRecipient={setActiveRecipient}/></div>
}

export default ChatTab;
