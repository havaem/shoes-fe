import { CloseOutline } from "react-ionicons";
import product from "assets/images/product.png";
const ItemCart = () => (
	<tr className="text-center dark:bg-black1f">
		<td className="md:max-w-[430px] flex gap-x-2 items-center py-4">
			<button className="bg-[#fff7f8] p-2 rounded-full">
				<CloseOutline color={"#ff4252"} height="20px" width="20px" />
			</button>
			<a href="/" className="flex gap-x-5 items-center dark:text-whitee2">
				<img
					src={product}
					alt=""
					className="w-[150px] h-[120px] md:w-[90px] md:h-[80px] rounded-md object-cover"
				/>
				<p>Nike Airmax 270 react</p>
			</a>
		</td>
		<td className="py-4 dark:text-whitee2">$998</td>
		<td className="py-4 dark:text-whitee2">
			<button className="w-[40px] h-full">-</button>
			<input
				type="number"
				min="0"
				defaultValue="1"
				className="amount w-[40px] h-full text-center dark:text-whitee2 bg-transparent outline-none"
			/>
			<button className="w-[40px] h-full">+</button>
		</td>
		<td className="py-4 dark:text-whitee2">$998</td>
	</tr>
);
export default ItemCart;
