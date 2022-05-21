import useAuthData from "hooks/useAuthData";
import moment from "moment";
import { UserType } from "pages/Chat/Chat";
import { useHistory } from "react-router-dom";

type ChatMessageProps = {
	msg: string;
	fromSelf?: boolean;
	date?: string;
	time?: Date;
	type: "NORMAL" | "EMBEDDED";
	user: UserType;
	bookId: number;
};

const colorsOfThisPage = {
	stdMsgBG: "#C4C4C4",
	stdMsgBG2: "#404040",
	stdChatboxBG: "#E6E6E6",
};

const ChatMessage: React.FC<ChatMessageProps> = ({
	fromSelf = false,
	msg,
	date,
	type,
	user,
	bookId,
}) => {
	const history = useHistory();

	// console.log(bookId);

	const { first_name, last_name, id } = useAuthData();

	const dateObj = new Date(date || "");
	// console.log("________", fromSelf, msg, date);
	// fromSelf &&
	// type embed
	// type normal
	// fromSelf false
	// type embed
	// type normal
	if (fromSelf && type === "NORMAL") {
		return (
			<div
				className={`flex  ${
					fromSelf ? "justify-end" : "justify-start"
				}`}
				style={{ backgroundColor: colorsOfThisPage.stdChatboxBG }}
			>
				<div>
					<div
						className={`flex p-2 w-auto max-w-xl m-1 rounded-lg rounded-br-none bg-gray-700 w-100 `}
						style={{ backgroundColor: colorsOfThisPage.stdMsgBG }}
					>
						{msg}
					</div>
					<div className="pr-2 text-xs font-thin text-right">
						{moment(dateObj).fromNow()}
					</div>
				</div>
			</div>
		);
	} else if (!fromSelf && type === "NORMAL") {
		return (
			<div
				className={`flex  ${
					fromSelf ? "justify-end" : "justify-start"
				}`}
				style={{ backgroundColor: colorsOfThisPage.stdChatboxBG }}
			>
				<div>
					<div
						className={`flex p-2 w-auto m-1 max-w-xl rounded-lg rounded-bl-none bg-gray-700 w-100 `}
						style={{ backgroundColor: colorsOfThisPage.stdMsgBG }}
					>
						{msg}
					</div>
					<div className="pl-2 text-xs font-thin">
						{moment(dateObj).fromNow()}
					</div>
				</div>
			</div>
		);
	} else if (fromSelf && type === "EMBEDDED") {
		return (
			<div
				className={`flex  ${
					fromSelf ? "justify-end" : "justify-start"
				}`}
				style={{ backgroundColor: colorsOfThisPage.stdChatboxBG }}
			>
				<div>
					<div
						className={`flex cursor-pointer p-2 w-auto m-1  max-w-xl rounded-lg rounded-br-none bg-gray-900 w-100 text-white`}
						style={{ backgroundColor: colorsOfThisPage.stdMsgBG2 }}
						onClick={() => {
							history.push({
								pathname: `/books/${bookId}`,
							});
						}}
					>
						{msg
							.replace(`<<${id}>>`, `${first_name} ${last_name}`)
							.replace(
								`<<${user.id}>>`,
								`${user.first_name} ${user.last_name}`
							)}
					</div>
					<div className="pr-2 text-xs font-thin text-right">
						{moment(dateObj).fromNow()}
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div
				className={`flex  ${
					fromSelf ? "justify-end" : "justify-start"
				}`}
				style={{ backgroundColor: colorsOfThisPage.stdChatboxBG }}
			>
				<div>
					<div
						className={`flex cursor-pointer p-2 w-auto m-1 max-w-xl rounded-lg rounded-bl-none bg-gray-900  text-white `}
						style={{ backgroundColor: colorsOfThisPage.stdMsgBG2 }}
						onClick={() => {
							history.push({
								pathname: `/books/${bookId}`,
							});
						}}
					>
						{msg
							.replace(`<<${id}>>`, `${first_name} ${last_name}`)
							.replace(
								`<<${user.id}>>`,
								`${user.first_name} ${user.last_name}`
							)}
					</div>
					<div className="pl-2 text-xs font-thin">
						{moment(dateObj).fromNow()}
					</div>
				</div>
			</div>
		);
	}
};

export default ChatMessage;
