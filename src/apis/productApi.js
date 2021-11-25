import axiosClient from "./axiosClient";
const baseURL = "/product";
const productApi = {
	getAll: () => {
		const url = `${baseURL}/`;
		return axiosClient.get(url);
	},
	createOne: (data) => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/`;
		return axiosClient.post(url, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	getOne: (id) => {
		const url = `${baseURL}/${id}`;
		return axiosClient.get(url);
	},
	updateOne: ({ id, data }) => {
		const url = `${baseURL}/${id}`;
		return axiosClient.put(url, data);
	},
	removeOne: (id) => {
		const url = `${baseURL}/${id}`;
		return axiosClient.delete(url);
	},
	rating: (data) => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/${data.id}/rating`;
		return axiosClient.post(
			url,
			{ id: data.id, rating: data.rating },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	},
};
export default productApi;
