import { Link } from "react-router-dom";

const LeaveReviewCTA = () => {
	return (
		<section className="md:mx-auto bg-indigo-600 text-center text-white p-8 md:p-14 flex flex-col justify-center items-center gap-2 md:w-[95%] rounded-lg mt-20 mx-4">
			<h2 className="font-extrabold text-3xl md:text-4xl">Found the product you needed?</h2>
			<p className="md:text-lg">Share your experience and help others make the right choice!</p>
			<Link to={"/review"} className="border border-white py-3 px-6 rounded-lg mt-3 hover:scale-110 transition-all transit">Leave a Review</Link>
		</section>
	);
};

export default LeaveReviewCTA;
