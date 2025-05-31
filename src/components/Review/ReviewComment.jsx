import { useState } from "react";
import { formatDateToShortUS } from "../../utils";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { getFromLocalStorage } from "../../utils/localStorage";
import { useAuth } from "../../context/authContext";
import { capitalize } from "lodash";

const CommentCard = ({ comment }) => {
	const [likes, setLikes] = useState("");
	const [liked, setLiked] = useState(false);
	const { isLoggedIn } = useAuth();

	const isLiked = false;

	const handleLike = () => {
		if (liked) {
			setLikes(likes - 1);
		} else {
			setLikes(likes + 1);
		}
		setLiked(!liked);
	};

	return (
		<div className="flex gap-3 p-4 bg-white w-full hover:shadow-md transition-shadow duration-200">
			<div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-medium">
				{comment?.user?.name.charAt(0).toUpperCase() || "US"}
			</div>

			<div className="flex-1 min-w-0">
				{/* Username and date */}
				<div className="flex items-baseline gap-2 mb-1">
					<h4 className="text-sm font-semibold text-gray-900 truncate">
						{capitalize(comment?.user?.name)}
					</h4>
					<span className="text-xs text-gray-500">
						{formatDateToShortUS(comment.created_at)}
					</span>
				</div>

				{/* Comment text */}
				<p className="text-sm text-gray-700 mb-2">{comment.content}</p>

				{/* Like button */}
				<div className="flex items-center gap-4 mb-3">
					<button
						disabled={!isLoggedIn}
						className="flex items-center gap-1 text-gray-500 hover:text-indigo-500"
						onClick={handleLike}
					>
						{isLiked ? (
							<FaThumbsUp className="text-blue-500" />
						) : (
							<FaRegThumbsUp />
						)}
						<span className="text-sm">{comment?.likes.length || 0}</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default CommentCard;
