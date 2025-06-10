import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ChatWindow from "../components/chat/ChatWIndow";
import MessageInput from "../components/chat/MessageInput";
import ChatSidebar from "../components/chat/ChatSidebar";

const dummyChats = [
	{ id: "1", name: "Alice" },
	{ id: "2", name: "Bob" },
	{ id: "3", name: "Charlie" },
	{ id: "4", name: "Alice" },
	{ id: "5", name: "Bob" },
	{ id: "6", name: "Charlie" },
	{ id: "7", name: "Alice" },
	{ id: "8", name: "Bob" },
	{ id: "9", name: "Charlie" },
	{ id: "10", name: "Alice" },
	{ id: "11", name: "Bob" },
	{ id: "12", name: "Charlie" },
	{ id: "13", name: "Alice" },
	{ id: "14", name: "Bob" },
	{ id: "13", name: "Charlie" },
	{ id: "15", name: "Alice" },
	{ id: "16", name: "Bob" },
	{ id: "17", name: "Charlie" },
	{ id: "18", name: "Alice" },
	{ id: "19", name: "Bob" },
	{ id: "20", name: "Charlie" },
	{ id: "21", name: "Alice" },
	{ id: "22", name: "Bob" },
	{ id: "23", name: "Charlie" },
	{ id: "24", name: "Alice" },
	{ id: "25", name: "Bob" },
	{ id: "26", name: "Charlie" },
	{ id: "27", name: "Alice" },
	{ id: "28", name: "Bob" },
	{ id: "29", name: "Charlie" },
	{ id: "30", name: "Alice" },
	{ id: "31", name: "Bob" },
	{ id: "32", name: "Charlie" },
	{ id: "33", name: "Alice" },
	{ id: "34", name: "Bob" },
	{ id: "35", name: "Charlie" },
	{ id: "36", name: "Alice" },
	{ id: "37", name: "Bob" },
	{ id: "38", name: "Charlie" },
];

const Chat = () => {
	const { userId } = useParams();
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [messages, setMessages] = useState([]);

	// Find the current active chat user
	const activeUser = useMemo(
		() => dummyChats.find((chat) => chat.id === userId),
		[userId]
	);

	useEffect(() => {
		// Dummy messages reset when chat ID changes
		setMessages([
			{ text: "Hey there!", fromSelf: false },
			{ text: "Hello!", fromSelf: true },
		]);
	}, [userId]);

	const handleSend = (text) => {
		setMessages((prev) => [...prev, { text, fromSelf: true }]);
	};

	return (
		<div className="flex h-screen overflow-x-hidden">
			<ChatSidebar
				chats={dummyChats}
				isCollapsed={sidebarCollapsed}
				toggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
			/>
			<div className="flex-1 flex flex-col">
				<ChatWindow messages={messages} activeUser={activeUser} />
				<MessageInput onSend={handleSend} />
			</div>
		</div>
	);
};

export default Chat;
