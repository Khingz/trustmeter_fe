import apiClient from "../utils/apiClient";

const ReviewService = {
	getListings: async ({ page = 1, searchBy, searchTerm, filters } = {}) => {
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

	addListing: async (credentials) => {
		try {
			const response = await apiClient.post("/api/v1/listings", credentials);
			return response.data;
		} catch (error) {
			if (error.status === 409) {
				const errorMsg = error?.response?.data?.message?.message;
				const errorData = error?.response?.data?.message?.listing;
				return {
					error: true,
					message: { errorMsg, errorData } || "An unknown error occurred",
				};
			}
			const errorMsg = error?.response?.data?.message;
			return { error: true, message: errorMsg || "An unknown error occurred" };
		}
	},
};

export default ListingService;
