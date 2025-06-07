import { IoMdClose } from "react-icons/io";
import {
	capitalize,
	formatDateToShortUS,
	updateCommentInReview,
} from "../../utils";
import StarRating from "../StarRating";
import DefaultImage from "../../assets/images/defaultImage.png";
import NotFound from "../common/NotFound";
import CommentCard from "./ReviewComment";
import { useEffect, useState } from "react";
import ReviewService from "../../service/reviewService";
import { getFromLocalStorage } from "../../utils/localStorage";
import { useAddComment } from "../../hooks/useReview";

const DetailedReview = ({ handleClose, review, userId }) => {
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [addCommentLoading, setAddCommentLoading] = useState(true);
	const user = getFromLocalStorage("currentUser");

	const { mutate: addComment } = useAddComment(review.id);

	const getReviewComment = async (review_id) => {
		setAddCommentLoading(false);

		try {
			const response = await ReviewService.getReviewComments(review_id);
			setComments(response.data);
			setAddCommentLoading(false);
		} catch (error) {
			console.log(error);
			setAddCommentLoading(false);
		}
	};

	const handleCommentSubmission = (e) => {
		e.preventDefault();

		addComment({
			content: newComment,
			user_id: user.id,
			user_name: user.name,
			user_email: user.email,
		});
		setNewComment("");
	};

	useEffect(() => {
		getReviewComment(review.id);
	}, [review]);

	return (
		<div className="fixed top-0 left-0 w-full min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-10">
			<div className="w-[90%] md:w-5/6 bg-gray-50 rounded p-4 md:p-10 relative">
				<div className="bg-white border border-gray-200 rounded-sm overflow-y-auto max-h-[35rem] p-4 flex flex-col justify-between">
					<div className="flex items-center space-x-4 mb-4">
						<div className="w-14 h-14 rounded-full flex justify-center items-center bg-gray-400 text-white font-bold text-xl">
							<p>{review?.user?.name.slice(0, 2).toUpperCase()}</p>
						</div>
						<div>
							<h3 className="text-lg font-semibold capitalize">
								{review?.user?.name}
								{userId === review?.user_id && (
									<span className="ml-2 text-gray-400 text-sm italic font-light">
										(You)
									</span>
								)}
							</h3>
							<p className="text-sm text-gray-500">
								{formatDateToShortUS(review?.created_at)}
							</p>
						</div>
					</div>

					<StarRating rating={review?.rating} />

					<div className="flex items-center justify-between">
						<div className="flex justify-start items-center gap-2">
							<img
								src={review?.listings?.image || DefaultImage}
								alt="Company Logo"
								className="h-8 w-8 rounded-full object-contain"
							/>
							<p className="capitalize">{review?.listings?.name}</p>
						</div>
					</div>
					<div className="w-full border-t border-gray-50 mx-auto my-6"></div>
					<p className="text-gray-700 mb-4">{capitalize(review?.comment)}</p>
					<div>
						<h2 className="font-bold text-lg my-4">Comments</h2>

						<form onSubmit={handleCommentSubmission}>
							<textarea
								placeholder="Leave a comment..."
								className="left-4 w-full h-24 p-2 border border-gray-300 rounded-md resize-none"
								onChange={(e) => setNewComment(e.target.value)}
								value={newComment}
							></textarea>
							<input
								type="submit"
								value="Submit"
								className="left-[19rem] h-10 px-4 bg-indigo-600 text-white rounded-md shadow-md cursor-pointer"
							/>
						</form>
						<div className="mt-4">
							{review.comments && review.comments.length < 1 && (
								<NotFound
									submessage={"No comment yet, be the first to leave a comment"}
								/>
							)}
							{comments?.data &&
								comments.data.length >= 1 &&
								comments.data.map((com, index) => (
									<div key={index}>
										<div className="flex items-center space-x-4 mt-2">
											<CommentCard comment={com} />
										</div>
									</div>
								))}
							{addCommentLoading && <div>Loading comment...</div>}
						</div>
					</div>
				</div>
				<div className="absolute top-2 right-2 text-3xl cursor-pointer">
					<div onClick={handleClose}>
						<IoMdClose />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailedReview;
