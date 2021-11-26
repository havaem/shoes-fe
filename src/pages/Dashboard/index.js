import { useState } from "react";
import { BagHandleOutline, BanOutline, KeyOutline } from "react-ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Switch, useRouteMatch, Link } from "react-router-dom";
import { updateAvatarUser } from "reducers/asyncThunk/userAsyncThunk";
import { clearCart } from "reducers/cartReducer";
import { errorNoti, successNoti } from "reducers/notiReducer";
import { logout } from "reducers/userReducer";
import { renderRoute, uploadImage } from "utils";
import ChangePassword from "./components/ChangePassword";
import OrderInfo from "./components/OrderInfo";
const dashboardRoute = [
	{ path: "/dashboard/order-info", component: OrderInfo, exact: true },
	{ path: "/dashboard/change-password", component: ChangePassword, exact: true },
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

export default function Dashboard() {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const { name, picture, email } = user;
	const [pictureUser, setPictureUser] = useState(picture);
	const logOut = () => {
		dispatch(logout());
		dispatch(clearCart());
		history.push("/");
	};
	return (
		<section>
			<div className="max-w-[1300px] mb-4 mt-5 mx-auto dark:bg-gray3a rounded-md md:mt-20 xl:px-4">
				<div className="py-3">
					<div className="flex items-center justify-center">
						<div className="mr-3 w-20 h-20 rounded-full overflow-hidden">
							<label htmlFor="avatar" className="cursor-pointer">
								<img
									src={pictureUser}
									alt=""
									className="w-20 h-20 rounded-full object-cover"
								/>
							</label>
							<input
								type="file"
								id="avatar"
								name="avatar"
								accept="image/*"
								className="hidden w-full h-full"
								onChange={async (e) => {
									const url = await uploadImage("avatar", e.target.files[0]);
									try {
										const response = await dispatch(updateAvatarUser({ picture: url }));
										setPictureUser(url);
										dispatch(successNoti({ message: response.message }));
									} catch (error) {
										dispatch(errorNoti({ message: error.message }));
									}
								}}
							/>
						</div>
						<div>
							<p className="dark:text-whitee2 text-xl font-medium">{name}</p>
							<p className="dark:text-whitee2 text-sm">{email}</p>
						</div>
					</div>
				</div>
				<div className="flex gap-4 p-2 border-t-2 border-grayf1 lg:flex-col">
					<ul className="max-w-[250px] flex flex-col gap-y-2 w-full dark:text-whitee2 border-r-2 border-grayf1 lg:max-w-none lg:border-b-2 lg:border-r-0">
						<LinkCustom
							activeOnlyWhenExact={true}
							to={dashboardRoute[0].path}
							label={"Order"}
							Icon={BagHandleOutline}
						/>
						<LinkCustom
							activeOnlyWhenExact={true}
							to={dashboardRoute[1].path}
							label={"Password"}
							Icon={KeyOutline}
						/>
						<li className={`px-2 py-3`}>
							<button className="flex gap-x-2 items-center" onClick={logOut}>
								<BanOutline color={"#33A0FF"} height="24px" width="24px" />
								Log out
							</button>
						</li>
					</ul>
					<div className="flex-1">
						<Switch>{renderRoute(dashboardRoute)}</Switch>
					</div>
				</div>
			</div>
		</section>
	);
}
