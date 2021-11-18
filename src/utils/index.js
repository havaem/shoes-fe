import { PrivateRoute } from "components/PrivateRoute";
import { Route } from "react-router";

export const renderRoute = (routes) =>
	routes.map((ele) => {
		return ele.private ? (
			<PrivateRoute key={ele.path} path={ele.path} exact={ele.exact} component={ele.component} />
		) : (
			<Route key={ele.path} path={ele.path} exact={ele.exact} component={ele.component} />
		);
	});

export const convertTimestampToDate = (timestamp) => {
	const date = new Date(timestamp);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		day: "numeric",
		month: "numeric",
		hour12: true,
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	});
};
