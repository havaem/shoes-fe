import { createAsyncThunk } from "@reduxjs/toolkit";
import orderApi from "apis/orderApi";

export const createOrder = createAsyncThunk("order/createOrder", async (data, { rejectWithValue }) => {
	try {
		const response = await orderApi.createOne(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const getAllOrders = createAsyncThunk("order/getAllOrders", async (data, { rejectWithValue }) => {
	try {
		const response = await orderApi.getAll();
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const cancelOrder = createAsyncThunk("order/cancelOrder", async (data, { rejectWithValue }) => {
	try {
		const response = await orderApi.cancelOrder(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

// admin
export const getAllOrdersByAdmin = createAsyncThunk(
	"order/getAllOrdersByAdmin",
	async (data, { rejectWithValue }) => {
		try {
			const response = await orderApi.getAllAdmin();
			return response;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
export const updateOneOrder = createAsyncThunk("order/updateOneOrder", async (data, { rejectWithValue }) => {
	try {
		const response = await orderApi.updateOne(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
