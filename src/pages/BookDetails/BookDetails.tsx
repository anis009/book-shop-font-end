import { useParams, useNavigate } from "react-router-dom";
import {
	useCreateCommentMutation,
	useDeleteBookMutation,
	useGetSingleBookQuery,
} from "../../redux/features/book/bookApi";
import Loading from "../../components/Loading/Loading";
import { IReview } from "../../redux/features/book/interfaces";
import { FormEvent, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const BookDetails = () => {
	const [formData, setFormData] = useState({
		review: "",
	});
	const { user } = useAppSelector((state) => state.user);
	console.log(user);
	const { id } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, refetch } = useGetSingleBookQuery(id);
	const [
		deleteBookMutation,
		{
			isSuccess: deleteSuccess,
			isError: deleteError,
			isLoading: deleteLoading,
		},
	] = useDeleteBookMutation();
	useEffect(() => {
		refetch();
	}, [refetch]);

	const [
		createCommentMutation,
		{ isLoading: commentLoading, data: comment, isSuccess, isError, error },
	] = useCreateCommentMutation(undefined);
	console.log(data);

	//?for add review
	useEffect(() => {
		if (isSuccess) {
			console.log(comment);
			// Reset the form fields if needed
			setFormData({
				review: "",
			});
			refetch();
			toast.success("Add review successfully");
		} else if (isError) {
			console.log(error);
			toast.error("Add review failed");
		}
	}, [comment, error, isError, isSuccess, refetch]);

	// ? for deleting book
	useEffect(() => {
		if (deleteSuccess) {
			toast.success("Delete successfully");
			navigate("/books");
		} else if (deleteError) {
			console.log(error);
			toast.error("Delete failed");
		}
	}, [deleteError, deleteSuccess, error, navigate]);

	if (isLoading) {
		return <Loading />;
	}

	const handleChange = (
		e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.currentTarget; // Use e.currentTarget instead of e.target
		setFormData({
			...formData,
			[name]: value,
		});
	};

	//! add review
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!user?.email) {
			toast.error("Please,Log In");
			return;
		}
		// Handle form submission (e.g., send data to the server)
		console.log("Form data submitted:", formData);
		createCommentMutation({
			id: id,
			data: {
				review: formData?.review,
			},
		});
	};

	const deleteBook = () => {
		const flag = window.confirm("Are sure you want to delete");
		if (!flag) {
			return;
		}
		deleteBookMutation(id);
	};

	const editBook = () => {
		navigate(`/edit-book/${id}`);
	};
	return (
		<div className="mx-10 my-10">
			<h2 className="text-2xl font-semibold">{data?.data?.title}</h2>
			<p className="text-gray-600">Author: {data?.data?.author}</p>
			<p className="text-gray-600">Genre: {data?.data?.genre}</p>
			<p className="text-gray-600">
				Publication Date: {data?.data?.publicationDate}
			</p>

			<div className=" mt-5">
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<textarea
							id="review"
							name="review"
							value={formData.review}
							onChange={handleChange}
							className="mt-1 p-2 outline-none w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
							required
						/>
					</div>
					<div className="mt-2">
						<button
							disabled={commentLoading}
							type="submit"
							className=" py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:ring focus:ring-indigo-200"
						>
							{commentLoading ? "Loading..." : "Add Review"}
						</button>
					</div>
				</form>
			</div>

			<div className="mt-4">
				<h3 className="text-xl font-semibold">Reviews</h3>
				{data?.data?.reviews.length === 0 ? (
					<p>No reviews available for this book.</p>
				) : (
					<ul>
						{data?.data?.reviews.map((review: IReview, index: number) => (
							<li
								className="bg-purple-500 p-2 rounded-md text-purple-950 capitalize my-2"
								key={index}
							>
								{review.review}
							</li>
						))}
					</ul>
				)}
			</div>
			<div className="flex items-center mt-10 justify-center">
				<button
					onClick={editBook}
					className="bg-blue-500 mr-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Edit
				</button>
				<button
					disabled={deleteLoading}
					onClick={deleteBook}
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
				>
					{deleteLoading ? "Deleting.." : "Delete"}
				</button>
			</div>
		</div>
	);
};

export default BookDetails;
