import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOneProduct } from "reducers/asyncThunk/productAsyncThunk";

export default function ProductOrderItem({ item }) {
	console.log(item);
	const dispatch = useDispatch();
	const [product, setProduct] = useState(null);
	useEffect(() => {
		const getInfoProduct = async () => {
			try {
				const response = await dispatch(getOneProduct(item.product)).unwrap();
				setProduct(response.product);
			} catch (error) {
				console.log(error);
			}
		};
		return getInfoProduct();
	}, [dispatch, item.product]);
	return (
		product && (
			<div className="flex gap-x-4 p-2 border-2 rounded-md">
				<div className="w-[100px] h-[100px]">
					<img src={product.image[0]} alt="" className="w-full h-full object-cover" />
				</div>
				<div className="flex flex-col justify-between">
					<a href="/" className="text-[#223263] font-bold">
						{product.name}-{item.color}-{item.size}
					</a>
					<p className="text-blue40 font-bold">
						${item.price} - {item.quantity}
					</p>
				</div>
			</div>
		)
	);
}
