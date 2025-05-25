import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import {
	formatDateToShortUS,
	removeLike,
	updateLikeInReview,
} from "../../utils";
import DefaultImage from "../../assets/images/defaultImage.png";
import { getFromLocalStorage } from "../../utils/localStorage";
import DetailedReview from "./DetailedReview";
import { FaThumbsUp, FaRegThumbsUp, FaComment } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import ReviewService from "../../service/reviewService";

const ReviewCard = ({ review }) => {
	const user_id = getFromLocalStorage("currentUser")?.id;
	const [detailReviewModolOpen, setDetailReviewModolOpen] = useState(false);
	const [localReview, setLocalReview] = useState(review);
	const { isLoggedIn } = useAuth();

	const isLiked = localReview.likes.some((like) => like.user_id === user_id);

	const handleReadMore = () => {
		setDetailReviewModolOpen(!detailReviewModolOpen);
	};

	const handleLike = async () => {
		const tempLike = {
			id: "pending",
			user_id,
			review_id: review.id,
		};
		updateLikeInReview({
			setReviews: setLocalReview,
			userId: user_id,
			newLike: tempLike,
			liked: isLiked,
		});
		try {
			const response = await ReviewService.toggleReviewLike(review.id);
			if (response.error) {
				console.error("Error liking the review:", response.message);
				removeLike({ setReviews: setLocalReview, userId: user_id });
				return;
			}
			updateLikeInReview({
				setReviews: setLocalReview,
				userId: user_id,
				newLike: response.data,
				liked: isLiked,
			});
		} catch (error) {
			removeLike({ setReviews: setLocalReview, userId: user_id });
			console.error("Error liking the review:", error);
		}
	};

	useEffect(() => {
		setLocalReview(review);
	}, [review]);

	return (
		<div className="bg-white border border-gray-200 rounded-sm overflow-hidden p-4 flex flex-col justify-between">
			<div className="flex items-center space-x-4 mb-4">
				<div className="w-14 h-14 rounded-full flex justify-center items-center bg-gray-400 text-white font-bold text-xl">
					<p>{localReview?.user?.name.slice(0, 2).toUpperCase()}</p>
				</div>
				<div>
					<h3 className="text-lg font-semibold capitalize">
						{localReview?.user?.name}
						{user_id === localReview?.user_id && (
							<span className="ml-2 text-gray-400 text-sm italic font-light">
								(You)
							</span>
						)}
					</h3>
					<p className="text-sm text-gray-500">
						{formatDateToShortUS(localReview?.created_at)}
					</p>
				</div>
			</div>

			<p className="text-gray-700 mb-4">
				"{localReview?.comment.slice(0, 100)}..."
			</p>

			<StarRating rating={localReview?.rating} />
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
					<span className="text-sm">{localReview.likes.length || 0}</span>
				</button>

				<span className="flex items-center gap-1 text-gray-500 hover:text-indigo-500">
					<FaComment />
					<span className="text-sm">{localReview.comments.length || 0}</span>
				</span>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex justify-start items-center gap-2">
					<img
						src={localReview?.listings?.image || DefaultImage}
						alt="Company Logo"
						className="h-8 w-8 rounded-full object-contain"
					/>
					<p className="capitalize">{localReview?.listings?.name}</p>
				</div>

				<button
					className="text-blue-500 hover:underline text-sm"
					onClick={handleReadMore}
				>
					Read More
				</button>
			</div>

			{detailReviewModolOpen && (
				<DetailedReview
					handleClose={handleReadMore}
					review={localReview}
					userId={user_id}
				/>
			)}
		</div>
	);
};

export default ReviewCard;
