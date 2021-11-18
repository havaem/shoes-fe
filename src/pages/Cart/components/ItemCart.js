import { useEffect, useState } from "react";
import { CloseOutline } from "react-ionicons";
import { useDispatch, useSelector } from "react-redux";
import { changeAmountItem, removeFromCart } from "reducers/cartReducer";
import { warningNoti } from "reducers/notiReducer";
const ItemCart = ({ product }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const handleChangeAmount = (type) => {
		if (cart.amount === 5 && type === 1) {
			dispatch(warningNoti({ message: "Max item is 5!", delay: 1500 }));
			return;
		}
		dispatch(changeAmountItem({ type, name: item.name + " - " + item.color + " - " + item.size }));
	};
	const handleRemoveItem = () => {
		dispatch(removeFromCart(item.name + " - " + item.color + " - " + item.size));
	};
	const [item, setItem] = useState(product);
	useEffect(() => {
		setItem(product);
	}, [product]);
	return (
		<tr className="text-center dark:bg-black1f">
			<td className="md:max-w-[430px] flex gap-x-2 items-center py-4">
				<button className="bg-[#fff7f8] p-2 rounded-full" onClick={handleRemoveItem}>
					<CloseOutline color={"#ff4252"} height="20px" width="20px" />
				</button>
				<a href="/" className="flex gap-x-5 items-center dark:text-whitee2">
					<img
						src={item.image}
						alt=""
						className="w-[150px] h-[120px] md:w-[90px] md:h-[80px] rounded-md object-cover"
					/>
					<p>{item.name + " - " + item.color + " - " + item.size}</p>
				</a>
			</td>
			<td className="py-4 dark:text-whitee2">{item.price}</td>
			<td className="py-4 dark:text-whitee2">
				<button
					className="w-[40px] h-full"
					onClick={() => {
						handleChangeAmount(-1);
					}}
				>
					-
				</button>
				<input
					type="number"
					min="0"
					value={item.amount}
					className="amount w-[40px] h-full text-center dark:text-whitee2 bg-transparent outline-none"
					disabled
				/>
				<button
					className="w-[40px] h-full"
					onClick={() => {
						handleChangeAmount(1);
					}}
				>
					+
				</button>
			</td>
			<td className="py-4 dark:text-whitee2">{item.total}</td>
		</tr>
	);
};
export default ItemCart;
