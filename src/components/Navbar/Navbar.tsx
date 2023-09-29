import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { signOut } from "firebase/auth";
import auth from "../../lib/firebase";
import { setUser } from "../../redux/features/user/userSlice";
interface INavItem {
	id: string;
	title: string;
}

const Navbar = () => {
	const [active, setActive] = useState("Home");
	const [toggle, setToggle] = useState(false);
	const { user } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	console.log(user);

	let navLinks: INavItem[] = [
		{
			id: "",
			title: "Home",
		},
		{
			id: "books",
			title: "All Books",
		},
	];

	if (!user?.email) {
		navLinks = [
			...navLinks,
			{
				id: "signup",
				title: "Sign Up",
			},
			{
				id: "login",
				title: "Sign In",
			},
		];
	} else {
		navLinks = [
			...navLinks,
			{
				id: "add-new-book",
				title: "Add New",
			},
			{
				id: "profile",
				title: "Profile",
			},
		];
	}

	const logoutHandler = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				dispatch(setUser(null));
				console.log("log out");
			})
			.catch((error) => {
				// An error happened.
				console.log(error);
			});
	};

	return (
		<nav className="w-full flex py-6 justify-between items-center shadow-2xl bg-purple-950 navbar px-5">
			<h1 className="text-3xl text-white">Book Sell</h1>
			<div className="relative ml-5">
				<input
					type="text"
					placeholder="Search..."
					className="sm:w-[400px] w-[200px] px-2 py-2 indent-2 rounded-full border outline-none border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
				/>
				<div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
					<svg
						className="w-5 h-5 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-4.35-4.35M15 9a6 6 0 11-12 0 6 6 0 0112 0z"
						/>
					</svg>
				</div>
			</div>

			{/* Desktop Navigation */}
			<ul className="list-none sm:flex hidden items-center justify-end flex-1">
				{navLinks.map((nav, index) => (
					<li
						key={nav.id}
						className={`font-poppins font-semibold cursor-pointer text-[16px] ${
							active === nav.title ? "text-orange-500" : "text-white"
						} ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
						onClick={() => setActive(nav.title)}
					>
						<Link to={`/${nav.id}`}>{nav.title}</Link>
					</li>
				))}
				{user?.email && (
					<li>
						{" "}
						<button
							className="border-0 rounded-lg ml-2 outline-none px-4 py-2 bg-red-700 text-white hover:bg-red-900"
							onClick={logoutHandler}
						>
							Logout
						</button>
					</li>
				)}
			</ul>

			{/* Mobile Navigation */}
			<div className="sm:hidden flex flex-1 justify-end items-center">
				<div
					className="w-[28px] h-[28px] cursor-pointer transition-all duration-300 ease-in-out"
					onClick={() => setToggle(!toggle)}
				>
					{toggle ? (
						<AiOutlineClose className="text-white  object-contain w-6 h-6" />
					) : (
						<AiOutlineMenu className="text-white  object-contain w-6 h-6" />
					)}
				</div>

				{/* Sidebar */}
				<div
					className={`${
						!toggle ? "hidden" : "flex"
					} p-6 bg-black-gradient absolute top-10 w-[200px] right-0 mx-4 my-2  rounded-md sidebar`}
				>
					<ul className="list-none flex justify-end p-5 shadow-md rounded-2xl items-start bg-purple-700 w-full flex-1 flex-col">
						{navLinks.map((nav, index) => (
							<li
								key={nav.id}
								className={`font-poppins  cursor-pointer block w-full p-2 rounded-2xl duration-200 ease-out hover:bg-purple-800 pl-3 text-[16px] font-semibold ${
									active === nav.title ? "text-orange-500" : "text-white"
								} ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
								onClick={() => setActive(nav.title)}
							>
								<Link to={`/${nav.id}`}>{nav.title}</Link>
							</li>
						))}

						{user?.email && (
							<li>
								{" "}
								<button
									onClick={logoutHandler}
									className="border-0 rounded-lg ml-2 outline-none px-4 py-2 bg-red-700 text-white hover:bg-red-900 mt-2"
								>
									Logout
								</button>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
