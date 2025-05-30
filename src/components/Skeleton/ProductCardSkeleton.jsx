import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = ({ count = 1 }) => {
	return (
		<>
			{Array(count)
				.fill(0)
				.map((_, index) => (
					<div
						key={index}
						className="flex items-stretch h-full gap-4 p-3 bg-white border border-gray-100 rounded-lg"
					>
						<div className="relative flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg bg-gray-50">
							<Skeleton height="100%" width="100%" />
						</div>

						<div className="flex flex-col flex-1 min-w-0 py-1">
							<div className="mb-2">
								<Skeleton height={24} width="60%" />
							</div>
							<div className="mb-2">
								<Skeleton height={16} width="90%" />
							</div>
							<Skeleton height={16} width="30%" />
						</div>
					</div>
				))}
		</>
	);
};

export default ProductCardSkeleton;
