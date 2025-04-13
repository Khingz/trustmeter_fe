import { Link } from "react-router-dom";
import ReviewCard from "../Review/ReviewCard";

const RecentReviews = () => {
	const reviews = Array.from({ length: 8 }, (_, index) => index + 1);
	return (
		<div className="my-10">
			<h2 className="font-extrabold text-3xl md:text-4xl text-center mb-6">
				Recent Reviews
			</h2>

			<div className="flex flex-wrap justify-center items-center gap-4 px-4">
				{reviews.map((review, index) => (
					<ReviewCard key={index} />
				))}
			</div>
			<div className="my-10 text-center">
				<Link
					to={"/reviews"}
					className="text-white bg-indigo-600 rounded-lg py-3 px-6 transition-colors duration-300 hover:bg-indigo-500"
				>
					See more reviews
				</Link>
			</div>
		</div>
	);
};

export default RecentReviews;
