import { useQuery } from "@tanstack/react-query";
import ListingService from "../service/listingService";

export const useListing = ({
	page = 1,
	searchBy = undefined,
	searchTerm = undefined,
	pageSize = 30,
	filters = {},
} = {}) => {
	return useQuery({
		queryKey: ["products", { page, searchBy, searchTerm, pageSize, filters }],
		queryFn: () =>
			ListingService.getListings({
				page,
				searchBy,
				searchTerm,
				pageSize,
				filters,
			}),
		keepPreviousData: true,
		staleTime: 1000 * 60 * 5,
		select: (data) => data?.data,
	});
};

export const useListingById = (id) => {
	return useQuery({
		queryKey: ["products", id],
		queryFn: () => ListingService.getListing(id),
		keepPreviousData: true,
		staleTime: 1000 * 60 * 5,
		select: (data) => data?.data,
	});
};

export const useReviewStats = (id) => {
	return useQuery({
		queryKey: ["products", id, "stats"],
		queryFn: () => ListingService.getReviewStats(id),
		keepPreviousData: true,
		staleTime: 1000 * 60 * 5,
		select: (data) => data?.data,
	});
};
