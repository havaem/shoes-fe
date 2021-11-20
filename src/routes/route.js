import { lazy } from "react";
const { pathConstant } = require("constant/pathConstant");

const Admin = lazy(() => import("pages/Admin"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const Home = lazy(() => import("pages/Home"));
const ProductList = lazy(() => import("pages/ProductList"));
const ProductInfo = lazy(() => import("pages/ProductInfo"));
const Cart = lazy(() => import("pages/Cart"));
const Login = lazy(() => import("pages/Login"));
const Register = lazy(() => import("pages/Register"));

export const routes = [
	{
		exact: true,
		path: pathConstant.home,
		component: Home,
	},
	{
		exact: false,
		path: pathConstant.productList,
		component: ProductList,
	},
	{
		exact: false,
		path: `${pathConstant.productInfo}/:id.html`,
		component: ProductInfo,
	},
	{
		exact: true,
		path: pathConstant.cart,
		component: Cart,
	},
	{
		exact: true,
		path: pathConstant.login,
		component: Login,
	},
	{
		exact: true,
		path: pathConstant.register,
		component: Register,
	},
	{
		exact: false,
		path: pathConstant.dashboard,
		component: Dashboard,
		private: true,
	},
	{
		exact: false,
		path: pathConstant.admin,
		component: Admin,
		private: true,
	},
];
