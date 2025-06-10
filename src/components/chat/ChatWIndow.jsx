import { useRef, useEffect } from "react";

const ChatWindow = ({ messages, activeUser }) => {
	const containerRef = useRef();

	useEffect(() => {
		// Auto-scroll to bottom when messages update
		containerRef.current?.scrollTo({
			top: containerRef.current.scrollHeight,
			behavior: "smooth",
		});
	}, [messages, activeUser]);

	return (
		<div className="flex flex-col h-full w-full bg-white">
			{/* Header with user info */}
			<div className="p-4 bg-indigo-600 text-white shadow flex items-center gap-3">
				<div className="w-10 h-10 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold uppercase">
					{activeUser?.name?.slice(0, 2)}
				</div>
				<h2 className="text-lg font-semibold">{activeUser?.name}</h2>
			</div>

			{/* Chat messages */}
			<div
				ref={containerRef}
				className="flex-1 overflow-y-auto px-4 py-2 bg-gray-50 flex flex-col justify-end"
			>
				{messages.map((msg, index) => (
					<div
						key={index}
						className={`my-1 flex ${
							msg.fromSelf ? "justify-end" : "justify-start"
						}`}
					>
						<div
							className={`px-4 py-2 rounded-lg max-w-xs ${
								msg.fromSelf
									? "bg-indigo-600 text-white"
									: "bg-white text-gray-800 shadow"
							}`}
						>
							{msg.text}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatWindow;
