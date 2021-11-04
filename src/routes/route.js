import { lazy } from "react";
const { pathConstant } = require("constant/pathConstant");

const Home = lazy(() => import("pages/Home"));
const ProductList = lazy(() => import("pages/ProductList"));
const ProductInfo = lazy(() => import("pages/ProductInfo"));

export const routes = [
	{
		exact: true,
		path: pathConstant.home,
		component: Home,
	},
	{
		exact: true,
		path: pathConstant.productList,
		component: ProductList,
	},
	{
		exact: true,
		path: pathConstant.productInfo,
		component: ProductInfo,
	},
];
