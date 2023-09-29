import Book from "../../components/Book/Book";
import { useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { useGetBooksQuery } from "../../redux/features/book/bookApi";
import { IIBook } from "../../redux/features/book/bookSlice";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { getYear } from "../../utils/date";

const AllBooks = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const searchTerm = searchParams.get("searchTerm");
	const { data, isLoading, refetch } = useGetBooksQuery(searchTerm);
	const [books, setBooks] = useState<IIBook[]>([]);
	const [year, setYear] = useState("");
	const [genre, setGenre] = useState("");

	console.log(searchTerm);
	useEffect(() => {
		refetch();
	}, [refetch]);
	useEffect(() => {
		if (data?.data?.length) {
			setBooks(data?.data);
		}
	}, [data]);

	useEffect(() => {
		let filteredBooks: IIBook[] = [];
		if (genre) {
			const genreFiltered = data?.data.filter((book: IIBook) => {
				return book.genre.toLocaleLowerCase() === genre.toLocaleLowerCase();
			});
			filteredBooks = [...genreFiltered];
		}
		if (year) {
			if (filteredBooks.length > 0) {
				const yearFiltered = filteredBooks.filter((book: IIBook) => {
					const currentYear = getYear(book.publicationDate);
					return currentYear === year;
				});
				filteredBooks = [...yearFiltered];
			} else {
				const yearFiltered = data?.data.filter((book: IIBook) => {
					const currentYear: string | null = getYear(book.publicationDate);

					if (currentYear === null) {
						return false; // Skip filtering for books with no valid publication date.
					}

					console.log(currentYear, year);
					return currentYear.toString() === year.toString();
				});

				filteredBooks = [...yearFiltered];
			}
		}

		if (genre || year) {
			setBooks(filteredBooks);
		} else {
			setBooks(data?.data);
		}
	}, [data?.data, genre, year]);
	// console.log(data);
	return (
		<div className="p-5 flex">
			<div className="space-y-4 pr-2">
				<div className="relative">
					<select
						onChange={(e) => setGenre(e.target.value)}
						value={genre}
						className="w-full h-10 pl-2 pr-8 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
					>
						<option value="">Select a genre</option>
						<option value="fantasy">Fantasy</option>
						<option value="romance">Romance</option>
						<option value="horror">Horror</option>
						<option value="fiction">Fiction</option>
						<option value="mystery">Mystery</option>
					</select>
				</div>
				<div className="relative">
					<input
						value={year}
						placeholder="ex. 2020"
						onChange={(e) => setYear(e.target.value)}
						className="w-full h-10 pl-2 pr-8 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
					/>
				</div>
			</div>

			{isLoading ? (
				<div className="w-full">
					<Loading />
				</div>
			) : (
				<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
					{books?.length > 0 ? (
						books?.map((book: IIBook, index: number) => {
							return <Book key={index} book={book} />;
						})
					) : (
						<h1 className="text-3xl text-center text-red-800">
							There are no books
						</h1>
					)}
				</div>
			)}
		</div>
	);
};

export default AllBooks;
