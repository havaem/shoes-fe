import product from "assets/images/product.png";
export default function OrderItemDetail() {
	return (
		<div className="flex flex-col gap-y-4">
			<div>
				<h3 className="text-[#223263] text-md mb-3 font-medium">Shipping Detail</h3>
				<ul className="flex flex-col gap-y-3 my-3">
					<li className="flex justify-between">
						<h5 className="text-[#9098b1]">Name</h5>
						<p>Võ Hoài Nam</p>
					</li>
					<li className="flex justify-between">
						<h5 className="text-[#9098b1]">Address</h5>
						<p>Việt Nam</p>
					</li>
					<li className="flex justify-between">
						<h5 className="text-[#9098b1]">Last action</h5>
						<p>30/04/1975 12:00PM</p>
					</li>
					<li className="flex justify-between">
						<h5 className="text-[#9098b1]">Methods of payment</h5>
						<p className="text-blue40 font-bold">Paypal</p>
					</li>
				</ul>
			</div>
			<div>
				<h3 className="text-[#223263] text-md mb-3 font-medium">Product</h3>
				<div className="grid gap-4 grid-cols-2 md:grid-cols-1">
					<div className="flex gap-x-4 p-2 border-2 rounded-md">
						<div className="w-[100px] h-[100px]">
							<img src={product} alt="" className="w-full h-full object-cover" />
						</div>
						<div className="flex flex-col justify-between">
							<a href="/" className="text-[#223263] font-bold">
								Nike Air Zoom Pegasus 36 Miami
							</a>
							<p className="text-blue40 font-bold">$299,43</p>
						</div>
					</div>
					<div className="flex gap-x-4 p-2 border-2 rounded-md">
						<div className="w-[100px] h-[100px]">
							<img src={product} alt="" className="w-full h-full object-cover" />
						</div>
						<div className="flex flex-col justify-between">
							<a href="/" className="text-[#223263] font-bold">
								Nike Air Zoom Pegasus 36 Miami
							</a>
							<p className="text-blue40 font-bold">$299,43</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
