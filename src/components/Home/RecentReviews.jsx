import { Link } from "react-router-dom";
import ReviewCard from "../Review/ReviewCard";
import { useEffect, useState } from "react";
import ReviewService from "../../service/reviewService";
import SkeletonReviewCard from "../Skeleton/ReviewCardSkeleton";

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
			<h2 className="font-extrabold text-3xl md:text-4xl text-center mb-6">
				Recent Reviews
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10">
				{!loading &&
					reviews &&
					reviews?.data.map((review, index) => (
						<ReviewCard key={index} review={review} />
					))}

				{loading && <SkeletonReviewCard count={6} />}
			</div>
			{!loading && reviews && (
				<div className="my-10 text-center">
					<Link
						to={"/reviews"}
						className="text-white bg-indigo-600 rounded-lg py-3 px-6 transition-colors duration-300 hover:bg-indigo-500"
					>
						See more reviews
					</Link>
				</div>
			)}
		</div>
	);
};

export default RecentReviews;
