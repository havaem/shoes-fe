import Directory from "components/Directory";
import Filter from "./components/Filter";
const testValue = [
	{ link: "/", title: "Home" },
	{ link: "/", title: "Home" },
	{ link: "/", title: "Home" },
];
const ProductList = () => {
	return (
		<section>
			<div className="xl:px-4">
				<Directory items={testValue} />
				<Filter />
			</div>
		</section>
	);
};

export default ProductList;
