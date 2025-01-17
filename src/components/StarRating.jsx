import { IoMdStar } from "react-icons/io";

const StarRating = ({ rating }) => {
	const getStarColor = () => {
		if (rating >= 4.5) return "text-green-500"; // Excellent
		if (rating >= 3) return "text-yellow-400"; // Good
		if (rating >= 2) return "text-red-500"; // Good
		return "text-red-700"; // Poor
	};

	return (
		<div className="flex items-center mb-4">
			{[...Array(5)].map((_, index) => (
				<span
					key={index}
					className={`text-xl ${
						index < Math.round(rating) ? getStarColor() : "text-gray-300"
					}`}
				>
					<IoMdStar />
				</span>
			))}
		</div>
	);
};

export default StarRating;
