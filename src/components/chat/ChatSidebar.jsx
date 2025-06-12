import {
	FiChevronLeft,
	FiChevronRight,
	FiLogOut,
} from "react-icons/fi";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";

const ChatSidebar = ({ chats, isCollapsed, toggleSidebar }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id: activeChatId } = useParams();

	const handleExit = () => {
		const fallback = "/";
		const previousPage = location.state?.from || fallback;
		navigate(previousPage);
	};

	return (
		<div
			className={`bg-white shadow-md h-full transition-all duration-300 flex flex-col ${
				isCollapsed ? "w-16" : "w-64"
			}`}
		>
			<div className="flex items-center justify-between p-4 border-b">
				{!isCollapsed && <h2 className="font-semibold text-lg">Chats</h2>}
				<div className="flex gap-2 items-center">
					<button
						onClick={toggleSidebar}
						className="p-1 hover:bg-gray-100 rounded-full transition"
						title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
					>
						{isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
					</button>
				</div>
			</div>

			{/* <ul className={`flex-1 overflow-y-auto ${isCollapsed ? "hidden" : ""}`}>
				{chats.map((chat) => {
					const isActive = chat.id === activeChatId;
					return (
						<Link
							key={chat.id}
							to={`/chat/${chat.id}`}
							className={`flex items-center gap-3 p-4 border-b hover:bg-indigo-50 transition ${
								isActive ? "bg-indigo-100 font-semibold" : ""
							}`}
						>
							<span className={`${isCollapsed ? "hidden" : "block"}`}>
								{chat.name}
							</span>
						</Link>
					);
				})}
			</ul> */}

			<div className="p-4 border-t mt-auto">
				<button
					onClick={handleExit}
					className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
					title="Exit Chat"
				>
					<span className="text-xl">
						<FiLogOut />
					</span>
					{!isCollapsed && <span>Exit</span>}
				</button>
			</div>
		</div>
	);
};

export default ChatSidebar;
