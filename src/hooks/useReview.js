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

export const useAddComment = (reviewId) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data) => ReviewService.addComment(reviewId, data),

		// Optimistic update
		onMutate: async (newCommentData) => {
			await queryClient.cancelQueries({ queryKey: ["reviews"] });

			const previousReviews = queryClient.getQueryData(["reviews"]);

			const tempComment = {
				id: "temp-id",
				content: newCommentData.content,
				created_at: new Date().toISOString(),
				review_id: reviewId,
				user_id: newCommentData.user_id,
				likes: [],
				user: {
					id: newCommentData.user_id,
					name: newCommentData.user_name,
					email: newCommentData.user_email,
				},
			};

			// Update the review in the list
			queryClient.setQueryData(["reviews"], (oldData) => {
				if (!oldData) return oldData;

				return {
					...oldData,
					data: oldData.data.map((review) =>
						review.id === reviewId
							? {
									...review,
									comments: [tempComment, ...(review.comments || [])],
							  }
							: review
					),
				};
			});

			return { previousReviews };
		},

		// Replace temp comment with real comment
		onSuccess: (response, variables) => {
			const newComment = response.data;

			queryClient.setQueryData(["reviews"], (oldData) => {
				if (!oldData) return oldData;

				return {
					...oldData,
					data: oldData.data.map((review) =>
						review.id === reviewId
							? {
									...review,
									comments: review.comments.map((c) =>
										c.id === "temp-id" ? newComment : c
									),
							  }
							: review
					),
				};
			});
		},

		// Rollback on error
		onError: (err, variables, context) => {
			queryClient.setQueryData(["reviews"], context.previousReviews);
		},

		// Always refetch as backup
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["reviews"] });
		},
	});
};
