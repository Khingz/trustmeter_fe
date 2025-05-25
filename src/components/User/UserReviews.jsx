import { useEffect, useState } from "react";
import SkeletonReviewCard from "../Skeleton/ReviewCardSkeleton";
import ReviewCard from "../Review/ReviewCard";
import NotFound from "../common/NotFound";
import Pagination from "../Pagination";
import ReviewService from "../../service/reviewService";
import { getFromLocalStorage } from "../../utils/localStorage";

const UserReviews = () => {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const user_id = getFromLocalStorage("currentUser").id;

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
		fetchReviews({
			filters: {
				user: user_id,
			},
		});
	}, []);

	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">Your Reviews</h2>
			<hr className="my-2" />
			{loading && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mb-10 px-4 gap-8">
					<SkeletonReviewCard count={3} />
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mb-10 px-4 gap-8">
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
			{!loading && results?.data?.length <= 0 && <NotFound />}
		</div>
	);
};

export default UserReviews;
