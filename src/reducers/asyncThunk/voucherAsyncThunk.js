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
