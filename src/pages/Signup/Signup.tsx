import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createUser } from "../../redux/features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import react from "react";
import { toast } from "react-hot-toast";
type SignupFormInputs = {
	email: string;
	password: string;
};

function Signup() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormInputs>();

	const dispatch = useAppDispatch();
	const { user, isLoading, error, isError } = useAppSelector(
		(state) => state.user
	);
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<SignupFormInputs> = (data) => {
		console.log("Submitted Data:", data);
		dispatch(createUser({ email: data.email, password: data.password }));
	};

	react.useEffect(() => {
		if (isLoading && user?.email) {
			navigate("/");
		}

		if (isError && error) {
			console.log(error, { isError });
			toast.error(error);
		}
	}, [isLoading, navigate, user?.email]);

	//	console.log(user, isLoading);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Signup
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div className="">
							<label htmlFor="email" className="sr-only">
								Email
							</label>
							<input
								id="email"
								{...register("email", { required: "Email is required" })}
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email"
							/>
							{errors.email && (
								<p className="mt-2 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								{...register("password", { required: "Password is required" })}
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
							/>
							{errors.password && (
								<p className="mt-2 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Signup
						</button>
						<p className="pt-3">
							Already Have an Account?{" "}
							<Link to="/login " className="text-purple-900">
								Login
							</Link>{" "}
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
