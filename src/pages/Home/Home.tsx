import { useGetLatestBooksQuery } from "../../redux/features/book/bookApi";
import { IIBook } from "../../redux/features/book/bookSlice";
import Book from "../../components/Book/Book";
import Loading from "../../components/Loading/Loading";

const Home = () => {
	const { data, isLoading } = useGetLatestBooksQuery(undefined);
	console.log(data);
	return (
		<div className="container  mx-auto my-5">
			<h1 className="text-2xl font-semibold mb-5">Recent Books</h1>
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

export default Home;
