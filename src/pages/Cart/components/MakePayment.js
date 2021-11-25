import { useForm } from "react-hook-form";
import { ErrorMessage } from "./ErrorMessage";
import { PayPalButton } from "react-paypal-button-v2";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "reducers/asyncThunk/orderAsyncThunk";
import { clearCart } from "reducers/cartReducer";
import { useHistory } from "react-router";
import { pathConstant } from "constant/pathConstant";
import { CartContext } from "contexts/CartContext";
export default function MakePayment({ price, voucherPrice }) {
	const dispatch = useDispatch();
	const { setStatusCart } = useContext(CartContext);
	const history = useHistory();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "all" });
	const cart = useSelector((state) => state.cart);
	const onSubmit = (data) => {
		if (data.payment === "1") {
			console.log("submit");
			if (paid) {
				dispatch(
					createOrder({
						info: {
							name: data.fullName,
							address: data.address,
							phone: data.phone,
							email: data.email,
							methodPayment: +data.payment,
							coupon: {
								voucher: cart.coupon ? cart.coupon.id : null,
								price: voucherPrice,
							},
						},
						cart: cart.cart.map((e) => {
							return {
								product: e.id,
								color: e.color,
								size: e.size,
								quantity: e.amount,
								price: e.total,
							};
						}),
						totalPrice: cart.total + 20,
					})
				);
				dispatch(clearCart());
				setStatusCart(false);
				history.push(`${pathConstant.dashboard}/order-info`);
				document.body.classList.remove("overflow-y-hidden");
			} else {
				alert("You need to pay this order or change method to create order!");
			}
		} else {
			dispatch(
				createOrder({
					info: {
						name: data.fullName,
						address: data.address,
						phone: data.phone,
						email: data.email,
						methodPayment: +data.payment,
						coupon: {
							voucher: cart.coupon ? cart.coupon.id : null,
							price: voucherPrice,
						},
					},
					cart: cart.cart.map((e) => {
						return {
							product: e.id,
							color: e.color,
							size: e.size,
							quantity: e.amount,
							price: e.total,
						};
					}),
					totalPrice: cart.total + 20,
				})
			);
			dispatch(clearCart());
			setStatusCart(false);
			history.push(`${pathConstant.dashboard}/order-info`);
			document.body.classList.remove("overflow-y-hidden");
		}
	};

	const [paid, setPaid] = useState(false);
	const [isVisiblePaypal, setIsVisiblePaypal] = useState(false);
	return (
		<form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<input
					{...register("fullName", {
						required: "This is a required infomation!",
						maxLength: {
							value: 20,
							message: "Max length is 20 characters!",
						},
					})}
					className="bg-[#f5f5f5] px-3 py-2 w-full rounded-md outline-none"
					type="text"
					placeholder="Full Name"
				/>
				<ErrorMessage>{errors.fullName && errors.fullName.message}</ErrorMessage>
			</div>
			<div>
				<input
					{...register("email", {
						required: "This is a required infomation!",
						pattern: {
							value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: "Invalid email address!",
						},
					})}
					className="bg-[#f5f5f5] px-3 py-2 w-full rounded-md outline-none"
					// type="email"
					placeholder="Email Address"
				/>
				<ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
			</div>
			<div>
				<input
					{...register("phone", {
						required: "This is a required infomation!",
						pattern: {
							value: /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g,
							message: "Invalid phone number!",
						},
					})}
					className="bg-[#f5f5f5] px-3 py-2 w-full rounded-md outline-none"
					type="text"
					placeholder="Mobile Phone"
				/>
				<ErrorMessage>{errors.phone && errors.phone.message}</ErrorMessage>
			</div>
			<div>
				<input
					{...register("address", {
						required: "This is a required infomation!",
					})}
					className="bg-[#f5f5f5] px-3 py-2 w-full rounded-md outline-none"
					type="text"
					placeholder="Address for Delivery"
				/>
				<ErrorMessage>{errors.address && errors.address.message}</ErrorMessage>
			</div>
			<div>
				<p className="text-[#40BFFF] leading-[23px] mb-3 font-semibold">Method of Payment</p>
				<select
					className="bg-[#f5f5f5] pl-2 w-full h-10 rounded-md outline-none"
					{...register("payment", {
						onChange: (e) => {
							if (e.target.value === "1") {
								setIsVisiblePaypal(true);
							} else {
								setIsVisiblePaypal(false);
							}
						},
					})}
				>
					<option value="2">COD</option>
					<option value="1">Paypal</option>
				</select>
				<ErrorMessage>{errors.payment && errors.payment.message}</ErrorMessage>
			</div>
			{isVisiblePaypal && (
				<div>
					<PayPalButton
						options={{
							clientId: process.env.REACT_APP_PRODUCTION_CLIENT_ID,
						}}
						shippingPreference="NO_SHIPPING"
						amount={price.toFixed(2)}
						onSuccess={() => {
							alert("Transaction completed");
							setPaid(true);
						}}
					/>
				</div>
			)}
			<button className="mb-6 py-3 w-full text-white bg-blue33 rounded-md">Go To Payment</button>
		</form>
	);
}
