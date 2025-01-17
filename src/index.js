import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NavigationProvider } from "./context/navContext";
import { AuthProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<NavigationProvider>
				<App />
			</NavigationProvider>
		</AuthProvider>
	</React.StrictMode>
);
