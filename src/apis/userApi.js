import axiosClient from "./axiosClient";
const baseURL = "/user";
const userApi = {
	register: (data) => {
		const url = `${baseURL}/register`;
		return axiosClient.post(url, data);
	},
	forgot: (data) => {
		const url = `${baseURL}/${data}`;
		return axiosClient.post(url);
	},
	changeforgot: (data) => {
		const url = `${baseURL}`;
		return axiosClient.post(url,data);
	},
	login: (data) => {
		const url = `${baseURL}/login`;
		return axiosClient.post(url, data);
	},
	loginGoogle: (data) => {
		const url = `${baseURL}/loginGoogle`;
		return axiosClient.post(url, data);
	},
	updateAvatar: (data) => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/avatar`;
		return axiosClient.post(url, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	currentUser: (data) => {
		const url = `${baseURL}/`;
		return axiosClient.get(url, {
			headers: {
				Authorization: `Bearer ${data}`,
			},
		});
	},
	changePasswordUser: (data) => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/password`;
		return axiosClient.post(url, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	changeWhiteListUser: (data) => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/whitelist`;
		return axiosClient.post(url, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	getAllUsers: () => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/admin/`;
		return axiosClient.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	updateUser: ({ id, data }) => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/admin/${id}`;
		return axiosClient.put(url, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	deleteUser: (id) => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/admin/${id}`;
		return axiosClient.delete(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	},
	/*getInfoUser: (data) => {
		const url = `${baseURL}/info`;
		return axiosClient.get(url, {
			headers: {
				Authorization: `Bearer ${data}`,
			},
		});
	},
	*/
};
export default userApi;
