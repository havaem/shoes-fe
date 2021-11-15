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
