import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "reducers/asyncThunk/userAsyncThunk";
import ItemTable from "./components/ItemTable";

export default function UserManagement() {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [users, setUsers] = useState([]);
	const [filter, setFilter] = useState("");
	const getAllUser = useCallback(async () => {
		try {
			const response = await dispatch(getAllUsers()).unwrap();
			setData(response);
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);

	useEffect(() => {
		let dataFilter;
		dataFilter = data.filter((e) => e.email.toLowerCase().includes(filter.toLowerCase()));
		setUsers(dataFilter);
	}, [data, filter]);
	useEffect(() => {
		return getAllUser();
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
							<th className="min-w-[50px] py-2 border-b">Role</th>
							<th className="min-w-[80px] py-2 border-b">Picture</th>
							<th className="min-w-[150px] py-2 border-b">Name</th>
							<th className="py-2 border-b">Email</th>
							<th className="py-2 border-b">Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<ItemTable key={user._id} user={user} />
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
