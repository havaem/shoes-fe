import { createSlice } from "@reduxjs/toolkit";
import { createOneComment } from "./asyncThunk/commentAsyncThunk";

export const commentSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {},
	extraReducers: {
		[createOneComment.pending]: (state) => {
			// state.loading = true;
		},
		[createOneComment.rejected]: (state) => {
			// state.loading = false;
		},
		[createOneComment.fulfilled]: (state, { payload }) => {
			// state.loading = false;
		},
	},
});
export default commentSlice.reducer;
