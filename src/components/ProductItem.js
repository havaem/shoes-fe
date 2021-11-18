import { pathConstant } from "constant/pathConstant";
import { useState } from "react";
import { CartOutline, Heart, HeartOutline } from "react-ionicons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { changeWhiteListUser } from "reducers/asyncThunk/userAsyncThunk";
import { errorNoti, successNoti } from "reducers/notiReducer";
import StarRating from "./StarRating";
const ProductItem = ({
	whitelist,
	id,
	name,
	reviews,
	rating,
	description,
	image,
	detail,
	price,
	link = "/",
	hot = false,
}) => {
	const dispatch = useDispatch();
	const renderRate = (number) => {
		let data = [];
		for (let i = 0; i < 5; i++) {
			data.push(i < number ? <StarRating key={i} active /> : <StarRating key={i} />);
		}
		return data;
	};
	const [isWhiteList, setIsWhiteList] = useState(whitelist);
	const handleChangeWhiteList = async () => {
		try {
			const response = await dispatch(changeWhiteListUser({ id: id })).unwrap();
			setIsWhiteList(!isWhiteList);
			dispatch(successNoti({ message: response.message, delay: 1500 }));
		} catch (error) {
			dispatch(errorNoti({ message: error.message, delay: 1500 }));
		}
	};
	return (
		<div
			className={`group relative rounded-md dark:bg-gray24  ${
				detail ? "flex bg-white gap-x-4 " : "bg-grayf6"
			}`}
		>
			<div
				className={`xl:max-h-full ${
					detail ? "w-[250px] h-[250px] sm:w-[120px] sm:h-[120px]" : "h-[282px]"
				}`}
			>
				{hot && (
					<span className="dark:bg-[#FF0000] absolute px-3 py-1 text-white text-lg bg-redff rounded-md sm:text-sm">
						HOT
					</span>
				)}
				<img
					src={image}
					alt="item"
					className={`w-full h-full object-contain ${
						detail && "w-[250px] h-[250px] sm:w-[120px] sm:h-[120px]"
					}`}
				/>
			</div>
			<div className={`m-1 dark:bg-gray24 bg-white rounded-b-md  ${detail && "flex-grow w-0"}`}>
				<Link
					to={pathConstant.productInfo + "/" + id + ".html"}
					className={`dark:text-whitee2 ${
						detail
							? "pt-0 font-medium text-2xl leading-9 sm:text-xl"
							: "pt-[10px] mb-[5px] block text-center text-lg font-bold leading-3/2 sm:text-base"
					}`}
				>
					{name}
				</Link>
				<div
					className={`mb-[6px] flex gap-3 items-center ${
						detail
							? "border-b-2 border-grayfa pb-4 mt-2 text-grayc1 sm:text-md sm:mt-0 sm:pb-2"
							: " justify-center"
					}`}
				>
					{renderRate(rating)}
					{detail && `${reviews} reviews`}
				</div>
				<div className={`${detail ? "" : "text-center"}`}>
					<span
						className={`mr-3 text-blue40 text-lg font-bold tracking-1/2 leading-9/5 sm:text-base ${
							detail ? "mr-2" : " sm:block sm:mr-0"
						}`}
					>
						${price.basic}
					</span>
					{price.percent && (
						<>
							<span className="mr-2 text-gray90 line-through text-sm tracking-1/2 leading-3/2 sm:text-xs">
								${price.discount}
							</span>
							<span className="text-redfb text-sm font-bold tracking-1/2 leading-3/2 sm:text-xs">
								{price.percent}% Off
							</span>
						</>
					)}
				</div>
				{detail && (
					<>
						<p className="line-clamp-3 text-md sm:line-clamp-2 mb-2 w-auto dark:text-whitee2 sm:text-xs">
							{description}
						</p>
						<div className="text-[#33A0FF] flex gap-x-4 mb-1 dark:text-white">
							<Link
								className="bg-[#ebf5ff] dark:bg-[#33A0FF] sm:text-md flex gap-x-2 p-4 rounded-md sm:p-2"
								to={`${pathConstant.productInfo}/${id}.html`}
							>
								<CartOutline color={"#00000"} height="24px" width="24px" />
								Add to cart
							</Link>
							<button
								className="bg-[#ebf5ff] dark:bg-[#33A0FF] p-4 rounded-md sm:p-2 sm:text-xs"
								onClick={handleChangeWhiteList}
							>
								{!isWhiteList ? (
									<HeartOutline color={"#00000"} height="24px" width="24px" />
								) : (
									<Heart color={"red"} height="24px" width="24px" />
								)}
							</button>
						</div>
					</>
				)}
			</div>
			<div
				className={`gap-x-[10px] absolute-x-center w-[95%] h-[50%] top-12 flex items-center justify-center dark:bg-black1f bg-white opacity-0 group-hover:opacity-95 invisible group-hover:visible transition-all sm:hidden lg:top-16  ${
					detail && "hidden"
				}`}
			>
				<button
					className={`border-[#f0f6fa] p-4 border-2 hover:border-blue33 rounded-full transition-colors ${
						isWhiteList ? "bg-blue33" : "bg-transparent"
					}`}
					onClick={handleChangeWhiteList}
				>
					<HeartOutline color={`${isWhiteList ? "#fff" : "#33A0FF"}`} height="24px" width="24px" />
				</button>
				<Link
					to={`${pathConstant.productInfo}/${id}.html`}
					className="border-[#f0f6fa] p-4 border-2 hover:border-blue33 rounded-full transition-colors"
				>
					<CartOutline color={"#33A0FF"} height="24px" width="20px" />
				</Link>
			</div>
		</div>
	);
};

export default ProductItem;
