import Loading from "components/Loading";
import Paypal from "components/Paypal";
import Toast from "components/Toast";
import PublicLayout from "layouts/PublicLayout";
import { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { currentUser } from "reducers/asyncThunk/userAsyncThunk";
import { setCartFromLocalStorage } from "reducers/cartReducer";
import { errorNoti } from "reducers/notiReducer";
import { routes } from "routes/route";
import { renderRoute } from "utils";
import { Route } from "react-router-dom";
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
			<Router>
				<Suspense fallback={<Loading />}>
					<Switch>
						<PublicLayout>
							<Toast />
							{canRender && renderRoute(routes)}
							<Route path="/paypal" component={Paypal} />
						</PublicLayout>
					</Switch>
				</Suspense>
			</Router>
		</>
	);
}

export default App;
