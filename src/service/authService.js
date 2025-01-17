import apiClient from "../utils/apiClient";

const AuthService = {
	login: async (credentials) => {
		try {
			const response = await apiClient.post("/api/v1/auth/login", credentials);
			return response.data;
		} catch (error) {
			const errorMsg = error.response.data.message;
			return { error: true, message: errorMsg || "An unknown error occurred" };
		}
	},
	register: async (credentials) => {
		try {
			console.log(credentials);
			
			const response = await apiClient.post(
				"/api/v1/auth/register",
				credentials
			);
			console.log(response);
			
			return response.data;
		} catch (error) {
			const errorMsg = error.response.data.message;
			return { error: true, message: errorMsg || "An unknown error occurred" };
		}
	},
	getCurrentUser: async () => {
		try {
			const response = await apiClient.get("/api/v1/auth/me");
			return response.data;
		} catch (error) {
			return false;
		}
	},
};

export default AuthService;
