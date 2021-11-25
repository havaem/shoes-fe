import { BanOutline, CubeOutline, GiftOutline, PersonOutline, ReceiptOutline } from "react-ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Switch, useRouteMatch, Link } from "react-router-dom";
import { logout } from "reducers/userReducer";
import { renderRoute } from "utils";
import OrderManagement from "./pages/OrderManagement";
import ProductManagement from "./pages/ProductManagement";
import ProductItem from "./pages/ProductManagement/components/ProductItem";
import UserManagement from "./pages/UserManagement/";
import VoucherManagement from "./pages/VoucherManagement";
const adminRoutes = [
	{
		path: "/admin/manage-user/",
		component: UserManagement,
		exact: true,
		label: "User Management",
		Icon: PersonOutline,
		render: true,
	},
	{
		path: "/admin/manage-order/",
		component: OrderManagement,
		exact: true,
		label: "Order Management",
		Icon: GiftOutline,
		render: true,
	},
	{
		path: "/admin/manage-voucher/",
		component: VoucherManagement,
		exact: true,
		label: "Voucher Management",
		Icon: ReceiptOutline,
		render: true,
	},
	{
		path: "/admin/manage-product/",
		component: ProductManagement,
		exact: true,
		label: "Product Management",
		Icon: CubeOutline,
		render: true,
	},
	{
		path: "/admin/manage-product/:id",
		component: ProductItem,
		exact: true,
		label: "Product Management",
		Icon: ReceiptOutline,
		render: false,
	},
];

const LinkCustom = ({ label, to, activeOnlyWhenExact, Icon }) => {
	const match = useRouteMatch({
		path: to,
		exact: activeOnlyWhenExact,
	});
	return (
		<li className={`px-2 py-3 ${match && "bg-bluebc dark:bg-black1f"} `}>
			<Link className="flex gap-x-2 items-center" to={to}>
				<Icon color={"#33A0FF"} height="24px" width="24px" />
				{label}
			</Link>
		</li>
	);
};

export default function Admin() {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const { name, picture, email } = user;
	const logOut = () => {
		dispatch(logout());
		history.push("/");
	};
	return (
		<section>
			<div className="max-w-[1300px] mb-4 mt-5 mx-auto dark:bg-gray3a rounded-md md:mt-20 xl:px-4">
				<div className="py-3">
					<div className="flex items-center justify-center">
						<div className="mr-3 w-20 h-20 rounded-full overflow-hidden">
							<img src={picture} alt="" className="w-20 h-20 rounded-full object-cover" />
						</div>
						<div>
							<p className="dark:text-whitee2 text-xl font-medium">{name}</p>
							<p className="dark:text-whitee2 text-sm">{email}</p>
						</div>
					</div>
				</div>
				<div className="flex gap-4 p-2 border-t-2 border-grayf1 lg:flex-col">
					<ul className="max-w-[250px] flex flex-col gap-y-2 w-full dark:text-whitee2 border-r-2 border-grayf1 lg:max-w-none lg:border-b-2 lg:border-r-0">
						{adminRoutes.map(
							(e) =>
								e.render && (
									<LinkCustom
										activeOnlyWhenExact={e.exact}
										to={e.path}
										label={e.label}
										Icon={e.Icon}
										key={e.path}
									/>
								)
						)}

						<li className={`px-2 py-3`}>
							<button className="flex gap-x-2 items-center" onClick={logOut}>
								<BanOutline color={"#33A0FF"} height="24px" width="24px" />
								Log out
							</button>
						</li>
					</ul>
					<div className="flex-1">
						<Switch>{renderRoute(adminRoutes)}</Switch>
					</div>
				</div>
			</div>
		</section>
	);
}
