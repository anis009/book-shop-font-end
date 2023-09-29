import { useEffect, useState } from "react";
import { useCreateBookMutation } from "../../redux/features/book/bookApi";
import { toast } from "react-hot-toast";
const AddNewBook = () => {
	const [createBookMutation, { isSuccess, data, isError, error }] =
		useCreateBookMutation();

	const [formData, setFormData] = useState({
		title: "",
		author: "",
		genre: "",
		publicationDate: "",
	});

	const handleChange = (e: {
		target: { name: string; value: string | null };
	}) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		// Handle form submission (e.g., send data to the server)
		console.log("Form data submitted:", formData);
		createBookMutation(formData);
	};

	useEffect(() => {
		if (isSuccess) {
			console.log(isSuccess, data);
			toast.success("Added successfully");
			// Reset the form fields if needed
			setFormData({
				title: "",
				author: "",
				genre: "",
				publicationDate: "",
			});
		} else if (isError) {
			toast.error("Something went wrong");
			console.log(error);
		}
	}, [data, error, isError, isSuccess]);

	return (
		<div className="max-w-md mx-auto p-6 my-5 bg-white rounded-lg shadow-lg">
			<h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700"
					>
						Title
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="author"
						className="block text-sm font-medium text-gray-700"
					>
						Author
					</label>
					<input
						type="text"
						id="author"
						name="author"
						value={formData.author}
						onChange={handleChange}
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="genre"
						className="block text-sm font-medium text-gray-700"
					>
						Genre
					</label>
					<input
						type="text"
						id="genre"
						name="genre"
						value={formData.genre}
						onChange={handleChange}
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="publicationDate"
						className="block text-sm font-medium text-gray-700"
					>
						Publication Date
					</label>
					<input
						type="date"
						id="publicationDate"
						name="publicationDate"
						value={formData.publicationDate}
						onChange={handleChange}
						className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:border-indigo-400"
						required
					/>
				</div>
				<div className="mt-6">
					<button
						type="submit"
						className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md focus:ring focus:ring-indigo-200"
					>
						Add Book
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddNewBook;
