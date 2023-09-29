import { IIBook } from "../../redux/features/book/bookSlice";
import { useNavigate } from "react-router-dom";

const Book = ({ book }: { book: IIBook }) => {
	console.log(book);
	const navigate = useNavigate();

	const bookDetails = () => {
		navigate(`/books/${book?._id}`);
	};

	return (
		<div
			onClick={bookDetails}
			className=" border-2 transition-all duration-300 ease-in-out border-purple-500 hover:border-purple-900 cursor-pointer  mx-auto w-full bg-purple-500 text-white  rounded-xl shadow-md overflow-hidden"
		>
			<div className="p-8">
				<div className="uppercase tracking-wide text-sm text-indigo-900 font-semibold">
					{book?.genre}
				</div>
				<p className="block mt-1 text-lg leading-tight font-medium text-white">
					{book?.title}
				</p>
				<p className="mt-2 text-purple-900">{book?.author}</p>
				<p className="mt-2 text-purple-900">{book?.publicationDate}</p>
			</div>
		</div>
	);
};

export default Book;
