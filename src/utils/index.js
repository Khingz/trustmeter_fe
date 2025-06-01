import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export const handleScroll = (setIsScrolled) => {
	// Handles scroll sets `isScrolled` to `true` if the vertical scroll exceeds 50 pixels, otherwise sets it to `false`
	const scrollY = window.scrollY;
	if (scrollY > 50) {
		setIsScrolled(true);
	} else {
		setIsScrolled(false);
	}
};

export function isValidEmail(email) {
	// Simple email validation check
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const rating_label = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

export const formatDateToShortUS = (dateString) => {
	const date = new Date(dateString);
	const now = new Date();
	const diffMs = now - date;

	const diffMins = Math.floor(diffMs / (1000 * 60));
	const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

	if (diffMins < 1) {
		return "just now";
	} else if (diffMins < 60) {
		return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
	} else if (diffHours < 24) {
		return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
	} else if (diffDays < 5) {
		return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
	} else {
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	}
};

export const ScrollToTop = () => {
	const location = useLocation();
	const navigationType = useNavigationType();

	useEffect(() => {
		if (navigationType === "PUSH") {
			window.scrollTo(0, 0);
		}
	}, [location, navigationType]);

	return null;
};

export const updateLikeInReview = ({ setReviews, userId, newLike, liked }) => {
	setReviews((prev) => {
		const hasPendingLike = prev.likes.some(
			(like) => like.user_id === userId && like.id === "pending"
		);
		if (hasPendingLike) {
			return {
				...prev,
				likes: prev.likes.map((like) =>
					like.user_id === userId && like.id === "pending" ? newLike : like
				),
			};
		}
		if (liked) {
			return {
				...prev,
				likes: prev.likes.filter((like) => like.user_id !== userId),
			};
		} else {
			return {
				...prev,
				likes: [...prev.likes, newLike],
			};
		}
	});
};

export const updateCommentInReview = ({ setComments, comment }) => {
	setComments((prev) => {
		const prevData = Array.isArray(prev?.data) ? prev.data : [];
		const isTemp = comment.id.startsWith("temp-") || comment.id === "temp-id";
		const hasTemp = prevData.some(
			(c) => c.id === "temp-id" || c.id === comment.id
		);

		if (isTemp && !hasTemp) {
			return {
				...prev,
				data: [comment, ...prevData],
			};
		}
		if (!isTemp && prevData.some((c) => c.id === "temp-id")) {
			return {
				...prev,
				data: prevData.map((c) => (c.id === "temp-id" ? comment : c)),
			};
		}
		return prev;
	});
};

export const removeLike = ({ setReviews, userId }) => {
	setReviews((prev) => ({
		...prev,
		likes: prev.likes.filter((like) => like.user_id !== userId),
	}));
};

export const removeComment = ({ setComments, userId }) => {
	setComments((prev) => ({
		...prev,
		data: prev.filter((com) => com.id.startsWith("temp-")),
	}));
};

export const capitalize = (text) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};
