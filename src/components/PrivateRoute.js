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
export function AdminRoute({ component: Component, ...rest }) {
	const userRole = useSelector((state) => state.user.user.role);
	return (
		<Route
			{...rest}
			render={(props) => (userRole === 0 ? <Component {...props} /> : <Redirect to="/" />)}
		/>
	);
}
