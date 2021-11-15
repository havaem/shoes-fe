import Slide from "components/Slide";
import {
	CartOutline,
	ChatbubbleEllipsesOutline,
	Heart,
	HeartOutline,
	LogoFacebook,
	LogoTwitter,
} from "react-ionicons";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct, ratingProduct } from "reducers/asyncThunk/productAsyncThunk";
import { changeWhiteListUser } from "reducers/asyncThunk/userAsyncThunk";
import { errorNoti, successNoti } from "reducers/notiReducer";
import Directory from "components/Directory";
import StarRating from "components/StarRating";
import Loading from "components/Loading";
import ColorButton from "components/ColorButton";
import { renderStarRating } from "common";
import ReactStars from "react-stars";
const testValue = [
	{ link: "/", title: "Home" },
	{ link: "/", title: "Home" },
	{ link: "/", title: "Home" },
];
const ProductInfo = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [isWhiteList, setIsWhiteList] = useState();
	const [userSelect, setUserSelect] = useState({
		size: null,
		color: null,
		amount: 1,
	});
	const slideSettings = {
		arrows: false,
		dots: true,
		dotsClass: "slick-dots slick-thumb",
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		customPaging: function (i) {
			return (
				<button>
					<img src={product.image[i]} alt="page" className="object-contain" />
				</button>
			);
		},
	};
	//* selector
	const userWhiteList = useSelector((state) => state.user.user.whitelist);
	const loading = useSelector((state) => state.product.loading);
	//* function
	const handleChangeWhiteList = async () => {
		try {
			const response = await dispatch(changeWhiteListUser({ id: id })).unwrap();
			dispatch(successNoti({ message: response.message, delay: 1500 }));
			setIsWhiteList(!isWhiteList);
		} catch (error) {
			dispatch(errorNoti({ message: error.message, delay: 1500 }));
		}
	};
	const handleChangeColor = (color) => {
		setUserSelect({ ...userSelect, color: color });
	};
	const handleChangeAmount = (type) => {
		// up
		if (type === 0) {
			if (userSelect.amount < product.amount && userSelect.amount < 5 && userSelect.amount > 0) {
				setUserSelect({ ...userSelect, amount: userSelect.amount + 1 });
			}
		}
		//down
		else {
			if (userSelect.amount > 1) {
				setUserSelect({ ...userSelect, amount: userSelect.amount - 1 });
			}
		}
	};
	const handleChangeRating = async (rating) => {
		try {
			const response = await dispatch(ratingProduct({ id: id, rating: rating })).unwrap();
			dispatch(successNoti({ message: response.message, delay: 1500 }));
		} catch (error) {
			dispatch(errorNoti({ message: error.message, delay: 1500 }));
		}
	};
	const percentProcess = (type) => {
		let percent = 0;
		const sum =
			product.rating.ratingByTimes.oneStar.length +
			product.rating.ratingByTimes.twoStars.length +
			product.rating.ratingByTimes.threeStars.length +
			product.rating.ratingByTimes.fourStars.length +
			product.rating.ratingByTimes.fiveStars.length;
		console.log(sum);
		if (sum === 0) return `w-[0%]`;
		switch (type) {
			case 1:
				percent = (product.rating.ratingByTimes.oneStar.length / sum) * 100;
				console.log(percent);
				break;
			case 2:
				percent = (product.rating.ratingByTimes.twoStars.length / sum) * 100;
				break;
			case 3:
				percent = (product.rating.ratingByTimes.threeStars.length / sum) * 100;
				break;
			case 4:
				percent = (product.rating.ratingByTimes.fourStars.length / sum) * 100;
				break;
			case 5:
				percent = (product.rating.ratingByTimes.fiveStars.length / sum) * 100;
				break;
			default:
				break;
		}
		return `${percent}%`;
	};
	useEffect(() => {
		product && setUserSelect({ ...userSelect, size: product.size[0], color: product.color[0] });
		product && setIsWhiteList(userWhiteList.indexOf(product._id) !== -1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product]);
	useEffect(() => {
		const getInfoProduct = async () => {
			try {
				const response = await dispatch(getOneProduct(id)).unwrap();
				setProduct(response.product);
			} catch (error) {
				console.log(error);
			}
		};
		return getInfoProduct();
	}, [dispatch, id]);
	return loading ? (
		<Loading />
	) : (
		product && (
			<section>
				<div className="mb-16 xl:px-4">
					<Directory items={testValue} />
					<div className="flex gap-8 lg:flex-col">
						<div className="w-1/3 dark:bg-transparent bg-white lg:w-full">
							<Slide
								settings={slideSettings}
								items={[
									...product.image.map((e) => (
										<img className="w-full object-cover" src={e} alt="slide" />
									)),
								]}
								className="slide-product w-full h-full border-none"
							/>
						</div>
						<div className="w-2/3 lg:w-full">
							<h2 className="mb-5 dark:text-whitee2 text-2xl font-medium leading-9">
								{product.name}
							</h2>
							<div className="flex gap-x-1 items-baseline pb-5 border-b-2 border-grayf6">
								{renderStarRating(product.rating.averageRating)}
								<p className="leading-[19px] ml-2 text-grayc1 dark:text-whitee2 text-base">
									{`${
										product.rating.ratingByTimes.oneStar.length +
										product.rating.ratingByTimes.twoStars.length +
										product.rating.ratingByTimes.threeStars.length +
										product.rating.ratingByTimes.fourStars.length +
										product.rating.ratingByTimes.fiveStars.length
									} reviews`}
								</p>
							</div>
							<div className="my-4">
								<span className="mr-3 text-blue40 text-lg font-bold tracking-1/2 leading-9/5 sm:block sm:mr-0 sm:text-base">
									$299,43
								</span>
								<span className="mr-2 text-gray90 line-through text-sm tracking-1/2 leading-3/2 sm:text-xs">
									$534,33
								</span>
								<span className="text-redfb text-sm font-bold tracking-1/2 leading-3/2 sm:text-xs">
									24% Off
								</span>
							</div>
							<div className="flex flex-col gap-y-4 pb-5 dark:text-whitee2 border-b-2 border-grayf6">
								<div className="flex justify-between">
									<p className="text-sm leading-5">Branch</p>
									<p className="text-sm leading-5"> {product.brand.name}</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm leading-5">Availability</p>
									<p className="text-sm leading-5">
										{" "}
										{product.amount > 0 ? `In stock` : `Out of stock`}
									</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm leading-5">Shipping</p>
									<p className="text-sm leading-5">Fee</p>
								</div>
							</div>
							<div className="flex flex-col gap-y-4 my-5 dark:text-whitee2">
								<div className="flex items-center justify-between">
									<p className="text-sm leading-5">Select Color:</p>
									<div className="flex gap-x-2">
										{product.color.map((e) => (
											<ColorButton
												active={userSelect.color === e}
												color={e}
												key={e}
												changeData={handleChangeColor}
											/>
										))}
									</div>
								</div>
								<div className="flex items-center justify-between">
									<p className="text-sm leading-5">Size</p>
									<select
										name="size"
										id="size"
										className="px-4 dark:bg-gray24 border-2 border-gray-300 outline-none"
										value={userSelect.size}
										onChange={(e) => {
											setUserSelect({ ...userSelect, size: e.target.value });
										}}
									>
										{product.size.map((e, i) => (
											<option key={i} value={e}>
												{e}
											</option>
										))}
									</select>
								</div>
							</div>
							<div className="flex items-stretch justify-between mb-5 pb-5 dark:text-whitee2 border-b-2 border-grayf6 rounded-md sm:flex-col sm:gap-y-2 sm:items-center">
								<div className="dark:bg-gray24 bg-grayf6 sm:h-14">
									<button
										className="w-[60px] h-full"
										onClick={() => {
											handleChangeAmount(1);
										}}
									>
										-
									</button>
									<input
										type="number"
										min="0"
										max="5"
										onChange={() => {}}
										value={userSelect.amount}
										className="amount w-[60px] h-full text-center dark:text-whitee2 bg-transparent outline-none"
										disabled
									/>
									<button
										className="w-[60px] h-full"
										onClick={() => {
											handleChangeAmount(0);
										}}
									>
										+
									</button>
								</div>
								<div className="text-[#33A0FF] flex gap-x-4 mb-1 dark:text-white">
									<button className="bg-[#ebf5ff] dark:bg-[#33A0FF] sm:text-md flex gap-x-2 p-4 rounded-md sm:p-2">
										<CartOutline color={"#00000"} height="24px" width="24px" />
										Add to cart
									</button>
									<button
										className="bg-[#ebf5ff] dark:bg-[#33A0FF] p-4 rounded-md sm:p-2 sm:text-xs"
										onClick={handleChangeWhiteList}
									>
										{isWhiteList ? (
											<Heart color={"red"} height="24px" width="24px" />
										) : (
											<HeartOutline color={"#00000"} height="24px" width="24px" />
										)}
									</button>
								</div>
							</div>
							<div className="flex gap-x-2 justify-between">
								<a
									href="/"
									className="bg-[#385c8e] flex gap-x-2 items-center justify-center py-4 w-1/2 text-white rounded-sm"
								>
									<LogoFacebook color={"#ffffff"} height="24px" width="24px" /> Facebook
								</a>
								<a
									href="/"
									className="bg-[#03a9f4] flex gap-x-2 items-center justify-center px-3 w-1/2 text-white rounded-sm"
								>
									<LogoTwitter color={"#ffffff"} height="24px" width="24px" />
									Twitter
								</a>
							</div>
						</div>
					</div>
					<div className="mt-8 p-4 bg-grayfa rounded-md">
						<h3 className="mb-2 text-blue33 text-2xl font-medium">Product Information</h3>
						<p className="first-letter:ml-8 text-base">{product.description}</p>
					</div>
					<div className="mt-8 p-4 bg-grayfa rounded-md">
						<h3 className="mb-4 text-blue33 text-2xl font-medium">
							Rating:{" "}
							{product.rating.ratingByTimes.oneStar.length +
								product.rating.ratingByTimes.twoStars.length +
								product.rating.ratingByTimes.threeStars.length +
								product.rating.ratingByTimes.fourStars.length +
								product.rating.ratingByTimes.fiveStars.length}{" "}
							times - {product.rating.averageRating}/5⭐
						</h3>
						<div className="flex flex-col gap-y-4 font-mono">
							<div className="flex gap-x-6 items-center">
								<div className="flex gap-x-1 items-center">
									1 <StarRating active />
								</div>
								<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
									<div
										style={{ width: `${percentProcess(1)}` }}
										className="h-6 bg-yellowff"
									></div>
									<span className="absolute-center absolute">
										{product.rating.ratingByTimes.oneStar.length} times
									</span>
								</div>
							</div>
							<div className="flex gap-x-6 items-center">
								<div className="flex gap-x-1 items-center">
									2<StarRating active />
								</div>
								<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
									<div
										style={{ width: `${percentProcess(2)}` }}
										className="h-6 bg-yellowff"
									></div>
									<span className="absolute-center absolute">
										{product.rating.ratingByTimes.twoStars.length} times
									</span>
								</div>
							</div>
							<div className="flex gap-x-6 items-center">
								<div className="flex gap-x-1 items-center">
									3<StarRating active />
								</div>
								<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
									<div
										style={{ width: `${percentProcess(3)}` }}
										className="h-6 bg-yellowff"
									></div>
									<span className="absolute-center absolute">
										{product.rating.ratingByTimes.threeStars.length} times
									</span>
								</div>
							</div>
							<div className="flex gap-x-6 items-center">
								<div className="flex gap-x-1 items-center">
									4<StarRating active />
								</div>
								<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
									<div
										style={{ width: `${percentProcess(4)}` }}
										className="h-6 bg-yellowff"
									></div>
									<span className="absolute-center absolute">
										{product.rating.ratingByTimes.fourStars.length} times
									</span>
								</div>
							</div>
							<div className="flex gap-x-6 items-center">
								<div className="flex gap-x-1 items-center">
									5<StarRating active />
								</div>

								<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
									<div
										style={{ width: `${percentProcess(5)}` }}
										className="h-6 bg-yellowff"
									></div>
									<span className="absolute-center absolute">
										{product.rating.ratingByTimes.fiveStars.length} times
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-8 p-4 bg-grayfa rounded-md">
						<h3 className="mb-4 text-blue33 text-2xl font-medium">Your rating:</h3>
						<ReactStars
							count={5}
							onChange={(newRating) => {
								handleChangeRating(newRating);
							}}
							half={false}
							size={30}
							activeColor="#ffd700"
						/>
					</div>
					<div className="mt-8 p-4 bg-grayfa rounded-md">
						<h3 className="mb-4 text-blue33 text-2xl font-medium">Comments</h3>
						<div className="flex flex-wrap gap-y-2 rounded-md">
							<textarea className="p-2 w-full outline-none" rows="3"></textarea>
							<button className="ml-auto px-4 py-2 text-white bg-redfb rounded-md">
								Submit
							</button>
						</div>
						<div>
							{/* Comment item */}
							<div className="flex gap-4">
								{/* Avatar */}
								<div className="flex-shrink-0 mt-2 w-9 h-9">
									<img
										src={product}
										alt=""
										className="w-full h-full border-2 border-blue33 rounded-full object-cover"
									/>
								</div>
								{/* Content */}
								<div className="flex-grow">
									<div className="flex flex-wrap items-center justify-between">
										<p className="text-lg font-medium">Võ Hoài Nam</p>
										<h4 className="text-[#e87a5a] text-xs">04/11/2021 5:07 CH</h4>
									</div>
									<div className="flex gap-x-2 mb-2">
										<StarRating active />
										<StarRating active />
										<StarRating active />
										<StarRating />
										<StarRating />
									</div>
									<p className="mb-2 font-sans text-base">
										Lorem Ipsum is simply dummy text of the printing and typesetting
										industry. Lorem Ipsum has been the industry's standard dummy text ever
										since the 1500s
									</p>
									<button className="flex gap-x-1 items-center ml-auto text-gray-400 text-sm">
										<ChatbubbleEllipsesOutline
											color={"#00000"}
											height="14px"
											width="14px"
										/>
										Answer
									</button>
									{/* Rep comment item */}
									<div className="flex gap-4 mb-2">
										<div className="flex-shrink-0 mt-2 w-9 h-9">
											<img
												src={product}
												alt=""
												className="w-full h-full border-2 border-blue33 rounded-full object-cover"
											/>
										</div>
										{/* Content */}
										<div className="flex-grow">
											<div className="flex flex-wrap items-center justify-between">
												<p className="text-lg font-medium">Võ Hoài Nam</p>
												<h4 className="text-[#e87a5a] text-xs">04/11/2021 5:07 CH</h4>
											</div>
											<div className="flex gap-x-2 mb-2">
												<StarRating active />
												<StarRating active />
												<StarRating active />
												<StarRating />
												<StarRating />
											</div>
											<p className="mb-2 font-sans text-base">
												Lorem Ipsum is simply dummy text of the printing and
												typesetting industry. Lorem Ipsum has been the industry's
												standard dummy text ever since the 1500s
											</p>
											<button className="flex gap-x-1 items-center ml-auto text-gray-400 text-sm">
												<ChatbubbleEllipsesOutline
													color={"#00000"}
													height="14px"
													width="14px"
												/>
												Answer
											</button>
										</div>
									</div>
									{/* Comment Box */}
									<div className="flex flex-wrap gap-y-2 justify-end rounded-md">
										<textarea className="p-2 w-full outline-none" rows="3"></textarea>
										<button className="px-4 py-2 text-white bg-redfb rounded-md">
											Submit
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	);
};

export default ProductInfo;
