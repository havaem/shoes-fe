import { PersonOutline, CartOutline, MenuOutline } from "react-ionicons";
import logo from "assets/icons/logo.png";
import { MenuContext } from "contexts/MenuContext";
import { useContext } from "react";
const TopNavItem = ({ children, link = "/", className }) => {
	return (
		<a
			className={
				"transition-colors relative hover:text-blue40 dark:text-whitee2 dark:hover:text-white " +
				className
			}
			href={link}
		>
			{children}
		</a>
	);
};
const BottomNavItem = ({ active = false, button, children, link = "/", className, ...more }) => {
	return (
		<li
			{...more}
			className={
				`transition-colors font-medium text-2xl uppercase dark:hover:text-blue40 hover:text-blue40 md:hover:text-current ${
					active ? "text-blue40 " : "text-[#22262A] dark:text-whitee2 "
				}` + className
			}
		>
			{button ? <button className="translate-y-1">{children}</button> : <a href={link}>{children}</a>}
		</li>
	);
};
const Header = () => {
	const { setStatusMenu } = useContext(MenuContext);
	return (
		<header>
			<div className="px-[123px] dark:bg-black xl:px-4">
				<div className="h-[70px] gap-x-[30px] border-[#FAFAFB] flex items-center justify-end border-b-2 md:hidden">
					<TopNavItem>Login</TopNavItem>
					<TopNavItem>Register</TopNavItem>
					<TopNavItem className="flex gap-x-1 items-center">
						<PersonOutline color={"#00000"} height="20px" width="20px" />
						My profile
					</TopNavItem>
					<TopNavItem>
						<span className="text-[10px] absolute -right-2 -top-2 flex items-center justify-center w-5 h-5 text-white font-bold bg-redff border-2 border-white rounded-full">
							2
						</span>
						<CartOutline color={"#00000"} height="24px" width="24px" />
					</TopNavItem>
				</div>
				<div className="h-[95px] lg:h-[70px] flex items-center justify-between dark:bg-black md:fixed md:z-20 md:left-0 md:top-0 md:px-4 md:w-full md:shadow-lg lg:bg-white">
					<a
						href="/"
						className="text-[#22262A] flex gap-x-1 items-center justify-center dark:text-whitee2 text-lg font-bold"
					>
						<img src={logo} alt="logo" />
						South
					</a>
					<ul className="flex gap-25 lg:gap-9 xl:gap-14">
						<BottomNavItem active className="md:hidden">
							Home
						</BottomNavItem>
						<BottomNavItem className="md:hidden">Bag</BottomNavItem>
						<BottomNavItem className="md:hidden">Sneakers</BottomNavItem>
						<BottomNavItem className="md:hidden">Belt</BottomNavItem>
						<BottomNavItem className="md:hidden">Contact</BottomNavItem>
						<BottomNavItem
							className="hidden md:block"
							button
							onClick={() => {
								setStatusMenu(true);
								document.body.classList.add("overflow-y-hidden");
							}}
						>
							<MenuOutline color={"#00000"} height="40px" width="40px" />
						</BottomNavItem>
					</ul>
				</div>
			</div>
		</header>
	);
};

export default Header;
