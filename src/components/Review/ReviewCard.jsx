import React, { useState } from "react";
import StarRating from "../StarRating";
import { formatDateToShortUS } from "../../utils";
import DefaultImage from "../../assets/images/defaultImage.png";
import { getFromLocalStorage } from "../../utils/localStorage";
import DetailedReview from "./DetailedReview";

const ReviewCard = ({ review }) => {
	const user_id = getFromLocalStorage("currentUser")?.id;
	const [detailReviewModolOpen, setDetailReviewModolOpen] = useState(false);

	const handleReadMore = () => {
		setDetailReviewModolOpen(!detailReviewModolOpen);
	}

	return (
		<div className="bg-white border border-gray-200 rounded-sm overflow-hidden p-4 flex flex-col justify-between">
			<div className="flex items-center space-x-4 mb-4">
				{/* <img
					src="https://via.placeholder.com/60"
					alt="Reviewer"
					className="w-14 h-14 rounded-full object-cover"
				/> */}
				<div className="w-14 h-14 rounded-full flex justify-center items-center bg-gray-400 text-white font-bold text-xl">
					<p>{review?.user?.name.slice(0, 2).toUpperCase()}</p>
				</div>
				<div>
					<h3 className="text-lg font-semibold capitalize">
						{review?.user?.name}
						{user_id === review?.user_id && (
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

			<p className="text-gray-700 mb-4">"{review?.comment.slice(0, 100)}..."</p>

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

				<button className="text-blue-500 hover:underline text-sm" onClick={handleReadMore}>
					Read More
				</button>
			</div>

			{
				detailReviewModolOpen && <DetailedReview handleClose={handleReadMore} review={review} userId={user_id} />
			}
		</div>
	);
};

export default ReviewCard;
