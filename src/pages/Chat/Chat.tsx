import React from "react";
import NavigationBar from "components/NavigationBar";
import { useQuery } from "react-query";
import { getChatUsers } from "utils/ChatSocketService";
import ChatBox from "components/ChatTab/ChatBox";

type ChatProps = {};
export type UserType = {
	avatarUrl?: string;
	email: string;
	first_name: string;
	last_name: string;
	id: number;
	role?: string;
};

const defaultNullUser = {
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
					chatWithState={chatWithState}
					setChatWithState={setChatWithState}
				/>
			);
		});
	};

	return (
		<div className="flex flex-col ">
			<div>
				<NavigationBar />
			</div>
			<div className="flex flex-row self-center max-w-6xl m-5">
				<div className="border-2 border-gray-900 rounded-tl-lg rounded-bl-lg w-96">
					<div className="p-5 text-2xl border-b-2 border-gray-900">
						Messages
					</div>
					<div>{renderChatList(chatUsers)}</div>
				</div>
				<div className="w-full border-2 border-l-0 border-gray-900 rounded-tr-lg rounded-br-lg">
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
		<div className="w-full ">
			<div className="w-full border-gray-900">
				<div className="p-5 text-2xl border-b-2 border-gray-900">
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
		<div className="w-full p-5">
			<div className="p-10 text-4xl">
				Select a message to start a new chapter now...
			</div>
			{/* <div className="font-sans text-xl text-right">
				{singleQuote.text}
			</div>
			<div className="font-sans text-lg text-right">
				-{singleQuote.author}
			</div> */}
		</div>
	);
};

type ChatWithUserPropsType = {
	chatMetaData: UserType;
	setChatWithState: Function;
	chatWithState: any;
};

const ChatWithUser: React.FC<ChatWithUserPropsType> = ({
	chatMetaData,
	setChatWithState,
	chatWithState,
}) => {
	return (
		<div
			className={`flex flex-row border-b-2 ${
				chatMetaData.id === chatWithState.id ? "bg-gray-300" : ""
			} border-gray-800 cursor-pointer`}
			onClick={() => {
				setChatWithState({
					first_name: chatMetaData.first_name,
					avatarUrl: chatMetaData.avatarUrl,
					email: chatMetaData.email,
					last_name: chatMetaData.last_name,
					id: chatMetaData.id,
					role: chatMetaData.role,
				});
			}}
		>
			<img
				src={chatMetaData.avatarUrl}
				alt="P"
				className="duration-[300ms] rounded-full bg-light m-2 "
				style={{ height: "40px" }}
			/>
			<div className="flex flex-col justify-center ">
				<div>{`${chatMetaData.first_name} ${chatMetaData.last_name}`}</div>
			</div>
			<div className="flex flex-col justify-end"></div>
		</div>
	);
};

export default Chat;
