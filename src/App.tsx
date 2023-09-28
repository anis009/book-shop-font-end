import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "./lib/firebase";
function App() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(setLoading(true));
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log("Auth", user);
				dispatch(setUser(user.email));
				dispatch(setLoading(false));
			} else {
				dispatch(setLoading(false));
			}
		});
	}, [dispatch]);
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
