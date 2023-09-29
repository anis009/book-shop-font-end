import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout"; // Assuming you have the correct import path
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import AllBooks from "../pages/AllBooks/AllBooks";
import BookDetails from "../pages/BookDetails/BookDetails";
import AddNewBook from "../pages/AddNewBook/AddNewBook";
import EditBook from "../pages/EditBook/EditBook";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/books",
				element: <AllBooks />,
			},
			{
				path: "/books/:id",
				element: <BookDetails />,
			},
			{
				path: "/add-new-book",
				element: <AddNewBook />,
			},
			{
				path: "/edit-book/:id",
				element: <EditBook />,
			},
		],
	},
]);
