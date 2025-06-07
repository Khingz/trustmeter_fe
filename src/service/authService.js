import apiClient from "../utils/apiClient";

const AuthService = {
	login: async (credentials) => {
		try {
			const response = await apiClient.post("/api/v1/auth/login", credentials);
			return response.data;
		} catch (error) {
			const errorMsg = error?.response?.data?.message;
			return { error: true, message: errorMsg || "An unknown error occurred" };
		}
	},
	register: async (credentials) => {
		try {
			const response = await apiClient.post(
				"/api/v1/auth/register",
				credentials
			);
			return response.data;
		} catch (error) {
			const errorMsg = error?.response?.data?.message;
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

	passwordResetRequest: async (email) => {
		// Request for password reset
		try {
			const response = await apiClient.post(
				"/api/v1/auth/password-reset/request",
				{
					email,
				}
			);
			return response.data;
		} catch (error) {
			return { error: true, message: error?.response?.data?.message };
		}
	},

	resetPasword: async (token, password) => {
		// Reset password
		try {
			const response = await apiClient.post("/api/v1/auth/password-reset", {
				token,
				password,
			});
			return response.data;
		} catch (error) {
			return { error: true, message: error?.response?.data?.message };
		}
	},

	changePassword: async (credentials) => {
		try {
			const response = await apiClient.patch(
				"/api/v1/auth/change-password",
				credentials
			);
			return response.data;
		} catch (error) {
			const errorMsg = error?.response?.data?.message;
			return { error: true, message: errorMsg || "An unknown error occurred" };
		}
	},

	updateUser: async (credentials) => {
		try {
			const response = await apiClient.patch(
				"/api/v1/auth/update-user",
				credentials
			);
			return response.data;
		} catch (error) {
			const errorMsg = error?.response?.data?.message;
			return { error: true, message: errorMsg || "An unknown error occurred" };
		}
	},

	getUserById: async (userId) => {
		try {
			const response = await apiClient.get(`/api/v1/auth/user/${userId}`);
			return response.data;
		} catch (error) {
			const errorMsg = error?.response?.data?.message;
			return { error: true, message: errorMsg || "An unknown error occurred" };
		}
	},
};

export default AuthService;
