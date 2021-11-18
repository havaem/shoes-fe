import axiosClient from "./axiosClient";
const baseURL = "/comment";
const commentApi = {
	create: ({ id, comment }) => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/`;
		return axiosClient.post(
			url,
			{ id, comment },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	},
	createReply: ({ id, comment }) => {
		const token = localStorage.getItem("token");
		const url = `${baseURL}/repTo`;
		return axiosClient.post(
			url,
			{ id, comment },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	},

	getAllCommentFromPost: (id) => {
		const url = `${baseURL}/${id}`;
		return axiosClient.get(url);
	},
	getAllReplyComment: (id) => {
		const url = `${baseURL}/repTo/${id}`;
		return axiosClient.get(url);
	},
};
export default commentApi;
