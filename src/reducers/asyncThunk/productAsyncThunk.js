import productApi from "apis/productApi";

const { createAsyncThunk } = require("@reduxjs/toolkit");

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
		/* 
		data : {
			id
			rating
		}
		 */
		const response = await productApi.rating(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
