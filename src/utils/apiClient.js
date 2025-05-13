import axios from "axios";
import { appConfig } from "../config";
import { deleteFromLocalStorage, saveToSessionStorage } from "./localStorage";

const apiClient = axios.create({
	baseURL: appConfig.API_BASE_URL,
	// baseURL: appConfig.API_BASE_URL,
	// timeout: 10000,
});

apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			if (!error.config.url.includes("/api/v1/auth/me")) {
				console.error("Unauthorized - Redirecting to login");
				window.location.href = "/login";
			} else {
				deleteFromLocalStorage("access_token");
				deleteFromLocalStorage("currentUser");
			}
		}
		saveToSessionStorage("redirectUrl", window.location.href);
		return Promise.reject(error);
	}
);

export default apiClient;
