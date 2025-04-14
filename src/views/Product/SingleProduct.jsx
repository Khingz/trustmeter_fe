import { useParams } from "react-router-dom";
import DefaultImage from "../../assets/images/defaultImage.png";
import RatingBar from "../../components/Review/RatingBar";
import { useEffect, useState } from "react";
import ListingService from "../../service/listingService";
import { rating_label } from "../../utils/index";
import ReviewModalContainer from "../../components/Review/ReviewModalContainer";
import ReviewCard from "../../components/Review/ReviewCard";
import ReviewService from "../../service/reviewService";
import SkeletonReviewCard from "../../components/Skeleton/ReviewCardSkeleton";

const SingleProduct = () => {
	const { id } = useParams();
	const [reviews, setReviews] = useState(null);
	const [listing, setListing] = useState(null);
	const [stats, setStats] = useState(null);
	const [loadingReviews, setLoadingReviews] = useState(true);
	const [loadingListing, setLoadingListing] = useState(true);
	const [loadingStats, setLoadingStats] = useState(true);
	const [addReviewModalOpen, setAddReviewModalOpen] = useState(false);

	const handleOpenProductModal = () => {
		setAddReviewModalOpen(true);
	};

	useEffect(() => {
		const fetchListing = async () => {
			try {
				const data = await ListingService.getListing(id);
				setListing(data.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoadingListing(false);
			}
		};
		fetchListing();
	}, [id, addReviewModalOpen]);

	useEffect(() => {
		const fetchReviewStats = async () => {
			try {
				const data = await ListingService.getReviewStats(id);
				setStats(data.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoadingListing(false);
			}
		};
		fetchReviewStats();
	}, [id, addReviewModalOpen]);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const data = await ReviewService.getReviews({
					filters: { listing_id: id },
				});
				console.log(data);
				setReviews(data.data);
			} catch (error) {
				console.log(error);
				console.log(error);
			} finally {
				setLoadingReviews(false);
			}
		};
		fetchReviews();
	}, [id, addReviewModalOpen]);

	return (
		<div className="min-h-screen mt-14 pt-10 relative">
			{listing && (
				<div className="bg-indigo-50 md:py-16 md:px-32 py-6 px-6 border-y border-gray-300 md:flex md:items-end md:justify-between">
					<div>
						<img
							src={listing.image || DefaultImage}
							alt={"listing_image"}
							className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full bg-indigo-600 border border-gray-300"
						/>
						<div className="flex justify-start items-center md:gap-10 gap-4 md:mb-0 mb-4">
							<h3 className="text-[2rem] md:text-[4rem] font-extralight mt-1 capitalize">
								{listing.name}
							</h3>
							{stats && (
								<div className="bg-white border border-gray-250 p-2 md:py-3 md:px-4 rounded-md">
									<span className="text-xl bg-gray-50 p-1 rounded-full border border-gray-300 mr-2">
										⭐
									</span>
									<span className="text-sm text-gray-900 font-bold ">
										{stats.total_reviews}{" "}
										{stats.total_reviews > 1 ? "Reviews" : "Review"}
									</span>
								</div>
							)}
						</div>
					</div>

					<button
						className="bg-indigo-600 text-white text-sm px-3 py-2 rounded font-semibold mb-2 pointer"
						onClick={handleOpenProductModal}
					>
						{" "}
						Leave a Review
						<span className="ml-2 animate-bounce inline-block group-hover:animate-none text-lg">
							👈🏻
						</span>
					</button>
				</div>
			)}
			{stats && (
				<div className="md:py-16 md:px-32 py-6 px-6">
					<h2 className="text-2xl md:text-3xl font-semibold">
						Ratings Summary
					</h2>
					<div className="flex flex-col md:flex-row gap-16 mt-10">
						<div className="flex flex-col items-center justify-start gap-3">
							<span className="bg-indigo-600 text-white text-sm px-3 py-2 rounded font-semibold mb-2">
								{stats.total_reviews > 0
									? rating_label[Math.trunc(stats.average_rating)]
									: "No Review"}
							</span>
							<span className="text-5xl font-bold">
								{stats.average_rating.toFixed(1)}
							</span>
							<span className="text-sm text-gray-500 -mt-1">out of 5</span>
						</div>

						<div className="border-t md:border border-gray-200"></div>

						<div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 mb-4 md:mb-0">
							{Object.entries(stats.rating_counts).map(
								([key, value], index) => (
									<div key={key}>
										<RatingBar
											item={{ key, value }}
											index={index}
											total_review={stats.total_reviews}
											average={stats.average_rating}
										/>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			)}
			<div className="w-[87%] border-t border-gray-200 mx-auto"></div>

			{reviews && (
				<div className="mt-22 md:py-16 md:px-32 py-6 px-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 mb-10 px-4 md:px-10">
						{!loadingReviews &&
							reviews &&
							reviews?.data.map((review, index) => (
								<ReviewCard key={index} review={review} />
							))}

						{loadingReviews && <SkeletonReviewCard count={6} />}
					</div>
				</div>
			)}
			{addReviewModalOpen && (
				<ReviewModalContainer
					product={listing}
					setAddReviewModalOpen={setAddReviewModalOpen}
				/>
			)}
		</div>
	);
};

export default SingleProduct;
