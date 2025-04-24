import { Link } from "react-router-dom";
import ReviewCard from "../Review/ReviewCard";
import { useEffect, useState } from "react";
import ReviewService from "../../service/reviewService";
import SkeletonReviewCard from "../Skeleton/ReviewCardSkeleton";
import EmptyImage from "../../assets/images/no-data.png";

const RecentReviews = () => {
	const [reviews, setReviews] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const data = await ReviewService.getReviews({ pageSize: 6 });
				setReviews(data.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		fetchReviews();
	}, []);

	return (
		<div className="my-10">
			<div className="flex justify-center items-center w-[70%] mx-auto gap-4 mb-10">
				<div className="w-1/3 border-t border-t-gray-300"></div>
				<h3 className="font-extrabold text-2xl md:text-3xl text-center mb-6>Categories">
					Recent Reviews
				</h3>
				<div className="w-1/3 border-t border-t-gray-300"></div>
			</div>
			{!loading && (!reviews?.data || reviews.data.length === 0) && (
				<div className="flex flex-col justify-center items-center">
					<img
						src={EmptyImage}
						alt="empty review"
						srcSet=""
						className="h-32 w-32"
					/>
					<p className="text-center text-gray-500 mb-4 text-lg">
						Nothing to show, yet!
					</p>
				</div>
			)}
			{!loading && reviews?.data && reviews.data.length > 0 && (
				<div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-20">
						{!loading &&
							reviews &&
							reviews?.data.map((review, index) => (
								<ReviewCard key={index} review={review} />
							))}
					</div>
					<div className="my-10 text-center">
						<Link
							to={"/reviews"}
							className="text-white bg-indigo-600 rounded-lg py-3 px-6 transition-colors duration-300 hover:bg-indigo-500"
						>
							See more reviews
						</Link>
					</div>
				</div>
			)}
			{loading && <SkeletonReviewCard count={6} />}
		</div>
	);
};

export default RecentReviews;
