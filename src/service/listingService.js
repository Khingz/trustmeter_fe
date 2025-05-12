import apiClient from "../utils/apiClient";

const ListingService = {
	getListings: async ({ page = 1, searchBy, searchTerm, pageSize } = {}) => {
		try {
			const params = new URLSearchParams();

			params.append("page", page);
			if (searchBy) params.append("search_by", searchBy);
			if (searchTerm) params.append("search_term", searchTerm);
			if (pageSize) params.append("page_size", pageSize);

			const response = await apiClient.get(
				`/api/v1/listings?${params.toString()}`
			);
			return response.data;
		} catch (error) {
			const errorMsg = error?.response?.data?.message;
			return { error: true, message: errorMsg || "An unknown error occurred" };
		}
	},

	getListing: async (listing_id) => {
		try {
			const response = await apiClient.get(`/api/v1/listings/${listing_id}`);
			return response.data;
		} catch (error) {
			const errorMsg = error?.response?.data?.message;
			return { error: true, message: errorMsg || "An unknown error occurred" };
		}
	},

	getReviewStats: async (listing_id) => {
		try {
			const response = await apiClient.get(`/api/v1/listings/${listing_id}/reviews/stats`);
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
