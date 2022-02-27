import { ChatInput } from "./ChatInput/ChatInput";
import { GetChats } from "./GetChat/GetChat";
import "./WorldChat.css";
export const WorldChat = () => {
	return (
		<div>
			<h2>Welcome to World Chat</h2>
			<div className="worldChat">
				<GetChats></GetChats>
				<ChatInput></ChatInput>
			</div>
		</div>
	);
};
