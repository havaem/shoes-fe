import support from "assets/images/support.png";
import shipping from "assets/images/shipping.png";
import refund from "assets/images/refund.png";
const PolicyItem = ({ image, title, paragraph }) => (
	<li className="flex flex-col items-center justify-center text-center">
		<img src={image} className="inline xl:mb-2" alt="" />
		<h3 className="text-[27px] text-[#22262A] mt-auto dark:text-white font-medium leading-10 md:mb-2">
			{title}
		</h3>
		<p className="text-[#22262A] dark:text-whitee2 leading-[22px] text-base">{paragraph}</p>
	</li>
);
const Policy = () => {
	return (
		<section>
			<ul className="p-[95px] max-w-[1300px] md:p-[60px] grid gap-x-16 grid-cols-3 mx-auto md:grid-cols-1 xl:gap-y-8 xl:px-4">
				<PolicyItem
					image={shipping}
					title="FREE SHIPPING"
					paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
				/>
				<PolicyItem
					image={refund}
					title="100% REFUND"
					paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
				/>
				<PolicyItem
					image={support}
					title="SUPPORT 24/7"
					paragraph="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
				/>
			</ul>
		</section>
	);
};

export default Policy;
