import Skeleton from "react-loading-skeleton";

const SkeletonRatingsSummary = () => {
	return (
		<div className="flex flex-col md:flex-row gap-16 mt-10">
			<div className="flex flex-col items-center justify-start gap-3">
				<Skeleton width={100} height={32} className="rounded mb-2" />
				<Skeleton width={60} height={48} />
				<Skeleton width={50} height={14} />
			</div>
			<div className="border-t md:border border-gray-200"></div>
			<div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 mb-4 md:mb-0">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i}>
						<Skeleton height={20} />
					</div>
				))}
			</div>
		</div>
	);
};

export default SkeletonRatingsSummary;
