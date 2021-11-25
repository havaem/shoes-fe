import { createSlice } from "@reduxjs/toolkit";
import {
	changeWhiteListUser,
	currentUser,
	loginGoogleUser,
	loginUser,
	registerUser,
} from "./asyncThunk/userAsyncThunk";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: {
			name: "",
			email: "",
			picture: "",
			whitelist: [],
			role: 1,
		},
		loading: false,
	},
	reducers: {
		logout: (state) => {
			state.user = {
				name: "",
				email: "",
				picture: "",
				whitelist: "",
				role: 1,
			};
			localStorage.removeItem("token");
		},
	},
	extraReducers: {
		[registerUser.pending]: (state) => {
			state.loading = true;
		},
		[registerUser.rejected]: (state) => {
			state.loading = false;
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			const { user, token } = payload;
			const { name, email, picture, whitelist, role } = user;
			state.user.name = name;
			state.user.email = email;
			state.user.picture = picture;
			state.user.whitelist = whitelist;
			state.user.role = role;
			localStorage.setItem("token", token);
			state.loading = false;
		},
		[loginUser.pending]: (state) => {
			state.loading = true;
		},
		[loginUser.rejected]: (state) => {
			state.loading = false;
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			const { user, token } = payload;
			const { name, email, picture, whitelist, role } = user;
			state.user.name = name;
			state.user.email = email;
			state.user.picture = picture;
			state.user.whitelist = whitelist;
			state.user.role = role;

			localStorage.setItem("token", token);
			state.loading = false;
		},
		[loginGoogleUser.pending]: (state) => {
			state.loading = true;
		},
		[loginGoogleUser.rejected]: (state) => {
			state.loading = false;
		},
		[loginGoogleUser.fulfilled]: (state, { payload }) => {
			const { user, token } = payload;
			const { name, email, picture, whitelist, role } = user;
			state.user.name = name;
			state.user.email = email;
			state.user.picture = picture;
			state.user.whitelist = whitelist;
			state.user.role = role;
			localStorage.setItem("token", token);
			state.loading = false;
		},
		[currentUser.pending]: (state) => {
			state.loading = true;
		},
		[currentUser.rejected]: (state) => {
			state.loading = false;
		},
		[currentUser.fulfilled]: (state, { payload }) => {
			const { user, token } = payload;
			const { name, email, picture, whitelist, role } = user;
			state.user.name = name;
			state.user.email = email;
			state.user.picture = picture;
			state.user.whitelist = whitelist;
			state.user.role = role;
			localStorage.setItem("token", token);
			state.loading = false;
		},
		[changeWhiteListUser.fulfilled]: (state, { payload }) => {
			state.user.whitelist = payload.whitelist;
		},
	},
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
