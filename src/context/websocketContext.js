import { createContext, useContext, useEffect, useState } from "react";
import { appConfig } from "../config";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("access_token");
		if (!token) {
			console.warn("No token found in localStorage.");
			return;
		}

		const ws = new WebSocket(appConfig.WEBSOCKET_BASE_URL + "/chat?" + new URLSearchParams({ token }));
		setSocket(ws);

		ws.onopen = () => console.log("WebSocket connected");
		ws.onclose = () => console.log("WebSocket closed");

		return () => ws.close();
	}, []);

	return (
		<WebSocketContext.Provider value={socket}>
			{children}
		</WebSocketContext.Provider>
	);
};

export const useWebSocket = () => useContext(WebSocketContext);
