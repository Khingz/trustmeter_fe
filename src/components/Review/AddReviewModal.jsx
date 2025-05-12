import React from "react";
import Rating from "../Rating";
import DefaultImage from "../../assets/images/defaultImage.png";
import { getFromLocalStorage } from "../../utils/localStorage";
import { AnimatePresence } from "framer-motion";
import ErrorAlert from "../common/ErrorAlert";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddReview } from "../../hooks/useReview";
import LoadingSpinner from "../LoadingSpinner";

const AddReview = ({ product, setAddReviewModalOpen }) => {
	const navigate = useNavigate();
	const [rating, setRating] = React.useState(0);
	const [comment, setComment] = React.useState("");
	const [error, setError] = React.useState(null);
	// const [loading, setLoading] = React.useState(false);

	const { mutate, loading } = useAddReview();

	const user_id = getFromLocalStorage("currentUser").id;

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);

		if (rating === 0) {
			setError("Please select a rating");
			return;
		}

		if (comment.trim() === "") {
			setError("Please enter a comment");
			return;
		}

		const reviewData = {
			listing_id: product.id,
			rating: rating,
			comment: comment,
			user_id,
		};

		try {
			// await ReviewService.addReview(reviewData);
			mutate(reviewData);
			setRating(0);
			setComment("");
			setAddReviewModalOpen(false);
			navigate("/products/" + product.id);
			toast.success("Review submitted successfully!");
		} catch (error) {
			setError("Failed to submit review. Please try again.");
		}
	};

	return (
		<div className="">
			{product && (
				<div className="bg-white p-4 md:p-8 border border-gray-200 mx-auto">
					<h3 className="font-bold text-xl md:text-2xl">You are reviewing:</h3>
					<div className="flex gap-3 items-center mt-4 md:text-2xl">
						<img
							src={product.image || DefaultImage}
							alt={"listing_image"}
							className="w-12 h-12 md:w-22 md:h-22 object-cover rounded-full bg-indigo-600 border border-gray-300"
						/>
						<h5 className="text-[1rem] md:text-[2.5rem] font-extralight mt-1 capitalize">
							{product.name}
						</h5>
					</div>
					<div className="border-t my-8"></div>
					<AnimatePresence>
						{error && <ErrorAlert message={error} />}
					</AnimatePresence>
					<div className="mt-4">
						<p className="">
							Your Rating <span className="text-red-500">*</span>
						</p>
						<Rating rating={rating} setRating={setRating} />
					</div>
					<div className="mt-4">
						<p className="">
							Review <span className="text-red-500">*</span>
						</p>
						<textarea
							className="w-full border border-gray-200 p-2 rounded-md"
							rows="10"
							placeholder="Write your review..."
							onChange={(e) => setComment(e.target.value)}
							value={comment}
						></textarea>
					</div>
					<button
						className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md pointer"
						onClick={handleSubmit}
						disabled={loading}
					>
						{loading ? <LoadingSpinner /> : "Submit Review"}
					</button>
				</div>
			)}
		</div>
	);
};

export default AddReview;
