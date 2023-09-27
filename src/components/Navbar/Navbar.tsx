import { useState } from "react";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
interface INavItem {
	id: string;
	title: string;
}

const navLinks: INavItem[] = [
	{
		id: "home",
		title: "Home",
	},
	{
		id: "allbooks",
		title: "All Books",
	},
	{
		id: "signup",
		title: "Sign Up",
	},
	{
		id: "signin",
		title: "Sign In",
	},
];

const Navbar = () => {
	const [active, setActive] = useState("Home");
	const [toggle, setToggle] = useState(false);

	return (
		<nav className="w-full flex py-6 justify-between items-center shadow-2xl bg-purple-950 navbar px-5">
			{/* Logo */}
			<h1 className="text-3xl text-white">Book Sell</h1>

			{/* Desktop Navigation */}
			<ul className="list-none sm:flex hidden justify-end items-center flex-1">
				{navLinks.map((nav, index) => (
					<li
						key={nav.id}
						className={`font-poppins font-semibold cursor-pointer text-[16px] ${
							active === nav.title ? "text-orange-500" : "text-white"
						} ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
						onClick={() => setActive(nav.title)}
					>
						<a href={`#${nav.id}`}>{nav.title}</a>
					</li>
				))}
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
								<a href={`#${nav.id}`}>{nav.title}</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
