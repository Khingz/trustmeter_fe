import apiClient from "../utils/apiClient";

const ReviewService = {
	getReviews: async ({ page = 1, searchBy, searchTerm, pageSize, filters = {} }) => {
		try {
			const params = new URLSearchParams();
			params.append("page", page);
			if (searchBy) params.append("search_by", searchBy);
			if (searchTerm) params.append("search_term", searchTerm);
			if (filters && Object.keys(filters).length > 0) {
				params.append("filters", JSON.stringify(filters));
			}
			if (pageSize) params.append("page_size", pageSize)
			const response = await apiClient.get(
				`/api/v1/reviews?${params.toString()}`
			);
			return response.data;
		} catch (error) {
			const errorMsg = error?.response?.data?.message;
			return { error: true, message: errorMsg || "An unknown error occurred" };
		}
	},

	addReview: async (credentials) => {
		try {
			const response = await apiClient.post("/api/v1/reviews", credentials);
			return response.data;
		} catch (error) {
			const errorMsg = error?.response?.data?.message;
			return { error: true, message: errorMsg || "An unknown error occurred" };
		}
	},

	toggleReviewLike: async (reviewId) => {
		try {
			const response = await apiClient.post(`/api/v1/reviews/${reviewId}/like`);
			return response.data;
		} catch (error) {
			const errorMsg = error?.response?.data?.message;
			return { error: true, message: errorMsg || "An unknown error occurred" };
		}
	},
};

export default ReviewService;
