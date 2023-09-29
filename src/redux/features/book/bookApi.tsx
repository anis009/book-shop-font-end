import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getBooks: builder.query({
			query: (searchTerm) =>
				`/books?searchTerm=${searchTerm ? searchTerm : ""}`,
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
		createBook: builder.mutation({
			query: (data) => ({
				url: `/books`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["books"], // Use the same tag description as in other queries/mutations
		}),
		updateBook: builder.mutation({
			query: ({ data, id }) => ({
				url: `/books/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["books"], // Use the same tag description as in other queries/mutations
		}),
		createComment: builder.mutation({
			query: ({ data, id }) => ({
				url: `/books/reviews/${id}`,
				method: "PUT",
				body: data,
			}),
			invalidatesTags: ["books"], // Use the same tag description as in other queries/mutations
		}),
		deleteBook: builder.mutation({
			query: (id) => ({
				url: `/books/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["books"], // Use the same tag description as in other queries/mutations
		}),
	}),
});

export const {
	useCreateBookMutation,
	useGetCommentQuery,
	useGetBooksQuery,
	useGetSingleBookQuery,
	useGetLatestBooksQuery,
	useCreateCommentMutation,
	useUpdateBookMutation,
	useDeleteBookMutation,
} = bookApi;
