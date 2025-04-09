import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NavigationProvider } from "./context/navContext";
import { AuthProvider } from "./context/authContext";
import { ListingsProvider } from "./context/listingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<NavigationProvider>
				<ListingsProvider>
					<App />
				</ListingsProvider>
			</NavigationProvider>
		</AuthProvider>
	</React.StrictMode>
);
