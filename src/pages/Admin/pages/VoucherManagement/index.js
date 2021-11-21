import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { errorNoti, successNoti } from "reducers/notiReducer";

import { createVoucher, deleteVoucher, getAllVouchers } from "reducers/asyncThunk/voucherAsyncThunk";
import ItemTableVoucher from "./components/ItemTableVoucher";
export default function VoucherManagement() {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [vouchers, setVouchers] = useState([]);
	const [filter, setFilter] = useState("");
	const getAllVoucher = useCallback(async () => {
		try {
			const response = await dispatch(getAllVouchers()).unwrap();
			setData(response);
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);
	const handleDelete = async (id) => {
		try {
			const response = await dispatch(deleteVoucher(id)).unwrap();
			dispatch(successNoti({ message: response.message }));
			getAllVoucher()
		} catch (error) {
			dispatch(errorNoti({ message: error.message }));
			console.log(error);
		}
	};
	const handleAdd = async () => {
		try {
			setShowFormAdd((pre) => !pre);
			const response = await dispatch(createVoucher(voucherNew)).unwrap();
			dispatch(successNoti({ message: response.message }));
			setVoucherNew({
				type: 1,
				code: "",
				price: { basic: 0, percent: 0 },
				uses: "",
			});
			getAllVoucher();
		} catch (error) {
			dispatch(errorNoti({ message: error.message }));
			console.log(error);
		}
	};
	const [voucherNew, setVoucherNew] = useState({
		type: 1,
		code: "",
		price: {
			basic: 0,
			percent: 0,
		},
		uses: "",
	});
	const [showFormAdd, setShowFormAdd] = useState(false);
	useEffect(() => {
		let dataFilter;
		dataFilter = data.filter((e) => e.code.toLowerCase().includes(filter.toLowerCase()));
		setVouchers(dataFilter);
	}, [data, filter]);
	useEffect(() => {
		return getAllVoucher();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<div>
				<button
					className="mb-2 px-4 py-2 text-white bg-blue-500 rounded-md"
					onClick={() => {
						setShowFormAdd((pre) => !pre);
					}}
				>
					Add
				</button>
				{showFormAdd && (
					<div className="flex flex-col gap-y-2 justify-end mb-2 p-2">
						<div className="flex gap-x-4 items-center">
							<label htmlFor="type">Type:</label>
							<select
								name="type"
								id="type"
								className="w-full bg-gray-100 outline-none"
								value={voucherNew.type}
								onChange={(e) => {
									setVoucherNew({ ...voucherNew, type: e.target.value });
								}}
							>
								<option value="1">1</option>
								<option value="2">2</option>
							</select>
						</div>
						<div className="flex gap-x-4 items-center">
							<label htmlFor="code">Code:</label>
							<input
								type="text"
								name="voucher"
								id="code"
								className="w-full bg-gray-100"
								value={voucherNew.code}
								onChange={(e) => {
									setVoucherNew({ ...voucherNew, code: e.target.value });
								}}
							/>
						</div>
						<div className="flex gap-x-4 items-center">
							<label htmlFor="price">Price:</label>
							<input
								type="number"
								name="price"
								id="price"
								className="w-full bg-gray-100"
								onChange={(e) => {
									voucherNew.type === 1
										? setVoucherNew({ ...voucherNew, price: { basic: e.target.value } })
										: setVoucherNew({
												...voucherNew,
												price: { percent: e.target.value },
										  });
								}}
							/>
						</div>
						<div className="flex gap-x-4 items-center">
							<label htmlFor="uses">Uses:</label>
							<input
								type="number"
								min="0"
								ame="uses"
								id="uses"
								className="w-full bg-gray-100"
								value={voucherNew.uses}
								onChange={(e) => {
									setVoucherNew({ ...voucherNew, uses: e.target.value });
								}}
							/>
						</div>
						<button
							className="mb-2 px-4 py-2 text-white bg-purple-500 rounded-md"
							onClick={handleAdd}
						>
							Submit
						</button>
					</div>
				)}
				<div>
					<input
						type="text"
						placeholder="Search by code"
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
							<th className="min-w-[50px] py-2 border-b">Type</th>
							<th className="min-w-[80px] py-2 border-b">Code</th>
							<th className="min-w-[150px] py-2 border-b">Price</th>
							<th className="py-2 border-b">Uses</th>
							<th className="py-2 border-b">Action</th>
						</tr>
					</thead>
					<tbody>
						{vouchers.map((e) => (
							<ItemTableVoucher voucher={e} key={e._id} handleDelete={handleDelete} />
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
