import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import storage from "apis/firebase";
import { AdminRoute, PrivateRoute } from "components/PrivateRoute";
import { Route } from "react-router";
export const renderRoute = (routes) =>
	routes.map((ele) => {
		if (ele.admin) {
			return <AdminRoute key={ele.path} path={ele.path} exact={ele.exact} component={ele.component} />;
		}
		if (ele.private)
			return (
				<PrivateRoute key={ele.path} path={ele.path} exact={ele.exact} component={ele.component} />
			);
		return <Route key={ele.path} path={ele.path} exact={ele.exact} component={ele.component} />;
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

export const getRandomNumber = () => {
	return Math.floor(Math.random() * 90000) + 10000;
};

export const uploadImage = async (folder, file) => {
	try {
		const snapshot = await uploadBytes(ref(storage, `${folder}/${getRandomNumber() + file.name}`), file);
		const url = await getDownloadURL(snapshot.ref).then((downloadURL) => downloadURL);
		return url;
	} catch (error) {
		console.log(error);
	}
};
