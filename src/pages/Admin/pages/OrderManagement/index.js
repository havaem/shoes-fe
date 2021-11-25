import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllOrdersByAdmin, updateOneOrder } from "reducers/asyncThunk/orderAsyncThunk";
import { errorNoti, successNoti } from "reducers/notiReducer";
import DetailOrder from "./components/DetailOrder";

export default function OrderManagement() {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [orders, setOrders] = useState([]);
	const [filter, setFilter] = useState("");
	const getAllOrder = useCallback(async () => {
		try {
			const response = await dispatch(getAllOrdersByAdmin()).unwrap();
			setData(response);
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);
	const renderStatusOrder = (status) => {
		switch (status) {
			case 1:
				return <p className="text-green-500 font-bold">Confirming</p>;
			case 2:
				return <p className="text-yellow-500 font-bold">Confirmed</p>;
			case 3:
				return <p className="text-blue-500 font-bold">Completed</p>;
			case 4:
				return <p className="text-red-500 font-bold">Canceled</p>;
			default:
				return "";
		}
	};
	const handleCancel = async (id) => {
		try {
			const response = await dispatch(
				updateOneOrder({
					id: id,
					data: {
						status: 4,
					},
				})
			).unwrap();
			dispatch(successNoti({ message: response.message }));
			getAllOrder();
		} catch (error) {
			dispatch(errorNoti({ message: error.message }));
			console.log(error);
		}
	};
	const [showInfo, setShowInfo] = useState(null);
	const handleInfo = () => {
		return showInfo && <DetailOrder order={showInfo} />;
	};
	const handleNext = async (id, status) => {
		try {
			const response = await dispatch(
				updateOneOrder({
					id: id,
					data: {
						status: status + 1,
					},
				})
			).unwrap();
			dispatch(successNoti({ message: response.message }));
			getAllOrder();
		} catch (error) {
			dispatch(errorNoti({ message: error.message }));
			console.log(error);
		}
	};
	useEffect(() => {
		let dataFilter;
		dataFilter = data.filter((e) =>
			e.userCreate.email.toLowerCase().includes(filter.trim().toLowerCase())
		);
		setOrders(dataFilter);
	}, [data, filter]);
	useEffect(() => {
		return getAllOrder();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<div>
				<div>
					<input
						type="text"
						placeholder="Search by email"
						value={filter}
						onChange={(event) => {
							setFilter(event.target.value);
						}}
						className="px-4 py-2 w-full border rounded-md outline-none"
					/>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-[1000px] relative mt-4 w-full bg-white">
					<thead>
						<tr>
							<th className="min-w-[50px] py-2 border-b">Status</th>
							<th className="min-w-[80px] py-2 border-b">Name</th>
							<th className="min-w-[150px] py-2 border-b">Address</th>
							<th className="py-2 border-b">Pay</th>
							<th className="py-2 border-b">Action</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td className="py-2 text-center">{renderStatusOrder(order.status)}</td>
								<td className="py-2 text-center">{order.info.name}</td>
								<td className="py-2 text-center">{order.info.address}</td>
								<td className="py-2 text-center">
									{order.info.methodPayment === 1 ? "Paid" : "COD"}
								</td>
								<td className="flex gap-x-2 justify-center py-2">
									<button
										className="px-4 py-2 text-white bg-yellow-500 rounded-md"
										onClick={() => setShowInfo(order)}
									>
										Info
									</button>
									{order.status !== 3 && order.status !== 4 && (
										<>
											<button
												className="px-4 py-2 text-white bg-green-500 rounded-md"
												onClick={() => handleNext(order._id, order.status)}
											>
												Next
											</button>
											<button
												className="px-4 py-2 text-white bg-red-500 rounded-md"
												onClick={() => handleCancel(order._id)}
											>
												Cancel
											</button>
										</>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="mt-4 bg-white">{handleInfo()}</div>
			</div>
		</>
	);
}
