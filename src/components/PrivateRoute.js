import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export function PrivateRoute({ component: Component, ...rest }) {
	const userEmail = useSelector((state) => state.user.user.email);
	return (
		<Route
			{...rest}
			render={(props) => (userEmail ? <Component {...props} /> : <Redirect to="/login" />)}
		/>
	);
}
