import { useEffect, useState } from "react";
import { FiMessageSquare, FiMail, FiCalendar, FiStar } from "react-icons/fi";
import AuthService from "../../service/authService";
import NotFound from "../../components/common/NotFound";
import { useNavigate, useParams } from "react-router-dom";
import { getFromLocalStorage } from "../../utils/localStorage";
import { formatDateToShortUS } from "../../utils";
import ReviewService from "../../service/reviewService";
import ReviewCard from "../../components/Review/ReviewCard";
import SkeletonReviewCard from "../../components/Skeleton/ReviewCardSkeleton";
import TrustMeterLoader from "../../components/common/TrustMeterSpinner";

const UserProfile = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const { id } = useParams();
	const [review, setReview] = useState(null);
	const [reviewLoading, setReviewLoading] = useState(true);
	const [userLoading, setUserLoading] = useState(true);

	review && console.log(review);

	const currentUser = getFromLocalStorage("currentUser");

	const fetchReviews = async (params = {}) => {
		setReviewLoading(true);

		try {
			const data = await ReviewService.getReviews(params);

			if (data.error) {
				console.error(data.message);
				return;
			}
			setReview(data?.data);
		} catch (error) {
			console.log(error);
		} finally {
			setReviewLoading(false);
		}
	};

	const fetchUser = async (id) => {
		setUserLoading(true);
		try {
			const response = await AuthService.getUserById(id);
			if (response.error) {
				console.error("Error fetching user data:", response.message);
				return;
			}
			setUser(response.data);
		} catch (error) {
			console.error("Error fetching user data:", error);
		} finally {
			setUserLoading(false);
		}
	};

	useEffect(() => {
		if (id === currentUser?.id) {
			navigate("/profile");
			return;
		}
		fetchUser(id);
		fetchReviews({
			filters: {
				user: id,
			},
		});
	}, []);

	if (userLoading) {
		return (
			<div className="mt-36">
				<TrustMeterLoader />
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto p-4 mt-24">
			{!user && (
				<NotFound
					message={"No User Found"}
					submessage={"Sorry we couldn't find this user"}
				/>
			)}
			{user && (
				<div className="bg-gray-50 rounded-lg shadow-md overflow-hidden py-8">
					<div className="md:flex">
						{/* Avatar Section */}
						<div className="md:w-1/3 p-6 flex flex-col items-center">
							<div className="w-36 h-36 rounded-full border-1 border-indigo-200 shadow flex items-center justify-center font-bold text-6xl">
								{user?.name.slice(0, 2).toUpperCase()}
							</div>
							<button className="mt-6 flex items-center justify-center px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition shadow-md">
								<FiMessageSquare className="mr-2" />
								Message
							</button>
						</div>

						{/* User Info Section */}
						<div className="md:w-2/3 p-6">
							<div className="flex justify-between items-start">
								<div>
									<h1 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-widest">
										{user.name.toUpperCase()}
									</h1>
								</div>
							</div>

							<div className="mt-6 grid grid-cols-2 gap-4">
								<div className="flex items-center text-gray-600">
									<FiMail className="mr-2 text-indigo-500" />
									<span>{user.email}</span>
								</div>
								<div className="flex items-center text-gray-600">
									<FiCalendar className="mr-2 text-indigo-500" />
									<span>Joined {formatDateToShortUS(user?.created_at)}</span>
								</div>
								{review && (
									<div className="flex items-center text-gray-600">
										<FiStar className="mr-2 text-indigo-500" />
										<span>{review.total_count} review(s)</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Reviews Section */}

			{user && (
				<div className="mt-8">
					<h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
						<FiStar className="mr-2 text-indigo-500" />
						User Reviews
					</h2>
					{reviewLoading && (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mb-10 px-4 gap-8">
							<SkeletonReviewCard count={3} />
						</div>
					)}
					{!reviewLoading && review?.data.length <= 0 && (
						<NotFound submessage={"This user has no reviews yet"} />
					)}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 mb-10 px-4 gap-8">
						{!reviewLoading &&
							review?.data.length > 0 &&
							review.data.map((item, index) => (
								<div className="" key={index}>
									<ReviewCard key={index} review={item} />
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfile;
