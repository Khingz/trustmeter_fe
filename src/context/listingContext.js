import { createContext, useContext, useEffect, useState } from "react";
import ListingService from "../service/listingService";

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
	const [listings, setListings] = useState(null);

	const addListing = async (credentials) => {
		try {
			const data = await ListingService.addListing(credentials);
			if (data.error) {
				throw new Error(data.message);
			}
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {}, []);

	return (
		<ListingsContext.Provider
			value={{
				listings,
				addListing,
			}}
		>
			{children}
		</ListingsContext.Provider>
	);
};

export const useListings = () => {
	return useContext(ListingsContext);
};
