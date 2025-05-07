import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReviewService from "../service/reviewService";

export const useReviews = ({
	page = 1,
	searchBy = undefined,
	searchTerm = undefined,
	pageSize = 30,
	filters = {},
} = {}) => {
	return useQuery({
		queryKey: ["reviews", { page, searchBy, searchTerm, pageSize, filters }],
		queryFn: () =>
			ReviewService.getReviews({
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

export const useAddReview = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (credentials) => ReviewService.addReview(credentials),
		onSuccess: (newItem) => {
			queryClient.invalidateQueries({ queryKey: ["reviews"] });
			queryClient.invalidateQueries({ queryKey: ["reviewStat"] });
			queryClient.invalidateQueries({ queryKey: ["product"] });
		},
	});
};
