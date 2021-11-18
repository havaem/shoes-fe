import axiosClient from "./axiosClient";
const baseURL = "/voucher";
const voucherApi = {
	getOne: (id) => {
		const url = `${baseURL}/${id}`;
		return axiosClient.get(url);
	},
};
export default voucherApi;
