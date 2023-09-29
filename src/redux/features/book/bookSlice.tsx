import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IReview } from "./interfaces";

export interface IIBook {
	title: string;
	author: string;
	publicationDate: string;
	genre: string;
	_id?: string;
	reviews: IReview[];
}
interface IBook {
	books: IIBook[];
	isError: boolean;
	error: string | null;
	isLoading: boolean;
	isSuccess: boolean;
}

const initialState: IBook = {
	books: [],
	isError: false,
	error: null,
	isLoading: false,
	isSuccess: false,
};

const bookSlice = createSlice({
	name: "books",
	initialState,
	reducers: {
		getBooks: (state, action: PayloadAction<IIBook[]>) => {
			state.books = action.payload;
			state.isSuccess = true;
		},
		getLatestBooks: (state, action: PayloadAction<IIBook[]>) => {
			state.books = action.payload;
			state.isSuccess = true;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const { getBooks, setLoading, setError, getLatestBooks } =
	bookSlice.actions;
export default bookSlice.reducer;
