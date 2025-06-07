import { useEffect, useState } from "react";
import NotFound from "../../components/common/NotFound";
import ReviewService from "../../service/reviewService";
import SkeletonReviewCard from "../../components/Skeleton/ReviewCardSkeleton";
import ReviewCard from "../../components/Review/ReviewCard";
import Pagination from "../../components/Pagination";

const ReviewListings = () => {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchReviews = async (params = {}) => {
		setLoading(true);
		try {
			const data = await ReviewService.getReviews(params);
			if (data.error) {
				console.error(data.message);
				return;
			}
			setResults(data?.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handlePageChange = (pageNumber) => {
		fetchReviews({
			page: pageNumber,
		});
	};

	useEffect(() => {
		fetchReviews();
	}, []);

	return (
		<div className="mt-28 px-4 md:px-12 mb-20">
			<h2 className="font-bold text-3xl md:text-4xl text-gray-700">
				Review Listing
			</h2>
			<hr className="my-8" />
			{loading && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mb-10 px-4 md:px-20 gap-8">
					<SkeletonReviewCard count={3} />
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mb-10 px-4 md:px-20 gap-8">
				{results?.data?.length > 0 &&
					results.data.map((item, index) => (
						<div className="" key={index}>
							<ReviewCard key={index} review={item} />
						</div>
					))}
			</div>
			{results?.data?.length > 0 && (
				<div className="w-full">
					<Pagination
						currentPage={results?.page}
						totalPages={results?.total_pages}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
			{!loading && results?.data?.length < 1 && <NotFound />}
		</div>
	);
};

export default ReviewListings;
