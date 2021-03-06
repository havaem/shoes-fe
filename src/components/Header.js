import React from "react";
import { PersonOutline, CartOutline, MenuOutline } from "react-ionicons";
import logo from "assets/icons/logo.png";
import { MenuContext } from "contexts/MenuContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { pathConstant } from "constant/pathConstant";
const TopNavItem = ({ children, link = "/", className }) => {
	return (
		<Link
			className={
				"transition-colors relative hover:text-blue40 dark:text-whitee2 dark:hover:text-white " +
				className
			}
			to={link}
		>
			{children}
		</Link>
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
			{button ? (
				<button className="translate-y-1">{children}</button>
			) : (
				<Link to={link}>{children}</Link>
			)}
		</li>
	);
};
const Header = () => {
	const user = useSelector((state) => state.user.user.email);
	const role = useSelector((state) => state.user.user.role);
	const cart = useSelector((state) => state.cart.cart);
	const { setStatusMenu } = useContext(MenuContext);
	return (
		<header>
			<div className="px-[123px] dark:bg-black xl:px-4">
				<div className="h-[70px] gap-x-[30px] border-[#FAFAFB] flex items-center justify-end border-b-2 md:hidden">
					{user ? (
						<>
							<TopNavItem
								className="flex gap-x-1 items-center"
								link={`${pathConstant.dashboard}/order-info`}
							>
								<PersonOutline color={"#00000"} height="20px" width="20px" />
								My profile
							</TopNavItem>
							{role === 0 && (
								<TopNavItem
									className="flex gap-x-1 items-center"
									link={`${pathConstant.admin}/manage-user/`}
								>
									<PersonOutline color={"#00000"} height="20px" width="20px" />
									ADMIN PANEL
								</TopNavItem>
							)}
						</>
					) : (
						<>
							<TopNavItem link={pathConstant.login}>Login</TopNavItem>
							<TopNavItem link={pathConstant.register}>Register</TopNavItem>
						</>
					)}

					<TopNavItem link={pathConstant.cart}>
						<span className="text-[10px] absolute -right-2 -top-2 flex items-center justify-center w-5 h-5 text-white font-bold bg-redff border-2 border-white rounded-full">
							{cart.length}
						</span>
						<CartOutline color={"#00000"} height="24px" width="24px" />
					</TopNavItem>
				</div>
				<div className="h-[95px] lg:h-[70px] flex items-center justify-between dark:bg-black md:fixed md:z-20 md:left-0 md:top-0 md:px-4 md:w-full md:shadow-lg lg:bg-white">
					<Link
						to="/"
						className="text-[#22262A] flex gap-x-1 items-center justify-center dark:text-whitee2 text-lg font-bold"
					>
						<img src={logo} alt="logo" />
						South
					</Link>
					<ul className="flex gap-25 lg:gap-9 xl:gap-14">
						<BottomNavItem active className="md:hidden" link="/">
							Home
						</BottomNavItem>
						<BottomNavItem link={pathConstant.productList} className="md:hidden">
							List Product
						</BottomNavItem>
						{/* <BottomNavItem className="md:hidden">Sneakers</BottomNavItem>
						<BottomNavItem className="md:hidden">Belt</BottomNavItem>
						<BottomNavItem className="md:hidden">Contact</BottomNavItem> */}
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

export default React.memo(Header);
