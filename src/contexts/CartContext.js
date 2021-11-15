import { createContext, useState } from "react";
const CartContext = createContext({
	statusCart: false,
	setStatusCart: () => {},
});
const CartContextProvider = ({ children }) => {
	const [statusCart, setStatusCart] = useState(false);
	const value = { statusCart, setStatusCart };
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export { CartContextProvider, CartContext };
