import commentApi from "apis/commentApi";

const { createAsyncThunk } = require("@reduxjs/toolkit");

export const createOneComment = createAsyncThunk(
	"comment/createOneComment",
	async (data, { rejectWithValue }) => {
		try {
			const response = await commentApi.create(data);
			return response;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
export const createOneRepComment = createAsyncThunk(
	"comment/createOneRepComment",
	async (data, { rejectWithValue }) => {
		try {
			const response = await commentApi.createReply(data);
			return response;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
export const getAllCommentFromPost = createAsyncThunk(
	"comment/getAllCommentFromPost",
	async (data, { rejectWithValue }) => {
		try {
			const response = await commentApi.getAllCommentFromPost(data);
			return response;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
export const getAllReplyComment = createAsyncThunk(
	"comment/getAllReplyComment",
	async (data, { rejectWithValue }) => {
		try {
			const response = await commentApi.getAllReplyComment(data);
			return response;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
