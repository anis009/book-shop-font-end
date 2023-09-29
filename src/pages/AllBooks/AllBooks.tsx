import Book from "../../components/Book/Book";
import Loading from "../../components/Loading/Loading";
import { useGetBooksQuery } from "../../redux/features/book/bookApi";
import { IIBook } from "../../redux/features/book/bookSlice";

const AllBooks = () => {
	const { data, isLoading } = useGetBooksQuery(undefined);
	console.log(data);
	return (
		<div className="p-5">
			{isLoading ? (
				<Loading />
			) : (
				<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
					{data?.data?.map((book: IIBook, index: number) => {
						return <Book key={index} book={book} />;
					})}
				</div>
			)}
		</div>
	);
};

export default AllBooks;
