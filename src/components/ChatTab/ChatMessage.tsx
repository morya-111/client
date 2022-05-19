type ChatMessageProps = {
	msg: string;
	fromSelf?: boolean;
	date?: Date;
	time?: Date;
};

const colorsOfThisPage = {
	stdMsgBG: "#C4C4C4",
	stdChatboxBG: "#E6E6E6",
};

const ChatMessage: React.FC<ChatMessageProps> = ({
	fromSelf = false,
	msg,
	date,
}) => {
	// console.log("________", fromSelf, msg, date);

	return (
		<div
			className={`flex  ${fromSelf ? "justify-end" : "justify-start"}`}
			style={{ backgroundColor: colorsOfThisPage.stdChatboxBG }}
		>
			<div>
				<div
					className={`flex p-2 w-80 m-1 rounded-lg rounded-br-none bg-gray-700 w-100 `}
					style={{ backgroundColor: colorsOfThisPage.stdMsgBG }}
				>
					{msg}
				</div>
				<div className="text-xs font-thin">{JSON.stringify(date)}</div>
			</div>
		</div>
	);
};

export default ChatMessage;
