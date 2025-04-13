import apiClient from "../utils/apiClient";

const ReviewService = {
	getReviews: async ({ page = 1, searchBy, searchTerm, filters } = {}) => {
		try {
			const params = new URLSearchParams();

			params.append("page", page);
			if (searchBy) params.append("search_by", searchBy);
			if (searchTerm) params.append("search_term", searchTerm);
			if (filters) params.append("filters", filters);

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
};

export default ReviewService;
