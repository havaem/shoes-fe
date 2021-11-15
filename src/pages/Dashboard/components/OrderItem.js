import { useState } from "react";
import OrderItemDetail from "./OrderItemDetail";

export default function OrderItem() {
	const [isShowAction, setIsShowAction] = useState(false);
	return (
		<div className="border-[#EBF0FF] mb-4 p-4 bg-white border-2 rounded-md">
			<h3 className="text-[#223263] mb-3 text-xl font-bold">LQNSU346JK</h3>
			<p className="text-[#9098b1] pb-3 border-b border-dashed">Order at E-comm : August 1, 2017</p>
			<ul className="flex flex-col gap-y-3 my-3">
				<li className="flex justify-between">
					<h5 className="text-[#9098b1]">Order Status</h5>
					<p>Shipping</p>
				</li>
				<li className="flex justify-between">
					<h5 className="text-[#9098b1]">Items</h5>
					<p>2 Items purchased</p>
				</li>
				<li className="flex justify-between">
					<h5 className="text-[#9098b1]">Price</h5>
					<p className="text-blue40 font-bold">$299,43</p>
				</li>
			</ul>
			<div className="flex justify-end">
				<button
					className="px-4 py-2 hover:text-blue33 text-white bg-blue33 hover:bg-white border rounded-md transition-all"
					onClick={() => {
						setIsShowAction(!isShowAction);
					}}
				>
					More info
				</button>
			</div>
			{isShowAction && <OrderItemDetail />}
		</div>
	);
}
