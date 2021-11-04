import Slide from "common/Slide";
import Directory from "components/Directory";
import product from "assets/images/product.png";
import StarRating from "components/StarRating";
import {
	CartOutline,
	ChatbubbleEllipsesOutline,
	HeartOutline,
	LogoFacebook,
	LogoTwitter,
} from "react-ionicons";
const testValue = [
	{ link: "/", title: "Home" },
	{ link: "/", title: "Home" },
	{ link: "/", title: "Home" },
];
const slideSettings = {
	arrows: false,
	dots: true,
	dotsClass: "slick-dots slick-thumb",
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	customPaging: function (i) {
		console.log(i);
		return (
			<button>
				<img src={product} alt="page" />
			</button>
		);
	},
};
const slideItems = [
	<img className="w-full object-cover" src={product} alt="slide" />,
	<img className="w-full object-cover" src={product} alt="slide" />,
	<img className="w-full object-cover" src={product} alt="slide" />,
];
const ProductInfo = () => {
	return (
		<section>
			<div className="mb-16 xl:px-4">
				<Directory items={testValue} />
				<div className="flex gap-8 lg:flex-col">
					<div className="w-1/3 dark:bg-transparent bg-white lg:w-full">
						<Slide
							settings={slideSettings}
							items={slideItems}
							className="slide-product w-full h-full border-none"
						/>
					</div>
					<div className="w-2/3 lg:w-full">
						<h2 className="mb-5 dark:text-whitee2 text-2xl font-medium leading-9">
							Nike Airmax 270 React
						</h2>
						<div className="flex gap-x-1 items-baseline pb-5 border-b-2 border-grayf6">
							<StarRating active />
							<StarRating active />
							<StarRating active />
							<StarRating active />
							<StarRating active />
							<p className="text-grayc1 leading-[19px] ml-2 dark:text-whitee2 text-base">
								0 reviews
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
								<p className="text-sm leading-5">Nike</p>
							</div>
							<div className="flex justify-between">
								<p className="text-sm leading-5">Availability</p>
								<p className="text-sm leading-5">In stock</p>
							</div>
							<div className="flex justify-between">
								<p className="text-sm leading-5">Shipping</p>
								<p className="text-sm leading-5">Free</p>
							</div>
						</div>
						<div className="flex flex-col gap-y-4 my-5 dark:text-whitee2">
							<div className="flex items-center justify-between">
								<p className="text-sm leading-5">Select Color:</p>
								<div className="flex gap-x-2">
									<button className="bg-[#FC3E39] w-5 h-5 dark:border dark:border-white rounded-full"></button>
									<button className="w-5 h-5 bg-black dark:border dark:border-white rounded-full"></button>
									<button className="w-5 h-5 bg-yellowff dark:border dark:border-white rounded-full"></button>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<p className="text-sm leading-5">Size</p>
								<select
									name="size"
									id="size"
									className="dark:bg-gray24 px-4 border-2 border-gray-300 outline-none"
								>
									<option value="39">39</option>
									<option value="40">40</option>
									<option value="41">41</option>
								</select>
							</div>
						</div>
						<div className="flex items-stretch justify-between mb-5 pb-5 dark:text-whitee2 border-b-2 border-grayf6 rounded-md sm:flex-col sm:gap-y-2 sm:items-center">
							<div className="dark:bg-gray24 bg-grayf6 sm:h-14">
								<button className="w-[60px] h-full">-</button>
								<input
									type="number"
									min="0"
									value="1"
									className="amount w-[60px] h-full text-center dark:text-whitee2 bg-transparent outline-none"
								/>
								<button className="w-[60px] h-full">+</button>
							</div>
							<div className="text-[#33A0FF] flex gap-x-4 mb-1 dark:text-white">
								<button className="bg-[#ebf5ff] dark:bg-[#33A0FF] sm:text-md flex gap-x-2 p-4 rounded-md sm:p-2">
									<CartOutline color={"#00000"} height="24px" width="24px" />
									Add to cart
								</button>
								<button className="bg-[#ebf5ff] dark:bg-[#33A0FF] p-4 rounded-md sm:p-2 sm:text-xs">
									<HeartOutline color={"#00000"} height="24px" width="24px" />
								</button>
							</div>
						</div>
						<div className="flex gap-x-2 justify-between">
							<a
								href="/"
								className="bg-[#385c8e] flex gap-x-2 items-center justify-center py-4 w-1/2 text-white rounded-sm"
							>
								<LogoFacebook color={"#fff"} height="24px" width="24px" /> Facebook
							</a>
							<a
								href="/"
								className="bg-[#03a9f4] flex gap-x-2 items-center justify-center px-3 w-1/2 text-white rounded-sm"
							>
								<LogoTwitter color={"#fff"} height="24px" width="24px" />
								Twitter
							</a>
						</div>
					</div>
				</div>
				<div className="bg-grayfa mt-8 p-4 rounded-md">
					<h3 className="mb-2 text-blue33 text-2xl font-medium">Product Information</h3>
					<p className="first-letter:ml-8 text-base">
						Vans mismatch – bộ sưu tập mang đến một cái nhìn mới mẻ hơn về thiết kế kiểu dáng cùng
						phối màu tách biệt không đồng nhất giữa các họa tiết. sự phá vỡ lối thiết kế theo
						khuôn mẫu và tạo xu hướng mới giúp giới trẻ có thể trải nghiệm và thử sức với nhiều
						phiên bản khác nhau trên những phong cách thời trang mà mình đang theo đuổi. Hai Họa
						Tiết Camo Và Zebra Có Phối Màu Ấn Tượng Sau một năm chạy đua không ngừng nghỉ cùng
						những thương hiệu nổi danh khác trên thị trường, có thể thấy rằng vans luôn cố gắng
						đáp ứng tốt nhất mong đợi của khách hàng. và lần này cũng thế, bộ sưu tập vans
						mismatch hứa hẹn sẽ mang đến trọn vẹn cảm xúc của bạn trong từng outfit. sau một năm
						chạy đua không ngừng nghỉ cùng những thương hiệu nổi danh khác trên thị trường, có thể
						thấy rằng vans luôn cố gắng đáp ứng tốt nhất mong đợi của khách hàng. và lần này cũng
						thế, bộ sưu tập vans mismatch hứa hẹn sẽ mang đến trọn vẹn cảm xúc của bạn trong từng
						outfit.
					</p>
				</div>
				<div className="bg-grayfa mt-8 p-4 rounded-md">
					<h3 className="mb-4 text-blue33 text-2xl font-medium">Rating: 12 times - 5.0/5⭐</h3>
					<div className="flex flex-col gap-y-4 font-mono">
						<div className="flex gap-x-6 items-center">
							<div className="flex gap-x-1 items-center">
								1 <StarRating active />
							</div>
							<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
								<div className="w-full h-6 bg-yellowff"></div>
								<span className="absolute-center absolute">20 times</span>
							</div>
						</div>
						<div className="flex gap-x-6 items-center">
							<div className="flex gap-x-1 items-center">
								2<StarRating active />
							</div>
							<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
								<div className="w-1/4 h-6 bg-yellowff"></div>
								<span className="absolute-center absolute">20 times</span>
							</div>
						</div>
						<div className="flex gap-x-6 items-center">
							<div className="flex gap-x-1 items-center">
								3<StarRating active />
							</div>
							<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
								<div className="w-1/4 h-6 bg-yellowff"></div>
								<span className="absolute-center absolute">20 times</span>
							</div>
						</div>
						<div className="flex gap-x-6 items-center">
							<div className="flex gap-x-1 items-center">
								4<StarRating active />
							</div>
							<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
								<div className="w-1/4 h-6 bg-yellowff"></div>
								<span className="absolute-center absolute">20 times</span>
							</div>
						</div>
						<div className="flex gap-x-6 items-center">
							<div className="flex gap-x-1 items-center">
								5<StarRating active />
							</div>

							<div className="relative flex-grow bg-gray-200 rounded-md overflow-hidden">
								<div className="w-1/4 h-6 bg-yellowff"></div>
								<span className="absolute-center absolute">20 times</span>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-grayfa mt-8 p-4 rounded-md">
					<h3 className="mb-4 text-blue33 text-2xl font-medium">Comments</h3>
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
									Lorem Ipsum is simply dummy text of the printing and typesetting industry.
									Lorem Ipsum has been the industry's standard dummy text ever since the
									1500s
								</p>
								<button className="flex gap-x-1 items-center ml-auto text-gray-400 text-sm">
									<ChatbubbleEllipsesOutline color={"#00000"} height="14px" width="14px" />
									Answer
								</button>
								{/* Rep comment item */}
								<div className="flex gap-4">
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
											industry. Lorem Ipsum has been the industry's standard dummy text
											ever since the 1500s
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductInfo;
