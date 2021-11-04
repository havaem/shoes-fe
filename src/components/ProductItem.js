import product from "assets/images/product.png";
import calc from "postcss-calc";
import { CartOutline, HeartOutline } from "react-ionicons";
import StarRating from "./StarRating";
const ProductItem = ({ detail, link = "/", hot = false }) => {
	return (
		<div
			className={`group relative rounded-md dark:bg-gray24  ${
				detail ? "flex bg-white gap-x-4 " : "bg-grayf6"
			}`}
		>
			<div
				className={`xl:max-h-full ${
					detail ? "w-[250px] h-[250px] sm:w-[120px] sm:h-[120px]" : "max-h-[294px] "
				}`}
			>
				{hot && (
					<span className="dark:bg-[#FF0000] absolute px-3 py-1 text-white text-lg bg-redff rounded-md sm:text-sm">
						HOT
					</span>
				)}
				<img
					src={product}
					alt=""
					className={`w-full object-cover  ${
						detail && "w-[250px] h-[250px] sm:w-[120px] sm:h-[120px]"
					}`}
				/>
			</div>
			<div className={`m-1 dark:bg-gray24 bg-white rounded-b-md  ${detail && "flex-grow w-0"}`}>
				<a
					href={link}
					className={`dark:text-whitee2 ${
						detail
							? "pt-0 font-medium text-2xl leading-9 sm:text-xl"
							: "pt-[10px] mb-[5px] block text-center text-lg font-bold leading-3/2 sm:text-base"
					}`}
				>
					Nike Air Max 270 React
				</a>
				<div
					className={`mb-[6px] flex gap-3 items-center ${
						detail
							? "border-b-2 border-grayfa pb-4 mt-2 text-grayc1 sm:text-md sm:mt-0 sm:pb-2"
							: " justify-center"
					}`}
				>
					<StarRating active />
					<StarRating active />
					<StarRating />
					<StarRating />
					<StarRating />
					{detail && "0 reviews"}
				</div>
				<div className={`${detail ? "" : "text-center"}`}>
					<span
						className={`mr-3 text-blue40 text-lg font-bold tracking-1/2 leading-9/5 sm:text-base ${
							detail ? "mr-2" : " sm:block sm:mr-0"
						}`}
					>
						$299,43
					</span>
					<span className="mr-2 text-gray90 line-through text-sm tracking-1/2 leading-3/2 sm:text-xs">
						$534,33
					</span>
					<span className="text-redfb text-sm font-bold tracking-1/2 leading-3/2 sm:text-xs">
						24% Off
					</span>
				</div>
				{detail && (
					<>
						<p className="line-clamp-3 text-md sm:line-clamp-2 mb-2 w-auto dark:text-whitee2 sm:text-xs">
							Nunc facilisis sagittis ullamcorper. Proin lectus ipsum, gravida et mattis
							vulputate, tristique ut lectus. Sed et lectus lorem nunc leifend laorevtr istique
							et congue. Vivamus adipiscin vulputate g nisl ut dolorVivamus adipiscin vulputate
							g nisl ut dolorVivamus adipiscin vulputate g nisl ut dolorVivamus adipiscin
							vulputate g nisl ut dolor
						</p>
						<div className="text-[#33A0FF] flex gap-x-4 mb-1 dark:text-white">
							<button className="bg-[#ebf5ff] dark:bg-[#33A0FF] sm:text-md flex gap-x-2 p-4 rounded-md sm:p-2">
								<CartOutline color={"#00000"} height="24px" width="24px" />
								Add to cart
							</button>
							<button className="bg-[#ebf5ff] dark:bg-[#33A0FF] p-4 rounded-md sm:p-2 sm:text-xs">
								<HeartOutline color={"#00000"} height="24px" width="24px" />
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
				<button className="border-[#f0f6fa] p-4 border-2 hover:border-blue33 rounded-full transition-colors">
					<HeartOutline color={"#33A0FF"} height="24px" width="24px" />
				</button>
				<button className="border-[#f0f6fa] p-4 border-2 hover:border-blue33 rounded-full transition-colors">
					<CartOutline color={"#33A0FF"} height="24px" width="20px" />
				</button>
			</div>
		</div>
	);
};

export default ProductItem;
