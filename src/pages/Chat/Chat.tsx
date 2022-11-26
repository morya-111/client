import React from "react";
import NavigationBar from "components/NavigationBar";
import { useQuery } from "react-query";
import { getChatUsers } from "utils/ChatSocketService";
import ChatBox from "components/ChatTab/ChatBox";
import Loader from "components/Loader"

type ChatProps = {};
export type UserType = {
	avatarUrl?: string;
	email: string;
	first_name: string;
	last_name: string;
	id: number;
	role?: string;
};

export const defaultNullUser = {
	first_name: "",
	avatarUrl: "",
	email: "",
	last_name: "",
	id: -1,
	role: "",
};

const Chat: React.FC<ChatProps> = ({}) => {
	const [chatUsers, setchatUsers] = React.useState<UserType[]>([
		{ ...defaultNullUser },
	]);
	const chatsQuery = useQuery(
		"getChatUsers",
		() => {
			return getChatUsers();
		},
		{
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: (data) => {
				console.log("CHAT USERS", data);
				setchatUsers([...data.data.data.users]);
			},
		}
	);

	const [chatWithState, setChatWithState] = React.useState({
		...defaultNullUser,
	});
	

	const renderChatList = (chatUsers: any) => {
		return chatUsers.map((user: any, index: number) => {
			return (
				<ChatWithUser
					key={index}
					chatMetaData={user}
					// chatWithState={chatWithState}
					activeChatSelector={setChatWithState}
				/>
			);
		});
	};

	return (
		<div className="flex flex-col h-screen bg-bgGrey45">
			<div>
				<NavigationBar />
			</div>
			<div className="flex flex-row self-center max-w-6xl max-h-full m-5 bg-white rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-xl min-w-max">
				<div className="border-2 border-gray-900 rounded-tl-lg rounded-bl-lg bg-bgGrey32 w-96">
					<div className="p-5 text-2xl bg-white border-b-2 border-gray-900 rounded-tl-lg font-imFell">
						Messages
					</div>
					<div>{renderChatList(chatUsers)}</div>
				</div>
				<div className="w-full bg-white border-2 border-l-0 border-gray-900 rounded-tr-lg rounded-br-lg">
					{chatWithState.first_name ? (
						<ChatBoxWrapper chatMetaData={chatWithState} />
					) : (
						<SelectAMessage />
					)}
				</div>
			</div>
		</div>
	);
};
const ChatBoxWrapper = ({ chatMetaData }: { chatMetaData: UserType }) => {
	return (
		<div className="w-full bg-white rounded-tr-lg">
			<div className="w-full border-gray-900 rounded-tr-lg border-b-0">
				<div className="p-5 text-2xl border-gray-900 rounded-tr-lg border-b-2 font-imFell">
					{chatMetaData.first_name} {chatMetaData.last_name}
				</div>
			</div>
			<div className="w-full border-gray-900 rounded-tr-lg rounded-br-lg">
				<ChatBox
					root="INBOX"
					bookData={{ bookUserId: chatMetaData.id }}
					isChatOpen={true}
					user={chatMetaData}
				/>
			</div>
		</div>
	);
};

const SelectAMessage = () => {
	return (
		<div className="w-full p-5 mt-10">
			<div className="p-10 text-4xl font-imFell">
				Select a message to start a <br /> new chapter now...
			</div>
			<div
				style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
				className="flex justify-end w-full pr-4 text-2xl italic text-center font-imFell mb-60"
			>
				“Reading is a conversation
				<br />
				All books talk.
				<br />
				But a good book listens as well”
			</div>
		</div>
	);
};





type RecipientList ={
	setActiveRecipient: Function
}

export const RecipientList: React.FC<RecipientList> = ({setActiveRecipient})=>{

	const {data, isLoading} = useQuery(
		"getRecipientList",
		() => {
			return getChatUsers();
		},
		{
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: (data) => {
				console.log("CHAT USERS", data);
				// setchatUsers([...data.data.data.users]);
			},
		}
	);
	
	if(isLoading) {
		return <div><Loader/></div>
	}

	return data?.data.data.users.map((user: any, index: number)=>{
		return (<ChatWithUser
		key={index}
		chatMetaData={user}
		activeChatSelector={setActiveRecipient}
	/>)
	})
}

type ChatWithUserPropsType = {
	chatMetaData: UserType;
	activeChatSelector?: Function
};
// userful
const ChatWithUser: React.FC<ChatWithUserPropsType> = ({
	chatMetaData,
	// chatWithState, // ONLY FOR HIGHLIGHTING
	activeChatSelector,
}) => {
	return (
		<div
			className={`flex flex-row border-b-2 bg-bgGrey100 ${
				true ? "bg-gray-300" : ""
			} border-gray-800 cursor-pointer`}
			onClick={() => {
				// console.log("chatwithuser : onclick", chatMetaData);
				activeChatSelector!({
					first_name: chatMetaData.first_name,
					avatarUrl: chatMetaData.avatarUrl,
					email: chatMetaData.email,
					last_name: chatMetaData.last_name,
					id: chatMetaData.id,
					role: chatMetaData.role,
				})
			}}
		>
			<img
				src={chatMetaData.avatarUrl}
				className="duration-[300ms] rounded-full bg-light m-2 "
				style={{ height: "40px" }}
			/>
			<div className="flex flex-col justify-center font-imFell">
				<div>{`${chatMetaData.first_name} ${chatMetaData.last_name}`}</div>
			</div>
			<div className="flex flex-col justify-end"></div>
		</div>
	);
};


export default Chat;
