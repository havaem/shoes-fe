import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "reducers/cartReducer";
import notiReducer from "reducers/notiReducer";
import productReducer from "reducers/productReducer";
import userReducer from "reducers/userReducer";

export const store = configureStore({
	reducer: {
		user: userReducer,
		noti: notiReducer,
		product: productReducer,
		cart: cartReducer,
	},
});
