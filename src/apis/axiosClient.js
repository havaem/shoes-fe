import axios from "axios";
import { API_URL } from "constant";

const axiosClient = axios.create({
	baseURL: API_URL,
	headers: {
		"content-type": "application/json",
	},
});

axiosClient.interceptors.request.use(async (config) => {
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		throw error;
	}
);

export default axiosClient;
