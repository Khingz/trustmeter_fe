import { useState } from "react";
import { FiSend } from "react-icons/fi";

const MessageInput = ({ onSend }) => {
	const [message, setMessage] = useState("");

	const handleSend = () => {
		if (message.trim()) {
			onSend(message.trim());
			setMessage("");
		}
	};

	return (
		<div className="flex items-center p-4 bg-white border-t">
			<input
				type="text"
				placeholder="Type a message"
				className="flex-1 px-4 py-2 border rounded-full focus:outline-none mr-2"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && handleSend()}
			/>
			<button
				onClick={handleSend}
				className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
			>
				<FiSend />
			</button>
		</div>
	);
};

export default MessageInput;
