import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonListingHeader = () => {
	return (
		<div>
			<Skeleton
				circle
				width={128}
				height={128}
				className="mb-4 bg-indigo-600 border border-gray-300"
			/>

			<div className="flex justify-start items-center md:gap-10 gap-4 md:mb-0 mb-4">
				<Skeleton width={240} height={64} className="rounded-md mt-1" />

				<div className="bg-white border border-gray-250 p-2 md:py-3 md:px-4 rounded-md flex items-center gap-2">
					<Skeleton
						width={24}
						height={24}
						circle
						className="bg-gray-200 border border-gray-300"
					/>
					<Skeleton width={80} height={16} />
				</div>
			</div>
		</div>
	);
};

export default SkeletonListingHeader;
