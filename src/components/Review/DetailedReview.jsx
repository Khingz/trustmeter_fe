import { IoMdClose } from "react-icons/io";
import { formatDateToShortUS } from "../../utils";
import StarRating from "../StarRating";
import DefaultImage from "../../assets/images/defaultImage.png";

const DetailedReview = ({ handleClose, review, userId }) => {
	return (
		<div className="fixed top-0 left-0 w-full min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-10">
			<div className="w-[90%] md:w-2/3 lg:w-1/2 bg-gray-50 rounded p-4 md:p-10 relative">
				<div className="bg-white border border-gray-200 rounded-sm overflow-y-auto max-h-96 p-4 flex flex-col justify-between">
					<div className="flex items-center space-x-4 mb-4">
						{/* <img
					src="https://via.placeholder.com/60"
					alt="Reviewer"
					className="w-14 h-14 rounded-full object-cover"
				/> */}
						<div className="w-14 h-14 rounded-full flex justify-center items-center bg-gray-400 text-white font-bold text-xl">
							<p>{review?.user?.name.slice(0, 2).toUpperCase()}</p>
						</div>
						<div>
							<h3 className="text-lg font-semibold capitalize">
								{review?.user?.name}
								{userId === review?.user_id && (
									<span className="ml-2 text-gray-400 text-sm italic font-light">
										(You)
									</span>
								)}
							</h3>
							<p className="text-sm text-gray-500">
								{formatDateToShortUS(review?.created_at)}
							</p>
						</div>
					</div>

					<StarRating rating={review?.rating} />

					<div className="flex items-center justify-between">
						<div className="flex justify-start items-center gap-2">
							<img
								src={review?.listings?.image || DefaultImage}
								alt="Company Logo"
								className="h-8 w-8 rounded-full object-contain"
							/>
							<p className="capitalize">{review?.listings?.name}</p>
						</div>
					</div>
					<div className="w-full border-t border-gray-200 mx-auto my-6"></div>
					<p className="text-gray-700 mb-4">"{review?.comment}"</p>
				</div>
				<div className="absolute top-2 right-2 text-3xl">
					<div onClick={handleClose}>
						<IoMdClose />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailedReview;
