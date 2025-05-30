import { useParams } from "react-router-dom";
import DefaultImage from "../../assets/images/defaultImage.png";
import RatingBar from "../../components/Review/RatingBar";
import { useState } from "react";
import { rating_label } from "../../utils/index";
import ReviewModalContainer from "../../components/Review/ReviewModalContainer";
import ReviewCard from "../../components/Review/ReviewCard";
import SkeletonReviewCard from "../../components/Skeleton/ReviewCardSkeleton";
import SkeletonReviewSummary from "../../components/Skeleton/RatingsSummarySkeleton";
import SkeletonListingHeader from "../../components/Skeleton/ListingHeaderSkeleton";
import Pagination from "../../components/Pagination";
import NotFound from "../../components/common/NotFound";
import { useReviews } from "../../hooks/useReview";
import { useListingById, useReviewStats } from "../../hooks/useListing";

const SingleProduct = () => {
	const { id } = useParams();
	const [addReviewModalOpen, setAddReviewModalOpen] = useState(false);

	const [pageNumber, setPageNumber] = useState(1);

	const handleOpenProductModal = () => {
		setAddReviewModalOpen(true);
	};

	const { data: reviews, isLoading: loadingReviews } = useReviews({
		page: pageNumber,
		filters: { listing_id: id },
	});

	const { data: listing, isLoading: loadingListing } = useListingById(id);

	const { data: stats, isLoading: loadingStats } = useReviewStats(id);

	const handlePageChange = (pageNumber) => {
		setPageNumber(pageNumber);
	};

	return (
		<div className="min-h-screen mt-14 pt-10 relative">
			{!loadingListing &&
			!listing &&
			!loadingStats &&
			!stats &&
			!loadingReviews &&
			!reviews ? (
				<div className="md:py-16 md:px-32 py-6 px-6">
					<NotFound />
				</div>
			) : (
				<div className="">
					<div className="bg-indigo-50 md:py-16 md:px-32 py-6 px-6 border-y border-gray-300">
						{!loadingListing && listing && (
							<div className="md:flex md:items-end md:justify-between">
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
									</div>
									<p className="mt-1 text-lg font-extralight text-gray-900 break-words">
										{listing?.listing_url}
									</p>
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
						{loadingListing && <SkeletonListingHeader />}
					</div>
					<div className="md:py-16 md:px-32 py-6 px-6">
						<h2 className="text-2xl md:text-3xl font-semibold">
							Ratings Summary
						</h2>
						{!loadingStats && stats && (
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
						)}
						{loadingStats && <SkeletonReviewSummary />}
					</div>
					<div className="w-[87%] border-t border-gray-200 mx-auto"></div>

					<div>
						{reviews && (
							<div className="mt-22 md:py-16 md:px-32 py-6 px-6">
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 mb-10 px-4 md:px-10">
									{!loadingReviews &&
										reviews &&
										reviews?.data.map((review, index) => (
											<ReviewCard key={index} review={review} />
										))}
								</div>
								<div>
									<Pagination
										currentPage={reviews?.page}
										totalPages={reviews?.total_pages}
										onPageChange={handlePageChange}
									/>
								</div>
							</div>
						)}

						{loadingReviews && (
							<div className="mt-22 md:py-16 md:px-32 py-6 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								<SkeletonReviewCard count={3} />
							</div>
						)}
					</div>
					{addReviewModalOpen && (
						<ReviewModalContainer
							product={listing}
							setAddReviewModalOpen={setAddReviewModalOpen}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default SingleProduct;
