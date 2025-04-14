import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import { NavigationProvider } from "./context/navContext";
import { AuthProvider } from "./context/authContext";
import { ListingsProvider } from "./context/listingContext";
import { SkeletonTheme } from "react-loading-skeleton";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
				<NavigationProvider>
					<ListingsProvider>
						<App />
					</ListingsProvider>
				</NavigationProvider>
			</SkeletonTheme>
		</AuthProvider>
	</React.StrictMode>
);
