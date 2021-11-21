import { createAsyncThunk } from "@reduxjs/toolkit";
import voucherApi from "apis/voucherApi";

export const getVoucher = createAsyncThunk("cart/getVoucher", async (data, { rejectWithValue }) => {
	try {
		const response = await voucherApi.getOne(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
// Admin
export const getAllVouchers = createAsyncThunk(
	"voucher/getAllVouchers",
	async (_data, { rejectWithValue }) => {
		try {
			const response = await voucherApi.getAll();
			return response;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);
export const createVoucher = createAsyncThunk("voucher/createVoucher", async (data, { rejectWithValue }) => {
	try {
		const response = await voucherApi.create(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const deleteVoucher = createAsyncThunk("voucher/deleteVoucher", async (data, { rejectWithValue }) => {
	try {
		const response = await voucherApi.delete(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
export const updateVoucher = createAsyncThunk("voucher/updateVoucher", async (data, { rejectWithValue }) => {
	try {
		const response = await voucherApi.update(data);
		return response;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});
