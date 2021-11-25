import axiosClient from "./axiosClient";
const baseURL = "/voucher";
const voucherApi = {
	getOne: (id) => {
		const url = `${baseURL}/${id}`;
		return axiosClient.get(url);
	},
	getAll: () => {
		const url = `${baseURL}/`;
		return axiosClient.get(url);
	},
	create: (data) => {
		const url = `${baseURL}/`;
		return axiosClient.post(url, data);
	},
	delete: (id) => {
		const url = `${baseURL}/${id}`;
		return axiosClient.delete(url);
	},
	update: ({ id, data }) => {
		const url = `${baseURL}/${id}`;
		return axiosClient.put(url, data);
	},
};
export default voucherApi;
