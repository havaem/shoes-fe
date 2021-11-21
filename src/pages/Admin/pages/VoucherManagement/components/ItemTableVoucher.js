import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateVoucher } from "reducers/asyncThunk/voucherAsyncThunk";
import { errorNoti, successNoti } from "reducers/notiReducer";
export default function ItemTableVoucher({ voucher, handleDelete }) {
	const dispatch = useDispatch();
	const [info, setInfo] = useState({
		type: voucher.type,
		code: voucher.code,
		price: voucher.price,
		uses: voucher.uses,
	});
	const handleSave = async () => {
		try {
			const response = await dispatch(updateVoucher({ id: voucher._id, data: info })).unwrap();
			dispatch(successNoti({ message: response.message }));
		} catch (error) {
			dispatch(errorNoti({ message: error.message }));
			console.log(error);
		}
	};
	const [showInputType, setShowInputType] = useState(false);
	const [showInputCode, setShowInputCode] = useState(false);
	const [showInputPrice, setShowInputPrice] = useState(false);
	const [showInputUses, setShowInputUses] = useState(false);
	return (
		<tr>
			<td className="max-w-[80px] px-2 py-2 text-center">
				{showInputType ? (
					<input
						type="number"
						className="w-full"
						min={0}
						value={info.type}
						onChange={(e) => {
							setInfo({
								...info,
								type: e.target.value,
							});
						}}
						onBlur={() => {
							setShowInputType(false);
						}}
						onKeyUp={(e) => {
							if (e.keyCode === 13) {
								setShowInputType(false);
							}
						}}
					/>
				) : (
					<p
						onClick={() => {
							setShowInputType(true);
						}}
					>
						{info.type}
					</p>
				)}
			</td>
			<td className="max-w-[80px] px-2 py-2 text-center">
				{showInputCode ? (
					<input
						type="text"
						className="w-full"
						value={info.code}
						onChange={(e) => {
							setInfo({
								...info,
								code: e.target.value,
							});
						}}
						onBlur={() => {
							setShowInputCode(false);
						}}
						onKeyUp={(e) => {
							if (e.keyCode === 13) {
								setShowInputCode(false);
							}
						}}
					/>
				) : (
					<p
						onClick={() => {
							setShowInputCode(true);
						}}
					>
						{info.code}
					</p>
				)}
			</td>
			<td className="px-2 py-2 text-center">
				{showInputPrice ? (
					info.type === 1 ? (
						<input
							type="number"
							className="w-full"
							min={0}
							value={info.price.basic}
							onChange={(e) => {
								setInfo({
									...info,
									price: { ...info.price, basic: e.target.value },
								});
							}}
							onBlur={() => {
								setShowInputPrice(false);
							}}
							onKeyUp={(e) => {
								if (e.keyCode === 13) {
									setShowInputPrice(false);
								}
							}}
						/>
					) : (
						<input
							type="number"
							className="w-full"
							min={0}
							max={100}
							value={info.price.percent}
							onChange={(e) => {
								e.target.value = e.target.value > 100 ? 100 : e.target.value;
								setInfo({
									...info,
									price: { ...info.price, percent: e.target.value },
								});
							}}
							onBlur={() => {
								setShowInputPrice(false);
							}}
							onKeyUp={(e) => {
								if (e.keyCode === 13) {
									setShowInputPrice(false);
								}
							}}
						/>
					)
				) : (
					<p
						onClick={() => {
							setShowInputPrice(true);
						}}
					>
						{info.type === 1 ? `$${info.price.basic}` : `${info.price.percent}%`}
					</p>
				)}
			</td>
			<td className="max-w-[50px] px-2 py-2 text-center">
				{showInputUses ? (
					<input
						type="number"
						className="w-full"
						min={0}
						value={info.uses}
						onChange={(e) => {
							setInfo({
								...info,
								uses: e.target.value,
							});
						}}
						onBlur={() => {
							setShowInputUses(false);
						}}
						onKeyUp={(e) => {
							if (e.keyCode === 13) {
								setShowInputUses(false);
							}
						}}
					/>
				) : (
					<p
						onClick={() => {
							setShowInputUses(true);
						}}
					>
						{info.uses}
					</p>
				)}
			</td>
			<td className="px-2 py-2 text-center">
				<button className="px-2 py-1 text-white bg-green-500 rounded-md" onClick={handleSave}>
					Save
				</button>
				<button
					className="ml-2 px-2 py-1 text-white bg-red-500 rounded-md"
					onClick={() => handleDelete(voucher._id)}
				>
					Delete
				</button>
			</td>
		</tr>
	);
}
