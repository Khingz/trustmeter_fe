import React from "react";
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
						className="overflow-hidden shadow-sm bg-white rounded-md"
					>
						<Skeleton height={192} width="100%" /> 
						<div className="p-4">
							<Skeleton height={24} width={`80%`} />
						</div>
					</div>
				))}
		</>
	);
};

export default ProductCardSkeleton;
