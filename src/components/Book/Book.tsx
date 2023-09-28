import { IIBook } from "../../redux/features/book/bookSlice";

const Book = ({ book }: { book: IIBook }) => {
	return (
		<div className=" mx-auto w-full bg-purple-500 text-white  rounded-xl shadow-md overflow-hidden">
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
