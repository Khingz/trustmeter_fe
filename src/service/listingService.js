import apiClient from "../utils/apiClient";

const ListingService = {
	getListings: async (page = 1, limit = 10) => {
		try {
			const response = await apiClient.get(
				`/api/v1/listings?page=${page}&limit=${limit}`
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
			const errorMsg = error?.response?.data?.message?.message;
			const errorData = error?.response?.data?.message?.listing;
			return {
				error: true,
				message: { errorMsg, errorData } || "An unknown error occurred",
			};
		}
	},
};

export default ListingService;
