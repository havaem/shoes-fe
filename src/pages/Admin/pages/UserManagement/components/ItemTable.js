import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "reducers/asyncThunk/userAsyncThunk";
import { errorNoti, successNoti } from "reducers/notiReducer";
import { uploadImage } from "utils";

export default function ItemTable({ user }) {
	const dispatch = useDispatch();
	const [info, setInfo] = useState({
		role: user.role,
		picture: user.picture,
		name: user.name,
	});
	const [showInputName, setShowInputName] = useState(false);
	const [inputFile, setInputFile] = useState(null);
	const handleSave = async () => {
		try {
			if (inputFile) {
				const imgURL = await uploadImage("avatar", inputFile);
				const response = await dispatch(
					updateUser({
						id: user._id,
						data: {
							role: user.role,
							picture: imgURL,
							name: user.name,
						},
					})
				).unwrap();
				dispatch(successNoti({ message: response.message }));
			} else {
				const response = await dispatch(
					updateUser({
						id: user._id,
						data: {
							role: user.role,
							picture: user.picture,
							name: user.name,
						},
					})
				).unwrap();
				dispatch(successNoti({ message: response.message }));
			}
		} catch (error) {
			dispatch(errorNoti({ message: error.message }));
			console.log(error);
		}
	};
	return (
		<tr>
			<td className="px-2 py-2 text-center font-bold">
				<input
					type="checkbox"
					name="role"
					checked={info.role === 0}
					onChange={(e) => {
						setInfo({ ...info, role: e.target.checked ? 0 : 1 });
					}}
				/>
			</td>
			<td className="sticky left-0 px-2 py-2 text-center bg-white">
				<label htmlFor="avt" title="Change avatar">
					<img
						src={info.picture}
						alt="user"
						className="mx-auto w-12 h-12 rounded-full cursor-pointer"
					/>
				</label>
				<input
					type="file"
					id="avt"
					accept="image/*"
					className="hidden w-full h-full"
					onChange={(e) => {
						setInfo({ ...info, picture: URL.createObjectURL(e.target.files[0]) });
						setInputFile(e.target.files[0]);
					}}
				/>
			</td>
			<td className="left-[70px] sticky px-2 py-2 bg-white">
				{showInputName ? (
					<input
						type="text"
						className="w-full"
						value={info.name}
						onChange={(e) => {
							setInfo({ ...info, name: e.target.value });
						}}
						onBlur={() => {
							setShowInputName(false);
						}}
						onKeyUp={(e) => {
							if (e.keyCode === 13) {
								setShowInputName(false);
							}
						}}
					/>
				) : (
					<p
						onClick={() => {
							setShowInputName(true);
						}}
					>
						{info.name}
					</p>
				)}
			</td>
			<td className="px-2 py-2 text-center">{user.email}</td>

			<td className="px-2 py-2 text-center">
				<button className="px-2 py-1 text-white bg-green-500 rounded-md" onClick={handleSave}>
					Save
				</button>
				<button className="ml-2 px-2 py-1 text-white bg-yellow-500 rounded-md">Reset Password</button>
				<button className="ml-2 px-2 py-1 text-white bg-red-500 rounded-md">Delete</button>
			</td>
		</tr>
	);
}
