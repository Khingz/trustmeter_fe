import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MessageInput from "../components/chat/MessageInput";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWIndow";
import { useWebSocket } from "../context/websocketContext";

const Chat = () => {
	const { userId: recipientId } = useParams();
	const [messages, setMessages] = useState([]);
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const socket = useWebSocket();
	const isSocketOpen = useRef(false);

	// Monitor socket open state
	useEffect(() => {
		if (!socket) return;

		const handleOpen = () => {
			console.log("✅ Socket connected");
			isSocketOpen.current = true;
		};

		const handleMessage = (event) => {
			console.log("📩 Incoming:", event.data);
			setMessages((prev) => [...prev, { text: event.data, fromSelf: false }]);
		};

		const handleClose = () => {
			console.log("❌ Socket closed");
			isSocketOpen.current = false;
		};

		const handleError = (e) => {
			console.error("Socket error:", e);
			isSocketOpen.current = false;
		};

		// Use safe assignment methods
		socket.onopen = handleOpen;
		socket.onmessage = handleMessage;
		socket.onclose = handleClose;
		socket.onerror = handleError;

		return () => {
			socket.onmessage = null;
			socket.onopen = null;
			socket.onclose = null;
			socket.onerror = null;
		};
	}, [socket]);

	const handleSend = (text) => {
		setMessages((prev) => [...prev, { text, fromSelf: true }]);

		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(
				JSON.stringify({
					to: recipientId,
					message: text,
				})
			);
			console.log("📤 Sent:", text);
		} else {
			console.warn("⚠️ Socket is not open. Current state:", socket?.readyState);
		}
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
