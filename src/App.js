import Loading from "components/Loading";
import PublicLayout from "layouts/PublicLayout";
import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from "routes/route";

function App() {
	const renderRoute = (routes) =>
		routes.map((ele) => (
			<Route key={ele.path} path={ele.path} exact={ele.exact} component={ele.component} />
		));

	return (
		<>
			<Router>
				<Suspense fallback={<Loading />}>
					<Switch>
						<PublicLayout>{renderRoute(routes)}</PublicLayout>
					</Switch>
				</Suspense>
			</Router>
		</>
	);
}

export default App;
