import product from "assets/images/product.png";
import ProductOrderItem from "./ProductOrderItem";
export default function OrderItemDetail({ order }) {
	return (
		<div className="flex flex-col gap-y-4">
			<div>
				<h3 className="text-[#223263] text-md mb-3 font-medium">Shipping Detail</h3>
				<ul className="flex flex-col gap-y-3 my-3">
					<li className="flex justify-between">
						<h5 className="text-[#9098b1]">Name</h5>
						<p>{order.info.name}</p>
					</li>
					<li className="flex justify-between">
						<h5 className="text-[#9098b1]">Address</h5>
						<p>{order.info.address}</p>
					</li>
					{/* <li className="flex justify-between">
						<h5 className="text-[#9098b1]">Last action</h5>
						<p>30/04/1975 12:00PM</p>
					</li> */}
					<li className="flex justify-between">
						<h5 className="text-[#9098b1]">Methods of payment</h5>
						<p className="text-blue40 font-bold">
							{order.info.methodPayment === 1 ? "Paypal - Paid" : "COD"}
						</p>
					</li>
				</ul>
			</div>
			<div>
				<h3 className="text-[#223263] text-md mb-3 font-medium">Product</h3>
				<div className="grid gap-4 grid-cols-2 md:grid-cols-1">
					{order.cart.map((e) => (
						<ProductOrderItem item={e} />
					))}
				</div>
			</div>
		</div>
	);
}
