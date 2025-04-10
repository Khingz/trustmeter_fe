import { createContext, useContext, useEffect, useState } from "react";
import ListingService from "../service/listingService";
import AppError from "../utils/appError";

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
	const [listings, setListings] = useState(null);

	const addListing = async (credentials) => {
		try {
			const data = await ListingService.addListing(credentials);
			if (data.error) {
				if (data.message.errorData) {
					throw new AppError(
						data.message.errorMsg,
						{ data: data.message.errorData },
						409
					);
				}
				throw new AppError(data.message, {}, 409);
			}
			return data;
		} catch (error) {
			throw error;
		}
	};

	const getListings = async (page = 1, searchBy = null, searchTerm = null) => {
		try {
			const data = await ListingService.getListings({
				page,
				searchBy,
				searchTerm,
			});
			if (data.error) {
				throw new Error(data.message);
			}
			setListings(data?.data);
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
				getListings,
			}}
		>
			{children}
		</ListingsContext.Provider>
	);
};

export const useListings = () => {
	return useContext(ListingsContext);
};
