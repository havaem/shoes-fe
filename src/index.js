import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "assets/css/style.css";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Loading from "components/Loading";
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Suspense fallback={<Loading />}>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</Suspense>
		</Router>
	</Provider>,
	document.getElementById("root")
);
