import { createSlice } from "@reduxjs/toolkit";
import { getAllProduct, getOneProduct } from "./asyncThunk/productAsyncThunk";

export const productSlice = createSlice({
	name: "user",
	initialState: {
		products: [],
		loading: true,
	},
	reducers: {},
	extraReducers: {
		[getAllProduct.pending]: (state) => {
			state.loading = true;
		},
		[getAllProduct.rejected]: (state) => {
			state.loading = false;
		},
		[getAllProduct.fulfilled]: (state, { payload }) => {
			state.products = payload;
			state.loading = false;
		},
		[getOneProduct.pending]: (state) => {
			state.loading = true;
		},
		[getOneProduct.rejected]: (state) => {
			state.loading = false;
		},
		[getOneProduct.fulfilled]: (state, { payload }) => {
			state.loading = false;
		},
	},
});
export const { logout } = productSlice.actions;
export default productSlice.reducer;
