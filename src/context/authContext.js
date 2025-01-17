import { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../service/authService";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
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

	const getCurrentUser = async () => {
		try {
			const currentUser = getFromLocalStorage("currentUser");
			if (currentUser) {
				setCurrentUser(currentUser);
				setIsLoggedIn(true);
			}
			const isValidLoggin = await AuthService.getCurrentUser();
			console.log(isValidLoggin);

			if (!isValidLoggin) {
				setIsLoggedIn(false);
				setCurrentUser(null);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCurrentUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{ token, setToken, isLoggedIn, setIsLoggedIn, login, currentUser, register }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
