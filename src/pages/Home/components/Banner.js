import bigShoes from "assets/images/bigshoes.png";
const Banner = () => {
	return (
		<section>
			<div className="h-[600px] lg:h-[400px] relative flex items-center bg-blue40 xl:px-4">
				<div className="translate-x-[130px] max-w-[600px] lg:translate-x-[50px] z-10 items-center text-white md:max-w-full md:translate-x-0">
					<h2 className="text-[55px] leading-[82px] mb-5 font-medium md:text-4xl lg:text-5xl">
						Adidas Men Running Sneakers
					</h2>
					<p className="mb-3 text-2xl leading-9 md:text-lg">
						Performance and design. Taken right to the edge.
					</p>
					<a className="leading-[30px] border-b-3 text-xl font-semibold border-white" href="/">
						SHOP NOW
					</a>
				</div>
				<div className="sm:max-w-[250px] md:max-w-[400px] lg:max-w-[500px] absolute z-0 right-0 top-0 -translate-y-16">
					<img src={bigShoes} alt="" />
				</div>
			</div>
		</section>
	);
};

export default Banner;
