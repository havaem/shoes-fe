import { pathConstant } from "constant/pathConstant";
import { CartContext } from "contexts/CartContext";
import { useContext, useEffect, useState } from "react";
import { CloseOutline } from "react-ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getVoucher } from "reducers/asyncThunk/voucherAsyncThunk";
import { addVoucher, removeVoucher } from "reducers/cartReducer";
import { errorNoti, successNoti, warningNoti } from "reducers/notiReducer";
import ItemCart from "./components/ItemCart";
import MakePayment from "./components/MakePayment";

const Cart = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { statusCart, setStatusCart } = useContext(CartContext);
	const cart = useSelector((state) => state.cart);
	const [total, setTotal] = useState(0);
	const [voucher, setVoucher] = useState("");
	const [voucherPrice, setVoucherPrice] = useState(0);
	const user = useSelector((state) => state.user.user.email);
	const handleClick = () => {
		if (user) {
			if (!statusCart) {
				setStatusCart(true);
				document.body.classList.add("overflow-y-hidden");
			} else {
				setStatusCart(false);
				document.body.classList.remove("overflow-y-hidden");
			}
		} else {
			dispatch(warningNoti({ message: "You need to login to checkout!" }));
			history.push(`${pathConstant.login}`);
		}
	};
	const handleRedeemVoucher = async () => {
		try {
			const response = await dispatch(getVoucher(voucher)).unwrap();
			dispatch(
				addVoucher({
					id: response._id,
					code: response.code,
					type: response.type,
					price: { ...response.price },
				})
			);
			dispatch(successNoti({ message: "Add voucher success!" }));
		} catch (error) {
			dispatch(errorNoti({ message: error.message }));
		}
	};
	const handleRemoveVoucher = async () => {
		setVoucher("");
		setVoucherPrice(0);
		dispatch(removeVoucher());
	};
	useEffect(() => {
		setTotal(cart.total + 20);
	}, [cart.total]);
	useEffect(() => {
		if (cart.coupon && total > 0) {
			setVoucher(cart.coupon.code);
			if (cart.coupon.type === 1) {
				setVoucherPrice(cart.coupon.price.basic);
			} else if (cart.coupon.type === 2) {
				setVoucherPrice((cart.total * cart.coupon.price.percent) / 100);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cart.coupon, total]);
	useEffect(() => {
		if (voucherPrice !== 0) setTotal(total - voucherPrice);
		else setTotal(cart.total + 20);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [voucherPrice]);
	return (
		<section>
			{cart.amount !== 0 ? (
				<>
					<div className="max-w-[1300px] md:mt-[70px] mx-auto xl:px-4">
						<div className="overflow-auto md:min-w-full">
							<table className="md:min-w-[730px] w-full">
								<thead>
									<tr className="text-center border-b-2">
										<th className="py-4 dark:text-whitee2">Product</th>
										<th className="py-4 dark:text-whitee2">Price</th>
										<th className="py-4 dark:text-whitee2">Qty</th>
										<th className="py-4 dark:text-whitee2">Unit Price</th>
									</tr>
								</thead>
								<tbody className="">
									{cart.cart.map((e) => (
										<ItemCart
											key={e.name + " - " + e.color + " - " + e.size}
											product={e}
										/>
									))}
								</tbody>
							</table>
						</div>
						<div className="flex flex-wrap gap-y-4 justify-between mb-4 mt-8 lg:justify-center">
							<div className="max-w-[370px] h-[60px] relative w-full">
								<input
									type="text"
									className="pr-[120px] pl-4 py-2 w-full h-full dark:text-whitee2 dark:bg-black1f border-2 dark:border-gray-200 border-grayf1 rounded-md outline-none"
									value={voucher}
									placeholder="Voucher code"
									onChange={(event) => {
										setVoucher(event.target.value);
									}}
									disabled={cart.coupon}
									name="voucher"
								/>
								{cart.coupon ? (
									<button
										className="px-[21px] absolute right-0 top-0 flex items-center justify-center h-full text-white dark:text-whitee2 dark:bg-black1f bg-blue33 rounded-br-sm rounded-tr-sm"
										onClick={handleRemoveVoucher}
									>
										Remove
									</button>
								) : (
									<button
										className="px-[21px] absolute right-0 top-0 flex items-center justify-center h-full text-white dark:text-whitee2 dark:bg-black1f bg-blue33 rounded-br-sm rounded-tr-sm"
										onClick={handleRedeemVoucher}
									>
										Redeem
									</button>
								)}
							</div>
							<div className="max-w-[370px] w-full dark:text-whitee2">
								<div className="flex flex-col gap-y-4 pb-4 border-b border-grayf1">
									<div className="flex items-center justify-between">
										<p>Subtotal</p>
										<p>${cart.total}</p>
									</div>
									<div className="flex items-center justify-between">
										<p>Shipping fee</p>
										<p>$20</p>
									</div>
									<div className="flex items-center justify-between">
										<p>Coupon</p>
										<p>{!cart.coupon ? "No" : `- $${voucherPrice}`}</p>
									</div>
								</div>
								<div className="flex flex-col gap-y-4 py-4">
									<div className="flex items-center justify-between">
										<p>TOTAL</p>
										<p>${total}</p>
									</div>
									<button
										className="round-md py-3 text-white dark:text-whitee2 dark:bg-black1f bg-blue33"
										onClick={handleClick}
									>
										Check out
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						className={`fixed z-50 inset-0 ${
							statusCart ? "opacity-100 visible" : "opacity-0 invisible"
						}`}
					>
						<div
							className="absolute inset-0 cursor-pointer backdrop-brightness-75"
							onClick={handleClick}
						></div>
						<div
							className={`max-w-[500px] dark:bg-[#242526] fixed bottom-0 right-0 top-0 pt-4 px-8 w-full bg-white overflow-auto transition-all duration-700 ${
								!statusCart
									? "translate-x-full opacity-0 invisible"
									: "translate-x-0 opacity-100 visible"
							}`}
						>
							<div className="flex justify-end">
								<button className="translate-x-2" onClick={handleClick}>
									<CloseOutline color={"#00000"} height="40px" width="40px" />
								</button>
							</div>
							<MakePayment price={total} voucherPrice={voucherPrice} />
						</div>
					</div>
				</>
			) : (
				<div className="flex flex-col items-center justify-center h-full">
					<img
						src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png"
						alt="empty-cart"
						className="max-w-[400px] w-full"
					/>
				</div>
			)}
		</section>
	);
};

export default Cart;
