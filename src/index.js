import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import { NavigationProvider } from "./context/navContext";
import { AuthProvider } from "./context/authContext";
import { ListingsProvider } from "./context/listingContext";
import { SkeletonTheme } from "react-loading-skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WebSocketProvider } from "./context/websocketContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<WebSocketProvider>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
						<NavigationProvider>
							<ListingsProvider>
								<App />
							</ListingsProvider>
						</NavigationProvider>
					</SkeletonTheme>
				</AuthProvider>
			</QueryClientProvider>
		</WebSocketProvider>
	</React.StrictMode>
);
