import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getBooks: builder.query({
			query: () => "/books",
		}),
		getLatestBooks: builder.query({
			query: () => "/books/latest",
		}),
		getSingleBook: builder.query({
			query: (id) => `/books/${id}`,
		}),
		getComment: builder.query({
			query: (id) => `/books/${id}`,
			providesTags: ["books"], // Use the same tag description as in other queries/mutations
		}),
		createComment: builder.mutation({
			query: ({ id, data }) => ({
				url: `/books/${id}`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["books"], // Use the same tag description as in other queries/mutations
		}),
	}),
});

export const {
	useCreateCommentMutation,
	useGetCommentQuery,
	useGetBooksQuery,
	useGetSingleBookQuery,
	useGetLatestBooksQuery,
} = bookApi;
