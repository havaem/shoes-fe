import { useState } from "react";
import { useDispatch } from "react-redux";
import { convertTimestampToDate } from "utils";
import OrderItemDetail from "./OrderItemDetail";

export default function OrderItem({ order, handleCancelOrder }) {
	const [isShowAction, setIsShowAction] = useState(false);
	const renderStatusOrder = (status) => {
		switch (status) {
			case 1:
				return "Confirming";
			case 2:
				return "Confirmed";
			case 3:
				return "Completed";
			case 4:
				return "Canceled";
			default:
				return "";
		}
	};
	return (
		<div className="border-[#EBF0FF] mb-4 p-4 bg-white border-2 rounded-md">
			<h3 className="text-[#223263] mb-3 text-xl font-bold">{order._id}</h3>
			<p className="text-[#9098b1] pb-3 border-b border-dashed">
				Order at South : {convertTimestampToDate(order.createdAt)}
			</p>
			<ul className="flex flex-col gap-y-3 my-3">
				<li className="flex justify-between">
					<h5 className="text-[#9098b1]">Order Status</h5>
					<p>{renderStatusOrder(order.status)}</p>
				</li>
				<li className="flex justify-between">
					<h5 className="text-[#9098b1]">Items</h5>
					<p>{order.cart.reduce((total, item) => total + item.quantity, 0)} items purchased</p>
				</li>
				<li className="flex justify-between">
					<h5 className="text-[#9098b1]">Price</h5>
					<p className="text-blue40 font-bold">${order.totalPrice}</p>
				</li>
			</ul>
			<div className="flex gap-x-2 justify-end">
				<button
					className="px-4 py-2 hover:text-blue33 text-white bg-blue33 hover:bg-white border rounded-md transition-all"
					onClick={() => {
						setIsShowAction(!isShowAction);
					}}
				>
					More info
				</button>
				{order.status === 1 && (
					<button
						className="px-4 py-2 hover:text-red-400 text-white bg-red-400 hover:bg-white border rounded-md transition-all"
						onClick={() => {
							handleCancelOrder(order._id);
						}}
					>
						Cancel
					</button>
				)}
			</div>
			{isShowAction && <OrderItemDetail order={order} />}
		</div>
	);
}
