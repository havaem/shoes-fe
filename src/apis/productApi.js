import axiosClient from "./axiosClient";
const baseURL = "/product";
const productApi = {
	getAll: () => {
		const url = `${baseURL}/`;
		return axiosClient.get(url);
	},
	getOne: (id) => {
		const url = `${baseURL}/${id}`;
		return axiosClient.get(url);
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
