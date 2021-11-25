import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getOneProduct, updateProduct } from "reducers/asyncThunk/productAsyncThunk";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import { Link } from "react-router-dom";
import { uploadImage } from "utils";
import { successNoti } from "reducers/notiReducer";

export default function ProductItem() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [product, setProduct] = useState(null);
	useEffect(() => {
		const fetch = async () => {
			const response = await dispatch(getOneProduct(id)).unwrap();
			setProduct({ ...response.product, brand: response.product.brand.name });
			setListIMG(response.product.image);
		};
		return fetch();
	}, [dispatch, id]);
	const [imgChoose, setImgChoose] = useState([]);
	const [listIMG, setListIMG] = useState();

	const onPick = (image) => {
		setImgChoose(image.map((e) => e.src));
	};
	const handleSubmit = async () => {
		try {
			/* console.log({
				id: id,
				data: {
					name: product.name,
					price: {
						basic: product.price.basic,
						percent: product.price.percent,
						discount: (product.price.discount * (100 - product.price.percent)) / 100,
					},
					color: product.color,
					size: product.size,
					description: product.description,
					brand: product.brand,
					image: imgChoose,
					amount: product.amount,
				},
			}); */
			const response = await dispatch(
				updateProduct({
					id: id,
					data: {
						name: product.name,
						price: {
							basic: product.price.basic,
							percent: product.price.percent,
							discount: (product.price.discount * (100 - product.price.percent)) / 100,
						},
						color: product.color,
						size: product.size,
						description: product.description,
						brand: product.brand,
						image: imgChoose.length > 0 ? imgChoose : listIMG,
						amount: product.amount,
					},
				})
			).unwrap();
			dispatch(successNoti({ message: "Update Success" }));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div>
				<div>
					<label className="block mt-4 font-bold" htmlFor="name">
						Name
					</label>
					<input
						className="block px-4 py-2 w-full border-2 rounded-md"
						type="text"
						name="name"
						value={product?.name}
						onChange={(event) => {
							setProduct({ ...product, name: event.target.value });
						}}
					/>
				</div>
				<div>
					<label className="block mt-4 font-bold" htmlFor="price">
						Price
					</label>
					<input
						className="block px-4 py-2 w-full border-2 rounded-md"
						type="number"
						name="price"
						value={product?.price.basic}
						onChange={(event) => {
							setProduct({
								...product,
								price: { ...product.price, basic: +event.target.value },
							});
						}}
					/>
					<input
						className="block mt-2 px-4 py-2 w-full border-2 rounded-md"
						type="number"
						max="100"
						min="0"
						name="price-dc"
						value={product?.price.percent}
						onChange={(event) => {
							setProduct({
								...product,
								price: { ...product.price, percent: +event.target.value },
							});
						}}
					/>
				</div>
				<div>
					<label className="block mt-4 font-bold" htmlFor="color">
						Color
					</label>
					<input
						className="block px-4 py-2 w-full border-2 rounded-md"
						type="text"
						name="color"
						value={product?.color.join(" ")}
						onChange={(event) => {
							setProduct({ ...product, color: event.target.value.split(" ") });
						}}
					/>
				</div>
				<div>
					<label className="block mt-4 font-bold" htmlFor="size">
						Size
					</label>
					<input
						className="block px-4 py-2 w-full border-2 rounded-md"
						type="text"
						name="size"
						value={product?.size.join(" ")}
						onChange={(event) => {
							setProduct({ ...product, size: event.target.value.split(" ").map((e) => +e) });
						}}
					/>
				</div>
				<div>
					<label className="block mt-4 font-bold" htmlFor="price">
						Brand
					</label>
					<input
						className="block px-4 py-2 w-full border-2 rounded-md"
						type="text"
						name="price"
						value={product?.brand}
						onChange={(event) => {
							setProduct({ ...product, brand: event.target.value });
						}}
					/>
				</div>
				<div>
					<label className="block mt-4 font-bold" htmlFor="amount">
						Amount
					</label>
					<input
						className="block px-4 py-2 w-full border-2 rounded-md"
						type="number"
						name="amount"
						value={product?.amount}
						onChange={(event) => {
							setProduct({ ...product, amount: +event.target.value });
						}}
					/>
				</div>
				<div>
					<label className="block mt-4 font-bold" htmlFor="description">
						Description
					</label>
					<textarea
						className="block px-4 py-2 w-full border-2 rounded-md"
						type="text"
						name="description"
						value={product?.description}
						rows="7"
						onChange={(event) => {
							setProduct({ ...product, description: event.target.value });
						}}
					/>
				</div>
				<div>
					<label className="w-ful font-bold" htmlFor="image">
						Image
					</label>
					{listIMG && (
						<ImagePicker
							images={listIMG.map((image) => ({ src: image, value: image }))}
							multiple={true}
							onPick={onPick}
						/>
					)}
				</div>
				<input
					type="file"
					accept="image/*"
					multiple
					name="more"
					onChange={async (e) => {
						for (let i = 0; i < e.target.files.length; i++) {
							let imgURL = await uploadImage("product", e.target.files[i]);
							setListIMG((pre) => [...pre, imgURL]);
						}
					}}
				/>
				<div className="flex gap-x-4 justify-end">
					<button
						className="px-4 py-2 text-white text-sm font-medium bg-green-500 rounded-sm"
						onClick={handleSubmit}
					>
						Save
					</button>
					<Link
						className="px-4 py-2 text-white text-sm font-medium bg-yellow-500 rounded-sm"
						to="/admin/manage-product"
					>
						Back
					</Link>
				</div>
			</div>
		</>
	);
}
