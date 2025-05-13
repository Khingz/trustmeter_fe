import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../service/authService";
import {
	deleteFromLocalStorage,
	getFromLocalStorage,
	saveToLocalStorage,
} from "../utils/localStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsloading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);

	const login = async (credentials) => {
		try {
			const data = await AuthService.login(credentials);
			if (data.error) {
				throw new Error(data.message);
			}
			setIsLoggedIn(true);
			setToken(data.access_token);
			saveToLocalStorage("access_token", data.access_token);
			setCurrentUser(data.data);
			saveToLocalStorage("currentUser", data.data);
		} catch (error) {
			throw error;
		}
	};

	const register = async (credentials) => {
		try {
			const data = await AuthService.register(credentials);
			if (data.error) {
				throw new Error(data.message);
			}
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			setIsLoggedIn(false);
			setCurrentUser(null);
			deleteFromLocalStorage("access_token");
			deleteFromLocalStorage("currentUser");
		} catch (error) {
			console.log(error);
		}
	};

	const getCurrentUser = async () => {
		try {
			const currentUser = getFromLocalStorage("currentUser");
			if (currentUser) {
				setCurrentUser(currentUser);
				setIsLoggedIn(true);
			}
			const isValidLoggin = await AuthService.getCurrentUser();
			if (!isValidLoggin) {
				setIsLoggedIn(false);
				setCurrentUser(null);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsloading(false);
		}
	};

	const forgotPassword = async (email) => {
		try {
			const response = await AuthService.passwordResetRequest(email);
			if (response.error) {
				throw new Error(response.message);
			}
			return response;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	const resetPassword = async (token, email) => {
		try {
			const response = await AuthService.resetPasword(token, email);
			if (response.error) {
				throw new Error(response.message);
			}
			return response;
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {
		getCurrentUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,
				isLoggedIn,
				setIsLoggedIn,
				login,
				currentUser,
				register,
				logout,
				forgotPassword,
				resetPassword,
				isLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
