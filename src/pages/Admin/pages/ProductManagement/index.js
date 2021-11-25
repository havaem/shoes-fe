import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createOneProduct, getAllProduct, removeOneProduct } from "reducers/asyncThunk/productAsyncThunk";
import { errorNoti, successNoti } from "reducers/notiReducer";
import { uploadImage } from "utils";

export default function ProductManagement() {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [products, setProducts] = useState([]);
	const [filter, setFilter] = useState("");
	const getAllVoucher = useCallback(async () => {
		try {
			const response = await dispatch(getAllProduct()).unwrap();
			setData(response);
		} catch (error) {
			console.log(error);
		}
	}, [dispatch]);
	const handleDelete = async (id) => {
		try {
			const response = await dispatch(removeOneProduct(id)).unwrap();
			dispatch(successNoti({ message: response.message }));
			getAllVoucher();
		} catch (error) {
			dispatch(errorNoti({ message: error.message }));
			console.log(error);
		}
	};
	const uploadImageArray = async (array) => {
		let urlImg = [];
		for (let i = 0; i < array.length; i++) {
			let url = await uploadImage("product", array[i]);
			urlImg.push(url);
		}
		return urlImg;
	};
	const handleAdd = async () => {
		try {
			let urlImg = await uploadImageArray(productNew.image);
			console.log(urlImg);
			const response = await dispatch(
				createOneProduct({
					...productNew,
					image: await urlImg,
					price: {
						...productNew.price,
						discount: productNew.price.basic,
						percent: 0,
					},
				})
			).unwrap();
			setShowFormAdd((pre) => !pre);
			dispatch(successNoti({ message: response.message }));
			// getAllVoucher();
		} catch (error) {
			dispatch(errorNoti({ message: error.message }));
			console.log(error);
		}
	};
	const [productNew, setProductNew] = useState({
		name: "",
		price: { basic: 0 },
		brand: "",
		image: [],
		amount: 0,
		color: "",
		size: "",
		description: "",
	});
	const [showFormAdd, setShowFormAdd] = useState(false);
	useEffect(() => {
		let dataFilter;
		dataFilter = data.filter((e) => e.name.toLowerCase().includes(filter.toLowerCase()));
		setProducts(dataFilter);
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
							<label htmlFor="type">Name:</label>
							<input
								type="text"
								name="name"
								className="w-full bg-gray-100"
								onChange={(e) => {
									setProductNew({ ...productNew, name: e.target.value });
								}}
							/>
						</div>
						<div className="flex gap-x-4 items-center">
							<label htmlFor="type">Price:</label>
							<input
								type="text"
								name="price"
								className="w-full bg-gray-100"
								onChange={(e) => {
									setProductNew({ ...productNew, price: { basic: e.target.value } });
								}}
							/>
						</div>
						<div className="flex gap-x-4 items-center">
							<label htmlFor="type">Brand:</label>
							<input
								type="text"
								name="brand"
								className="w-full bg-gray-100"
								onChange={(e) => {
									setProductNew({ ...productNew, brand: e.target.value });
								}}
							/>
						</div>
						<div className="flex gap-x-4 items-center">
							<label htmlFor="type">Image:</label>
							<input
								type="file"
								accpet="image/*"
								name="brand"
								className="w-full bg-gray-100"
								multiple
								onChange={(e) => {
									setProductNew({ ...productNew, image: [...e.target.files] });
								}}
							/>
						</div>
						<div className="flex gap-x-4 items-center">
							<label htmlFor="type">Color:</label>
							<input
								type="text"
								name="color"
								className="w-full bg-gray-100"
								onChange={(e) => {
									setProductNew({ ...productNew, color: e.target.value.trim().split(" ") });
								}}
							/>
						</div>
						<div className="flex gap-x-4 items-center">
							<label htmlFor="type">Size:</label>
							<input
								type="text"
								name="size"
								className="w-full bg-gray-100"
								onChange={(e) => {
									setProductNew({
										...productNew,
										size: e.target.value.split(" ").map((e) => +e),
									});
								}}
							/>
						</div>
						<div className="flex gap-x-4 items-center">
							<label htmlFor="type">Amount:</label>
							<input
								type="text"
								name="size"
								className="w-full bg-gray-100"
								onChange={(e) => {
									setProductNew({
										...productNew,
										amount: +e.target.value,
									});
								}}
							/>
						</div>
						<div className="flex gap-x-4 items-center">
							<label htmlFor="type">Description:</label>
							<input
								type="text"
								name="description"
								className="w-full bg-gray-100"
								onChange={(e) => {
									setProductNew({ ...productNew, description: e.target.value });
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
						placeholder="Search by name"
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
							<th className="min-w-[50px] py-2 border-b">Name</th>
							<th className="min-w-[80px] py-2 border-b">Price</th>
							<th className="min-w-[150px] py-2 border-b">Brand</th>
							<th className="py-2 border-b">Description</th>
							<th className="py-2 border-b">Rating</th>
							<th className="py-2 border-b">Action</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td className="my-2">{product.name}</td>
								<td className="my-2 text-center">{product.price.basic}</td>
								<td className="my-2 text-center">{product.brand.name}</td>
								<td className="line-clamp-3 max-w-[300px] my-2">{product.description}</td>
								<td className="my-2 text-center">{product.rating.averageRating}</td>
								<td>
									<Link
										className="mr-2 px-4 py-2 text-white bg-purple-500 rounded-md"
										to={`/admin/manage-product/${product._id}`}
									>
										Edit
									</Link>
									<button
										className="px-4 py-2 text-white bg-red-500 rounded-md"
										onClick={() => {
											handleDelete(product._id);
										}}
									>
										Remove
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
