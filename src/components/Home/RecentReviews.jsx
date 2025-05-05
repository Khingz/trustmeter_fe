import { Link } from "react-router-dom";
import ReviewCard from "../Review/ReviewCard";
import SkeletonReviewCard from "../Skeleton/ReviewCardSkeleton";
import EmptyImage from "../../assets/images/no-data.png";
import HeaderTitle from "../common/HeaderTitle";
import { useReviews } from "../../hooks/useReview";

const RecentReviews = () => {
	const { data: reviews, isLoading } = useReviews({
		pageSize: 6,
		page: 1,
	});

	const hasNoData = !isLoading && (!reviews?.data || reviews.data.length === 0);

	return (
		<div className="my-10 mt-12">
			<HeaderTitle title={"Recent Reviews"} />
			{hasNoData && (!reviews?.data || reviews.data.length === 0) && (
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
			{!isLoading && reviews?.data && reviews.data.length > 0 && (
				<div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-20">
						{!isLoading &&
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
			{isLoading && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-20">
					<SkeletonReviewCard count={6} />
				</div>
			)}
		</div>
	);
};

export default RecentReviews;
