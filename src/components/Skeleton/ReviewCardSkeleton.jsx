import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonReviewCard = ({ count = 1 }) => {
	return (
		<SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
			{Array.from({ length: count }).map((_, idx) => (
				<div
					key={idx}
					className="bg-white border border-gray-200 rounded-sm overflow-hidden p-4 mb-4"
				>
					<div className="flex items-center space-x-4 mb-4">
						<Skeleton circle height={56} width={56} />
						<div className="flex-1">
							<Skeleton width={120} height={20} />
							<Skeleton width={80} height={14} style={{ marginTop: 6 }} />
						</div>
					</div>

					<Skeleton count={2} height={14} className="mb-4" />
					<Skeleton width={100} height={18} className="mb-4" />

					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Skeleton circle height={32} width={32} />
							<Skeleton width={80} height={14} />
						</div>
						<Skeleton width={60} height={14} />
					</div>
				</div>
			))}
		</SkeletonTheme>
	);
};

export default SkeletonReviewCard;
