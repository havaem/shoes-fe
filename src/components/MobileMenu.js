import { MenuContext } from "contexts/MenuContext";
import { useContext } from "react";
import { CartOutline, CloseOutline, PersonOutline } from "react-ionicons";
const ItemMobileMenu = ({ link = "/", children, active = false }) => (
	<li className={active ? "dark:bg-[#3a3b3c] text-blue33 font-bold" : ""}>
		<a href={link} className="block px-4 py-2">
			{children}
		</a>
	</li>
);
const MobileMenu = ({ isShowMenu, setIsShowMenu }) => {
	const { statusMenu, setStatusMenu } = useContext(MenuContext);

	const handleClick = () => {
		setStatusMenu(false);
		document.body.classList.remove("overflow-y-hidden");
	};
	return (
		<>
			{statusMenu && <div onClick={handleClick} className="bg-[#000000ba] fixed z-40 inset-0"></div>}
			<div
				className={`transition-all duration-700 overflow-auto max-w-[400px] dark:bg-[#242526] fixed z-50 bottom-0 right-0 top-0 px-8 pt-4 w-full bg-white ${
					!statusMenu ? "translate-x-full opacity-0 invisible" : "translate-x-0 opacity-100 visible"
				}`}
			>
				<div className="flex justify-end">
					<button className="translate-x-4" onClick={handleClick}>
						<CloseOutline color={"#00000"} height="40px" width="40px" />
					</button>
				</div>
				<ul className="flex flex-col gap-y-4 mb-7 dark:text-whitee2">
					<ItemMobileMenu active>Home</ItemMobileMenu>
					<ItemMobileMenu active>Bag</ItemMobileMenu>
					<ItemMobileMenu>Sneakers</ItemMobileMenu>
					<ItemMobileMenu>Belt</ItemMobileMenu>
					<ItemMobileMenu>Contact</ItemMobileMenu>
				</ul>
				<ul className="flex flex-col gap-y-4 p-4 bg-whitee2 rounded-sm">
					<li className="flex justify-between">
						<a href="/">Login</a> <a href="/">Register</a>
					</li>
					<li>
						<a href="/" className="flex gap-1 items-center justify-center py-2">
							<PersonOutline color={"#00000"} height="20px" width="20px" />
							My profile
						</a>
					</li>
					<li className="flex justify-center">
						<a href="/" className="relative inline-block">
							<span className="text-[10px] absolute -right-2 -top-2 flex items-center justify-center w-5 h-5 text-white font-bold bg-redff border-2 border-white rounded-full">
								2
							</span>
							<CartOutline color={"#00000"} height="24px" width="24px" />
						</a>
					</li>
				</ul>
			</div>
		</>
	);
};

export default MobileMenu;
