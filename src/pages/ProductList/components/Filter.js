import ProductItem from "components/ProductItem";
import { useEffect, useState } from "react";
import { AppsOutline, ChevronBack, ChevronForward, MenuOutline } from "react-ionicons";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "reducers/asyncThunk/productAsyncThunk";
const ButtonView = ({ ICON, active, onClick }) => (
	<button
		onClick={onClick}
		className={`w-[58px] flex items-center justify-center ${
			active ? "bg-grayf1 text-blue33 dark:bg-black1f" : "text-grayc1"
		}`}
	>
		<ICON color={"#00000"} height="20px" width="20px" />
	</button>
);
const PaginationButton = ({ title, active }) => (
	<button className={`flex items-center justify-center w-14 text-lg ${active && " text-white bg-blue33"}`}>
		{title}
	</button>
);
const BoxFilter = ({ title, options, className = "" }) => (
	<ul className={`dark:bg-gray24 p-5 bg-grayf6 rounded-md ${className}`}>
		<li className="text-[#22262A] leading-[27px] mb-4 dark:text-whitee2 text-lg font-medium uppercase">
			{title}
		</li>
		{options.map((e, i) => (
			<li
				key={i}
				className="text-[#262626] leading-[22px] flex justify-between py-2 dark:text-whitee2 text-lg"
			>
				<button>{e.label}</button>
				<p className="text-[#acaeb0]">{e.amount}</p>
			</li>
		))}
	</ul>
);

const Filter = () => {
	const dispatch = useDispatch();
	const [viewOption, setViewOption] = useState(1);
	const optionProductBrand = [
		{
			label: "Bag",
			amount: 12,
		},
		{
			label: "Bag",
			amount: 12,
		},
		{
			label: "Bag",
			amount: 12,
		},
	];
	const optionFilterSort = [
		{
			label: "Name (A-Z)",
			value: 1,
		},
		{
			label: "Name (Z-A)",
			value: 2,
		},
		{
			label: "Price ⬆",
			value: 3,
		},
		{
			label: "Price ⬇",
			value: 4,
		},
	];
	const optionFilterRating = [
		{
			label: "All",
			value: 1,
		},
		{
			label: "1 ⭐",
			value: 2,
		},
		{
			label: "2 ⭐",
			value: 3,
		},
		{
			label: "3 ⭐",
			value: 4,
		},
		{
			label: "4 ⭐",
			value: 5,
		},
		{
			label: "5 ⭐",
			value: 6,
		},
	];
	const products = useSelector((state) => state.product.products);
	const userWhiteList = useSelector((state) => state.user.user.whitelist);
	const [productShow, setProductShow] = useState();
	const [sortBy, setSortBy] = useState(1);
	const [rating, setRating] = useState(1);
	const BoxFilterRight = ({ title, options }) => (
		<div className="sm:w-1/2">
			<label htmlFor={title} className="mr-2 dark:text-whitee2 sm:mb-2">
				{title}
			</label>
			<select
				name={title}
				id={title}
				className="border-[#F1F3F4] px-4 h-10 dark:text-whitee2 dark:bg-black1f border-0 rounded-sm outline-none sm:px-2 sm:w-full"
				onChange={(e) => {
					if (title === "Sort By") {
						setSortBy(+e.target.value);
					} else {
						setRating(+e.target.value);
					}
				}}
				value={title === "Sort By" ? sortBy.toString() : rating.toString()}
			>
				{options.map((e, i) => (
					<option key={i} value={e.value}>
						{e.label}
					</option>
				))}
			</select>
		</div>
	);
	useEffect(() => {
		if (products.length > 0) {
			let tmp = [...products];
			if (sortBy === 1) {
				tmp.sort(function (a, b) {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});
			}
			if (sortBy === 2) {
				tmp.sort(function (a, b) {
					if (a.name < b.name) {
						return 1;
					}
					if (a.name > b.name) {
						return -1;
					}
					return 0;
				});
			}
			if (sortBy === 4) {
				tmp.sort(function (a, b) {
					if (a.price.discount < b.price.discount) {
						return 1;
					}
					if (a.price.discount > b.price.discount) {
						return -1;
					}
					return 0;
				});
			}
			if (sortBy === 3) {
				tmp.sort(function (a, b) {
					if (a.price.discount > b.price.discount) {
						return 1;
					}
					if (a.price.discount < b.price.discount) {
						return -1;
					}
					return 0;
				});
			}
			if (rating === 2) {
				tmp = tmp.filter((e) => Math.floor(e.rating.averageRating) === 1);
			}
			if (rating === 3) {
				tmp = tmp.filter((e) => Math.floor(e.rating.averageRating) === 2);
			}
			if (rating === 4) {
				tmp = tmp.filter((e) => Math.floor(e.rating.averageRating) === 3);
			}
			if (rating === 5) {
				tmp = tmp.filter((e) => Math.floor(e.rating.averageRating) === 4);
			}
			if (rating === 6) {
				tmp = tmp.filter((e) => Math.floor(e.rating.averageRating) === 5);
			}
			setProductShow(tmp);
		}
	}, [products, rating, sortBy]);
	useEffect(() => {
		dispatch(getAllProduct());
	}, [dispatch]);
	return (
		<section>
			<div className="max-w-[1300px] gap-x-[30px] flex mb-16 mx-auto md:mb-8 lg:flex-col lg:gap-y-5">
				{/* Left */}
				<div className="max-w-[270px] gap-y-[30px] flex hidden flex-col w-full md:hidden lg:flex-row lg:gap-x-3 lg:max-w-none">
					<BoxFilter title="Brand" options={optionProductBrand} className="lg:w-1/3" />
					<div className="bg-[#f6f7f8] p-5 dark:bg-gray24 rounded-md lg:w-1/3">
						<p className="text-[#22262A] leading-[27px] mb-5 dark:text-whitee2 text-lg font-medium uppercase">
							Color
						</p>
						<div className="grid grid-cols-6">
							<button className="bg-[#006CFF] mx-auto w-5 h-5 rounded-full"></button>
							<button className="bg-[#FC3E39] mx-auto w-5 h-5 rounded-full"></button>
							<button className="bg-[#171717] mx-auto w-5 h-5 rounded-full"></button>
							<button className="bg-[#FFF600] mx-auto w-5 h-5 rounded-full"></button>
							<button className="bg-[#FF00B4] mx-auto w-5 h-5 rounded-full"></button>
							<button className="bg-[#EFDFDF] mx-auto w-5 h-5 rounded-full"></button>
						</div>
					</div>
				</div>
				{/* Right */}
				<div className="flex-grow">
					{/* Filter */}
					<div className="flex items-stretch justify-between mb-6 dark:bg-gray24 bg-grayf6 rounded-md sm:flex-col">
						<div className="flex gap-x-10 px-5 py-2 h-full sm:gap-x-2 sm:justify-between">
							<BoxFilterRight title="Sort By" options={optionFilterSort} />
							<BoxFilterRight title="Rating" options={optionFilterRating} />
						</div>
						<div className="h-[56px] flex justify-center">
							<ButtonView
								ICON={AppsOutline}
								active={viewOption === 1}
								onClick={() => setViewOption(1)}
							/>
							<ButtonView
								ICON={MenuOutline}
								active={viewOption === 2}
								onClick={() => setViewOption(2)}
							/>
						</div>
					</div>
					{/* Grid view */}
					<div
						className={`${
							viewOption === 1
								? "gap-[33px] md:gap-[15px] grid grid-cols-3 mb-6 sm:grid-cols-1 xl:grid-cols-2"
								: "gap-[30px] grid grid-cols-1 mb-6"
						}`}
					>
						{productShow &&
							productShow.map((e, i) => (
								<ProductItem
									whitelist={userWhiteList.indexOf(e._id) !== -1}
									id={e._id}
									detail={viewOption === 1 ? false : true}
									key={i}
									price={e.price}
									name={e.name}
									image={e.image[0]}
									description={e.description}
									rating={e.rating.averageRating}
									reviews={
										e.rating.ratingByTimes.oneStar.length +
										e.rating.ratingByTimes.twoStars.length +
										e.rating.ratingByTimes.threeStars.length +
										e.rating.ratingByTimes.fourStars.length +
										e.rating.ratingByTimes.fiveStars.length
									}
								/>
							))}
					</div>

					{/* Pagination */}
					<div className="flex items-stretch justify-center h-14 dark:text-whitee2 dark:bg-gray24 bg-grayf6">
						<button className="flex items-center justify-center w-14 text-lg">
							<ChevronBack color={"#00000"} />
						</button>
						<PaginationButton title="1" active />
						{/* <PaginationButton title="2" /> */}
						{/* <PaginationButton title="3" /> */}
						{/* <PaginationButton title="4" /> */}
						{/* <PaginationButton title="5" /> */}
						<button className="flex items-center justify-center w-14 text-lg">
							<ChevronForward color={"#00000"} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Filter;
