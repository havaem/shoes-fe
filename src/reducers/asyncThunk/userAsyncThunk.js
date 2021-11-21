import userApi from "apis/userApi";

const { createAsyncThunk } = require("@reduxjs/toolkit");

export const registerUser = createAsyncThunk("user/register", async (data, { rejectWithValue }) => {
	try {
		const response = await userApi.register(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const loginUser = createAsyncThunk("user/login", async (data, { rejectWithValue }) => {
	try {
		const response = await userApi.login(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const loginGoogleUser = createAsyncThunk("user/loginGoogle", async (data, { rejectWithValue }) => {
	try {
		const response = await userApi.loginGoogle(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const currentUser = createAsyncThunk("user/current", async (data, { rejectWithValue }) => {
	try {
		const response = await userApi.currentUser(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const changePasswordUser = createAsyncThunk(
	"user/changePasswordUser",
	async (data, { rejectWithValue }) => {
		try {
			const response = await userApi.changePasswordUser(data);
			return response;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
export const changeWhiteListUser = createAsyncThunk("user/whitelist", async (data, { rejectWithValue }) => {
	try {
		const response = await userApi.changeWhiteListUser(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

// Admin
export const getAllUsers = createAsyncThunk("user/getAllUsers", async (data, { rejectWithValue }) => {
	try {
		const response = await userApi.getAllUsers(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const updateUser = createAsyncThunk("user/updateUser", async (data, { rejectWithValue }) => {
	try {
		const response = await userApi.updateUser(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const deleteUser = createAsyncThunk("user/deleteUser", async (data, { rejectWithValue }) => {
	try {
		const response = await userApi.deleteUser(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
