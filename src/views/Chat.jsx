import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MessageInput from "../components/chat/MessageInput";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWIndow";
import { getFromLocalStorage } from "../utils/localStorage";
import { appConfig } from "../config";

const Chat = () => {
	const { userId: recipientId } = useParams();
	const [messages, setMessages] = useState([]);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const socketRef = useRef(null);

	const token = getFromLocalStorage("access_token");

	useEffect(() => {
		if (!token) return;

		const socket = new WebSocket(`${appConfig.WEBSOCKET_BASE_URL}/chat?token=${token}`);
		socketRef.current = socket;

		socket.onopen = () => console.log("Connected to WebSocket");

		socket.onmessage = (event) => {
			setMessages((prev) => [...prev, { text: event.data, fromSelf: false }]);
		};
		socket.onclose = () => console.log("WebSocket disconnected");
		return () => {
			socket.close();
		};
	}, [token]);

	const handleSend = (text) => {
		setMessages((prev) => [...prev, { text, fromSelf: true }]);
		socketRef.current?.send(
			JSON.stringify({
				to: recipientId,
				message: text,
			})
		);
	};

	return (
		<div className="flex h-screen overflow-hidden">
			<ChatSidebar
				isCollapsed={sidebarCollapsed}
				toggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
			/>
			<div className="flex-1 flex flex-col">
				<ChatWindow messages={messages} />
				<MessageInput onSend={handleSend} />
			</div>
		</div>
	);
};

export default Chat;
