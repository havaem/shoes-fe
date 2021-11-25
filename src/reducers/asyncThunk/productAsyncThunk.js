import productApi from "apis/productApi";

const { createAsyncThunk } = require("@reduxjs/toolkit");

export const createOneProduct = createAsyncThunk(
	"product/createOneProduct",
	async (data, { rejectWithValue }) => {
		try {
			const response = await productApi.createOne(data);
			return response;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
export const getAllProduct = createAsyncThunk("product/getAllProduct", async (data, { rejectWithValue }) => {
	try {
		const response = await productApi.getAll();
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const getOneProduct = createAsyncThunk("product/getOneProduct", async (data, { rejectWithValue }) => {
	try {
		const response = await productApi.getOne(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const ratingProduct = createAsyncThunk("user/ratingProduct", async (data, { rejectWithValue }) => {
	try {
		const response = await productApi.rating(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const removeOneProduct = createAsyncThunk(
	"product/removeOneProduct",
	async (data, { rejectWithValue }) => {
		try {
			const response = await productApi.removeOne(data);
			return response;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
export const updateProduct = createAsyncThunk("product/updateProduct", async (data, { rejectWithValue }) => {
	try {
		const response = await productApi.updateOne(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
