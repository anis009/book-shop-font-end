import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout"; // Assuming you have the correct import path
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

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
		],
	},
]);
