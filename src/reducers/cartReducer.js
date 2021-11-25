import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "user",
	initialState: {
		cart: [],
		amount: 0,
		total: 0,
		coupon: null,
	},
	reducers: {
		clearCart: (state) => {
			state.cart = [];
			state.amount = 0;
			state.total = 0;
			state.coupon = null;
			localStorage.removeItem("cart");
		},
		addVoucher: (state, action) => {
			state.coupon = action.payload;
			localStorage.setItem("cart", JSON.stringify(state));
		},
		removeVoucher: (state) => {
			state.coupon = null;
			localStorage.setItem("cart", JSON.stringify(state));
		},
		setCartFromLocalStorage: (state) => {
			let cartLocal = JSON.parse(localStorage.getItem("cart"));
			if (cartLocal) {
				state.cart = cartLocal.cart;
				state.amount = cartLocal.amount;
				state.total = cartLocal.total;
				state.coupon = cartLocal.coupon;
			}
		},
		addToCart: (state, action) => {
			// function update data if id valid or add new
			let index = state.cart.findIndex(
				(item) =>
					item.id === action.payload.id &&
					item.color === action.payload.color &&
					item.size === action.payload.size
			);
			if (index !== -1) {
				if (action.payload.amount + state.amount <= 5) {
					state.cart[index].amount += action.payload.amount;
				} else {
					state.cart[index].amount += 5 - state.amount;
				}
			} else {
				if (action.payload.amount <= 5) {
					state.cart.push(action.payload);
				} else {
					state.cart.push({
						...action.payload,
						amount: 5 - state.amount,
					});
				}
				// action.payload.amount = 5 - state.amount;
				// state.cart.push(action.payload);
			}
			state.total += action.payload.total;
			state.amount = state.cart.reduce((acc, item) => {
				return acc + item.amount;
			}, 0);
			localStorage.setItem("cart", JSON.stringify(state));
		},
		removeFromCart: (state, action) => {
			state.cart = state.cart.filter(
				(item) => item.name + " - " + item.color + " - " + item.size !== action.payload
			);
			state.total = state.cart.reduce((acc, item) => {
				return acc + item.total;
			}, 0);
			state.amount = state.cart.reduce((acc, item) => {
				return acc + item.amount;
			}, 0);
			localStorage.setItem("cart", JSON.stringify(state));
		},
		changeAmountItem: (state, action) => {
			state.cart.forEach((item) => {
				if (item.name + " - " + item.color + " - " + item.size === action.payload.name) {
					switch (action.payload.type) {
						case 1:
							if (item.amount < item.max && state.amount < 5) item.amount++;
							break;
						case -1:
							if (item.amount > 1) item.amount--;
							break;
						default:
							break;
					}
					item.total = item.amount * item.price;
				}
			});
			state.total = state.cart.reduce((acc, item) => {
				return acc + item.total;
			}, 0);
			state.amount = state.cart.reduce((acc, item) => {
				return acc + item.amount;
			}, 0);
			localStorage.setItem("cart", JSON.stringify(state));
		},
	},
});

export const {
	removeVoucher,
	addVoucher,
	addToCart,
	removeFromCart,
	changeAmountItem,
	setCartFromLocalStorage,
	clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
