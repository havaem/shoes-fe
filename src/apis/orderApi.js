import axiosClient from "./axiosClient";
const baseURL = "/order";
const orderApi = {
	createOne: (data) => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/`;
		return axiosClient.post(url, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	updateOne: ({ id, data }) => {
		// const token = localStorage.getItem("token");
		const url = `${baseURL}/${id}`;
		return axiosClient.put(url, data);
	},
	getAll: () => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/`;
		return axiosClient.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	getAllAdmin: () => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/admin/`;
		return axiosClient.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	cancelOrder: (id) => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/user/${id}`;
		return axiosClient.put(
			url,
			{ id: id },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	},
};
export default orderApi;
