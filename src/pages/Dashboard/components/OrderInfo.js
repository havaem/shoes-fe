import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cancelOrder, getAllOrders } from "reducers/asyncThunk/orderAsyncThunk";
import { errorNoti } from "reducers/notiReducer";
import OrderItem from "./OrderItem";

export default function OrderInfo() {
	const dispatch = useDispatch();
	const [orders, setOrders] = useState([]);
	const getAll = async () => {
		try {
			const response = await dispatch(getAllOrders()).unwrap();
			setOrders(response);
		} catch (error) {
			dispatch(errorNoti({ message: error.message, delay: 1500 }));
		}
	};
	const handleCancelOrder = async (id) => {
		if (window.confirm("Are you sure to cancel this order?")) {
			try {
				await dispatch(cancelOrder(id));
				getAll();
			} catch (error) {
				console.log(error);
			}
		}
	};
	useEffect(() => {
		getAll();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			{orders.map((e) => (
				<OrderItem order={e} handleCancelOrder={handleCancelOrder} />
			))}
		</>
	);
}
