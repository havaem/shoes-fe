import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const notiSlice = createSlice({
	name: "noti",
	initialState: {},
	reducers: {
		successNoti: (_state, { payload }) => {
			toast.success(payload.message, {
				autoClose: payload.delay || 3000,
			});
		},
		errorNoti: (_state, { payload }) => {
			toast.error(payload.message, {
				autoClose: payload.delay || 3000,
			});
		},
		warningNoti: (_state, { payload }) => {
			toast.warning(payload.message, {
				autoClose: payload.delay || 3000,
			});
		},
		infoNoti: (_state, { payload }) => {
			toast.info(payload.message, {
				autoClose: payload.delay || 3000,
			});
		},
	},
});
export const { successNoti, errorNoti, warningNoti, infoNoti } = notiSlice.actions;
export default notiSlice.reducer;
