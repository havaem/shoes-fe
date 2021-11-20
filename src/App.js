import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { routes } from "routes/route";
import PublicLayout from "layouts/PublicLayout";
import { currentUser } from "reducers/asyncThunk/userAsyncThunk";
import { setCartFromLocalStorage } from "reducers/cartReducer";
import { errorNoti } from "reducers/notiReducer";
import { renderRoute } from "utils";
import Toast from "components/Toast";
function App() {
	const dispatch = useDispatch();
	const [canRender, setCanRender] = useState(false);
	useEffect(() => {
		dispatch(setCartFromLocalStorage());
		const getCurrentUser = async () => {
			try {
				const token = localStorage.getItem("token");
				if (token) {
					await dispatch(currentUser(token)).unwrap();
				}
				setCanRender(true);
			} catch (error) {
				dispatch(errorNoti({ message: error.message }));
				localStorage.removeItem("token");
				setCanRender(true);
			}
		};
		getCurrentUser();
	}, [dispatch]);
	return (
		<>
			<PublicLayout>
				<Toast />
				{canRender && renderRoute(routes)}
				{/* <Route path="/paypal" component={Paypal} /> */}
			</PublicLayout>
		</>
	);
}

export default App;
