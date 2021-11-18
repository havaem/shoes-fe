import ProductItem from "components/ProductItem";
const TabItem = ({ children, active = false, ...more }) => (
	<li
		{...more}
		className={
			active
				? "cursor-pointer border-b-3 border-blue33 text-blue33"
				: "cursor-pointer dark:text-whitee2  "
		}
	>
		{children}
	</li>
);
const BestSeller = () => {
	return (
		<section>
			<div className="mb-[90px]">
				<div className="mb-[23.5px] mt-10">
					<h2 className="text-[35px] mb-6 text-center text-gray22 dark:text-whitee2 font-semibold leading-13 uppercase sm:mb-2 sm:text-2xl">
						Best Seller
					</h2>
					<ul className="gap-x-[70px] text-[22px] leading-[33px] flex items-center justify-center sm:flex-col sm:text-lg">
						<TabItem active>All</TabItem>
						<TabItem>Bags</TabItem>
						<TabItem>Sneakers</TabItem>
						<TabItem>Belt</TabItem>
						<TabItem>Sunglasses</TabItem>
					</ul>
				</div>
				<div className="max-w-[1300px] gap-[33px] md:gap-[15px] grid grid-cols-4 mb-6 mx-auto lg:grid-cols-2 xl:px-4">
					{/* <ProductItem hot />
					<ProductItem hot />
					<ProductItem />
					<ProductItem />
					<ProductItem />
					<ProductItem />
					<ProductItem />
					<ProductItem /> */}
				</div>
				<div className="text-center">
					<a
						href="/"
						className="leading-[30px] text-blue33 text-xl font-medium border-b-2 border-blue33 uppercase"
					>
						More Items
					</a>
				</div>
			</div>
		</section>
	);
};

export default BestSeller;
