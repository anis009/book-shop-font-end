import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout"; // Assuming you have the correct import path
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
		],
	},
]);
